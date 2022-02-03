(function () {

  //создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle
  }

  //создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    //HW8 делаем поле ввода неактивным без текста
    button.setAttribute('disabled', true);

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  //создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }


  function createTodoItem(name, done = false) {
    let item = document.createElement('li');
    //кнопки помещаем в элемент, который стилизует их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    //устанавливем стили для элемента списка, а так же для размещения кнопок
    //в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    //HW8
    //обновляем выполненные дела из LocalStorage
    //НЕ РАБОТАЕТ((
    if (done == true) {
      item.classList.add('list-group-item-success');
    };
    //-HW8

    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    //вкладываем кнопки в отдельный элемент, чтобы они обьединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    //приложению нужен доступ к самому элементу и кнопкам,
    //чтобы обрабатывать событие нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }


  function createTodoApp(container, title = 'Список дел', key) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    //HW8
    // загружаем и создаем список дел из LocalStorage
    //если он существует и задан 3й параметр функции ...
    if (typeof key !== undefined) {
      let listArrayStoragedItems = JSON.parse(localStorage.getItem(key));
      if (listArrayStoragedItems != null) {
        for (let j = 0; j < listArrayStoragedItems.length; ++j) {
          let todoItem = createTodoItem(listArrayStoragedItems[j].name, listArrayStoragedItems[j].done);
          todoList.append(todoItem.item);
        }
      }
    } else {
      //если 3й аргумент функции createTodoApp не задан,
      //для создания списка дел в LocalStorage берем ключ равный названию Title
      //НЕ РАБОТАЕТ(( key = undefined...
      key = title;
    }
    //HW8

    todoItemForm.input.addEventListener('input', function () {
      todoItemForm.button.removeAttribute('disabled');
    });


    //браузер создает событие submit на форме по нажатию на Enter или на кпопку создания дела
    todoItemForm.form.addEventListener('submit', function (e) {
      //чтобы предотвратить стандартные действия браузера
      //в данном случае, чтобы страница не перезагружалась при отправке формы
      e.preventDefault();
      //игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }
      //создаем и добавляем в список новое дело с названием из поля для ввода
      let todoItem = createTodoItem(todoItemForm.input.value);
      todoList.append(todoItem.item);

      //HW8
      //добавляем созданное новое дело в массив объектов LocalStorage
      updateStorageTodoList(key);
      //функция создания и обновления массива объектов в LocalStorage
      function updateStorageTodoList(key) {
        let listArrayStoragedItems = JSON.parse(localStorage.getItem(key));
        if (listArrayStoragedItems == null) listArrayStoragedItems = [];
        let itemName = todoItemForm.input.value;
        let itemDone = false;
        let itemObj = {
          "name": itemName,
          "done": itemDone
        };
        localStorage.setItem("itemObj", JSON.stringify(itemObj));
        listArrayStoragedItems.push(itemObj);
        localStorage.setItem(key, JSON.stringify(listArrayStoragedItems));
      };
      //-HW8

      //обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = '';
      //HW8 делаем поле неактивным до ввода текста
      todoItemForm.button.setAttribute('disabled', true);
    });


    //HW8
    //функция проверки выполненных дел
    //НЕ РАБОТАЕТ ((
    function checkDoneItems(key) {
      let listArrayStoragedItems = JSON.parse(localStorage.getItem(key));
      if (listArrayStoragedItems != null) {
        let listArrayDoneItems = [];
        let listDoneItems = document.querySelectorAll('.list-group-item-success');
        for (let i = 0; i < listDoneItems.length; i++) {
          listArrayDoneItems.push(listDoneItems[i].textContent);
        };

        // let listArrayStoragedItems = JSON.parse(localStorage.getItem(todoAppTitle.textContent));
        for (let j = 0; j < listArrayStoragedItems.length; ++j) {
          for (let i = 0; i < listArrayDoneItems.length; i++) {
            if (listArrayDoneItems[i].includes(listArrayStoragedItems[j].name)) {
              listArrayStoragedItems[j].done = true;
            }
          }
        }
        localStorage.setItem(todoAppTitle.textContent, JSON.stringify(listArrayStoragedItems));
      };
    }

    let doneButtonList = document.querySelectorAll('.btn-success');
    for (let i = 0; i < doneButtonList.length; i++) {
      doneButtonList[i].addEventListener('click', function () {
        doneButtonList[i].classList.toggle('list-group-item-success');
        console.log('doneButtonList[i]', doneButtonList[i]);
        checkDoneItems(key);
      })
    };

    todoItem.deleteButton.addEventListener('click', function () {
      if (confirm('Вы уверены?')) {
        todoItem.item.remove();
      }
    });
    //-HW8
  }

  window.createTodoApp = createTodoApp;

})();

