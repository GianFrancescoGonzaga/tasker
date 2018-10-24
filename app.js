const DOMElements = {
  removeButton: document.querySelectorAll('.fa-remove'),
  addButton: document.querySelector('#addTask'),
  clearButton: document.querySelector('.clear-tasks'),
  inputForm: document.getElementById('task'),
  ul: document.querySelector('.collection'),
}


let taskCount = 0;
let taskList = []


/* ================== */


/* ================== */
/*   Add Function    */

DOMElements.addButton.addEventListener('click', addTask)

function addTask() {
  let inputValue = DOMElements.inputForm.value
  if (inputValue === "" || inputValue === null || inputValue === 0) {
    alert('Please add a valid Task!')
  } else if(taskList.includes(inputValue)) {
    alert(`You've already added that task!`)
  } else {
    taskCount++
    taskList.push(inputValue)
    let HTMLString = `
     <li class="collection-item" id="task-${taskCount}" onclick="javascript:remove('task-${taskCount}')" data-string="${inputValue}">
                ${inputValue}
                <a href="#" class="delete-item secondary-content">
                  <i class="material-icons">remove</i>
                </a>
              </li> `
    DOMElements.ul.insertAdjacentHTML("afterbegin", HTMLString)
    DOMElements.inputForm.value = ''
    console.log(taskList, taskCount)
  } 

}

/* ================== */


/* ================== */
/*   Remove Function   */


DOMElements.inputForm.addEventListener('keyup', function(event){
  event.preventDefault()
  if (event.keyCode === 13)
  addTask()
})

function removeAll() {
  DOMElements.ul.innerHTML = ''
  taskList = []
  taskCount = 0
}

DOMElements.clearButton.addEventListener('click', removeAll)

function remove(taskID) {
  let listItem = document.getElementById(taskID)
  listItem.parentNode.removeChild(listItem)
  let value = listItem.dataset.string
  taskList = taskList.filter(item => item != value)
  taskCount--
  console.log(taskList, taskCount)
}

/* ================== */