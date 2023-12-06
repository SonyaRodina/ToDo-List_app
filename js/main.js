const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];
checkEmptyList();                                                                   

form.addEventListener('submit', addTask);                                           
taskList.addEventListener('click', deleteTask);                                     
taskList.addEventListener('click', doneTask);                                       
 
function addTask(event) {
	event.preventDefault();                                                              
    const taskText = taskInput.value        	                                         
	const newTask = {                                                                    
		id: Date.now(),                                                                  
		text: taskText,
		done: false,
	};
	tasks.push(newTask);                                                                
	const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';        
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
                `;                                                                   
	taskList.insertAdjacentHTML('beforeend', taskHTML);                              
	taskInput.value = ''                                                             
	checkEmptyList();                                                                
}

function deleteTask(event) {
	if(event.target.dataset.action !== 'delete') return; 
		const parentNode = event.target.closest('li');                               
		const id = Number(parentNode.id);                                            
		const index = tasks.findIndex((task) => task.id === id);               
		tasks.splice(index, 1);                                                      
		parentNode.remove(); 		                                                 
		checkEmptyList();                                                            
}

function doneTask(event) {
	if(event.target.dataset.action !== 'done') return;
		const parentNode = event.target.closest('li');
		const id = Number(parentNode.id);
		const task = tasks.find(function(task) {                                  
			if(task.id === id) {                                                  
				return true
			}
		});    
		task.done = !task.done                                                       
		const taskTitle = parentNode.querySelector('span');
		taskTitle.classList.toggle('task-title--done');                              
}

function checkEmptyList() {                                                          
	if(tasks.length === 0) {
		const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
		<img src="./img/to-do-list.png" alt="Empty" width="80" class="mt-3">
		<div class="empty-list__title">Список дел пуст</div>
	</li>`;
		taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
	}
	if(tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;                                   
	}
};

