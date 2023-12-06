const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];
checkEmptyList();                                                                   // чтобы блок "список дел пуст" был на старте страницы

form.addEventListener('submit', addTask);                                           // добавление задачи
taskList.addEventListener('click', deleteTask);                                     // удаление задачи
taskList.addEventListener('click', doneTask);                                       // отмечаем задачу завершенной
 
function addTask(event) {
	event.preventDefault();                                                              // отмена отправки формы
    const taskText = taskInput.value        	                                         // достаем текст задачи из поля ввода
	const newTask = {                                                                    // залача, описывающая объект
		id: Date.now(),                                                                  // этот метод возвраащает текущую дату в милисекундах. При создании новой задачи id будет новый 
		text: taskText,
		done: false,
	};
	tasks.push(newTask);                                                                 // добавление задачи в массив с задачами
	const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';        // класс со значением выполнено/нет в зависимости от условия(тернарный опператор)
    const taskHTML = `                                                               
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
                `;                                                                   // это разметка для новой задачи
	taskList.insertAdjacentHTML('beforeend', taskHTML);                              // добавляем задачу на страницу
	taskInput.value = ''                                                             // очищаем поле ввода
	checkEmptyList();                                                                // блок "список дел пуст" после изменений данных с задачами
	// if(taskList.children.length > 1) {                                            // скрываем блок 'список дел пуст' Свойство children.lenght возвращает количество дочерних элементов
	// 	emptyList.classList.add('none')                                              
	// }
}

function deleteTask(event) {
	if(event.target.dataset.action !== 'delete') return; 
		const parentNode = event.target.closest('li');                               // метод closest ищет по внешним родительским элементам
		const id = Number(parentNode.id);                                            // определяем id задачи
		const index = tasks.findIndex((task) => task.id === id);                     // нахидим индекс задачи в массиве. Метожд findIndex принимает в себя функуию, которую запускает поочереди для каждого элемента массива. (task-это элементы массива(любое слово))
			                                                                         // этот метод либо вернут true и индекс найденного элемента либо fslse и значение -1 
			                                                                         // task.id-это число, а id, вытащенное из разметки-строка(все из разметки является строкой). Поэтому приводим это id к числу (45 строка). ЛИБО использовать нестрогое сравнение
				
		tasks.splice(index, 1);                                                      // удаление объекта(задачи) из МАССИВА
		// tasks = tasks.filter(function(task) {                                      другой способ удаления объекта из массива
		// 	if(task.id === id) {                                                      если id совпадают, то задача не должна попасть в новый массив, либо если id не совпадают, то попадет
		// 		return false
		// 	} else {
		// 		return true
		// 	}
		// })
		parentNode.remove(); 		                                                 // удаление этой задачи
		checkEmptyList();                                                            // блок "список дел пуст" после изменений данных с задачами
	    // if(taskList.children.length === 1) {                                      // открываем блок 'список дел пуст'
		// 	emptyList.classList.remove('none')                                              
		// }
}

function doneTask(event) {
	if(event.target.dataset.action !== 'done') return;
		const parentNode = event.target.closest('li');
		const id = Number(parentNode.id);
		const task = tasks.find(function(task) {                                   // метод find в отличии т метода findIndex возвращает не индекс элемента, а найденный элемент
			if(task.id === id) {                                                  
				return true
			}
		});    
		task.done = !task.done                                                      // метод возвращает ссылку на объект, а не сам объект и она записывается в переменную task. При помощи этой ссылки можем менять объект, на который она ссылается. Присваиваем значению свойства done обаное значение(т.е. true) 
		const taskTitle = parentNode.querySelector('span');
		taskTitle.classList.toggle('task-title--done');                              // добавляется стиль, прописанный в CSS для выполненой задачи
}

function checkEmptyList() {                                                          // функция будет высвечивать или убирать блок "список дел пуст" в зависимости от наличия объектов(задач) в массиве   
	if(tasks.length === 0) {
		const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
		<img src="./img/to-do-list.png" alt="Empty" width="80" class="mt-3">
		<div class="empty-list__title">Список дел пуст</div>
	</li>`;
		taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}
	if(tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;                                   // если блок "список дел" присутствует, то удалим его, а если нет, то ничего не будем делать(турнарный оператор)
	}
};

