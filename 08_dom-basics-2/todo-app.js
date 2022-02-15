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
    //HW8 //при загрузки выполненных дел из LocalStorage добавляем доп класс
    if (done == true) {
      item.classList.add('list-group-item-success');
    };//-HW8
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

  //обновляем и возвращаем обновленный массив дел LocalStorage
  function getArrayLocalStoragedObjs(keyArr, todoItemForm) {
    let arrayLocalStoragedObjs = JSON.parse(localStorage.getItem(keyArr));
    if (arrayLocalStoragedObjs == null) arrayLocalStoragedObjs = [];
    let itemName = todoItemForm.input.value;
    let itemDone = false;
    let itemObj = {
      "name": itemName,
      "done": itemDone
    };
    localStorage.setItem("itemObj", JSON.stringify(itemObj));
    arrayLocalStoragedObjs.push(itemObj);
    localStorage.setItem(keyArr, JSON.stringify(arrayLocalStoragedObjs));
    return arrayLocalStoragedObjs;
  };

  //обновляем статус дела в массиве дел LocalStorage и класс кнопки дела в DOM
  function updateDoneItems(key, todoItem) {
    let arrayFiltredDoneItems = [];
    let arrayStoragedItems = JSON.parse(localStorage.getItem(key));

    todoItem.item.classList.toggle('list-group-item-success');
    let listDoneItems = document.querySelectorAll('li.list-group-item-success');
    var arrayOfNamesDoneItems = [].map.call(listDoneItems, function (obj) { //проходимся по массиву объектов, собранных с помощью querySelectorAll
      return obj.textContent.replace('ГотовоУдалить', ''); //и получаем массив готовых Дел (без содержания в строке "ГотовоУдалить")
    });

    for (let storagedItem of arrayStoragedItems) {
      if (arrayOfNamesDoneItems.length == 0) {
        storagedItem.done = false;
      } else {
        for (let i = 0; i < arrayOfNamesDoneItems.length; i++) {
          if (storagedItem.name == arrayOfNamesDoneItems[i]) {
            storagedItem.done = true;
            break;
          }
          else {
            storagedItem.done = false;
          }
        }
      }
      arrayFiltredDoneItems.push(storagedItem);
    }

    localStorage.setItem(key, JSON.stringify(arrayFiltredDoneItems));
    arrayFiltredDoneItems = [];
  };

  //удаляем завершенное дело из массива LocalStorage и удаляем из DOM
  function removeDeletedItems(key, todoItem) {
    let arrayStoragedItems = JSON.parse(localStorage.getItem(key));
    let arrayFiltredDeleteItems = arrayStoragedItems.filter(function (e) {
      return e.name != todoItem.item.textContent.replace('ГотовоУдалить', '');
    });
    localStorage.setItem(key, JSON.stringify(arrayFiltredDeleteItems));
    todoItem.item.remove();
  };

  function createTodoApp(container, title = 'Список дел', key) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    if (key == undefined) { //если key массива LocalStorage не задан 3-им аргументом, присваиваем ему значение равное title
      key = title;
    };

    todoItemForm.input.addEventListener('input', function () { //разблокируем кнопку Добавить дело при вводе текста
      todoItemForm.button.removeAttribute('disabled');
    });

    let arrayStoragedItems = JSON.parse(localStorage.getItem(key)); //проверяем содержимое Local Storage, null при первом выполнении фун-ии

    if (arrayStoragedItems != null) { //если данные в LocalStorage существуют создаем Дела в DOM
      for (let j = 0; j < arrayStoragedItems.length; ++j) {
        let todoItem = createTodoItem(arrayStoragedItems[j].name, arrayStoragedItems[j].done);
        todoList.append(todoItem.item);

        //обработчик события нажания Готово для списка дел из LocalStorage
        todoItem.doneButton.addEventListener('click', () => updateDoneItems(key, todoItem));

        //обработчик события нажания Удалить для списка дел из LocalStorage
        todoItem.deleteButton.addEventListener('click', function () {
          if (confirm('Вы уверены?')) {
            removeDeletedItems(key, todoItem);
          }
        });
      }
    };

    todoItemForm.form.addEventListener('submit', function (e) { //создаем дело по нажатию на Enter или на кпопку создания дела
      e.preventDefault(); //чтобы страница не перезагружалась при отправке формы
      if (!todoItemForm.input.value) { //игнорируем создание элемента, если ничего не введено в поле
        return;
      }
      let todoItem = createTodoItem(todoItemForm.input.value);//создаем и добавляем в список Дело с названием из поля для ввода
      todoList.append(todoItem.item);

      arrayStoragedItems = getArrayLocalStoragedObjs(key, todoItemForm); //обновляем переменную присваивая обновленный массив дел из LocalStorage после добавления нового дела

      //обработчик события нажания Готово после создания нового дела
      todoItem.doneButton.addEventListener('click', () => updateDoneItems(key, todoItem));

      //обработчик события нажания Удалить после создания нового дела
      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          removeDeletedItems(key, todoItem);
        }
      });

      todoItemForm.input.value = '';//обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.button.setAttribute('disabled', true);//HW8 делаем поле неактивным до ввода текста
    });
  }

  window.createTodoApp = createTodoApp;
})();

