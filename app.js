const DOMElements = {
  removeButton: document.querySelectorAll('.fa-remove'),
  addButton: document.querySelector('#addTask'),
  clearButton: document.querySelector('.clear-tasks'),
  inputForm: document.getElementById('task'),
  ul: document.querySelector('.collection'),
}

let appData = {
  taskCount: 0,
  taskList: []
}

if(localStorage.appData) {
  appData = JSON.parse(localStorage.appData)
  appData.taskList.forEach((cur) => {
  })
} else {
  localStorage.setItem("appData", JSON.stringify(appData))
}

function renderElement(count, str) {
  let HTMLString = `
     <li class="collection-item" id="task-${count}" onclick="javascript:remove('task-${count}')" data-string="${inputValue}">
                ${str}
                <a href="#" class="delete-item secondary-content">
                  <i class="material-icons">remove</i>
                </a>
              </li> `
  DOMElements.ul.insertAdjacentHTML("afterbegin", HTMLString)
}






// let taskCount = 0;
// let taskList = []


/* ================== */


/* ================== */
/*   Add Function    */

DOMElements.addButton.addEventListener('click', addTask)

function addTask() {
  let inputValue = DOMElements.inputForm.value
  if (inputValue === "" || inputValue === null || inputValue === 0) {
    alert('Please add a valid Task!')
  } else if (appData.taskList.includes(inputValue)) {
    alert(`You've already added that task!`)
  } else {
    appData.taskCount++
    appData.taskList.push(inputValue)
    let HTMLString = `
     <li class="collection-item" id="task-${appData.taskCount}" onclick="javascript:remove('task-${appData.taskCount}')" data-string="${inputValue}">
                ${inputValue}
                <a href="#" class="delete-item secondary-content">
                  <i class="material-icons">remove</i>
                </a>
              </li> `
    DOMElements.ul.insertAdjacentHTML("afterbegin", HTMLString)
    DOMElements.inputForm.value = ''
    updateLocalStorage()
    console.log(appData)
  }

}

/* ================== */


/* ================== */
/*   Remove Function   */


DOMElements.inputForm.addEventListener('keyup', function (event) {
  event.preventDefault()
  if (event.keyCode === 13)
    addTask()
})

function removeAll() {
  DOMElements.ul.innerHTML = ''
  appData.taskList = []
  appData.taskCount = 0
  updateLocalStorage()
  console.log(appData)
}

DOMElements.clearButton.addEventListener('click', removeAll)

function remove(taskID) {
  let listItem = document.getElementById(taskID)
  listItem.parentNode.removeChild(listItem)
  let value = listItem.dataset.string
  appData.taskList = appData.taskList.filter(item => item != value)
  appData.taskCount--
  updateLocalStorage()
  console.log(appData)
}

function updateLocalStorage() {
  localStorage.setItem("appData", JSON.stringify(appData))
}

/* ================== */