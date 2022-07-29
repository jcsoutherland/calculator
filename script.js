const buttonContainer = document.querySelector('.button-container')
const screenText = document.querySelector('.screen-text')

const operationArray = ['+', '-', 'x', '/']
let inputArray = []

const solveInput = (array) => {
  for (let i = 0; i < array.length; i++) {
    switch (array[i]) {
      case '+':
        //+
        return +array[i - 1] + +array[i + 1]
      case '-':
        //-
        return +array[i - 1] - +array[i + 1]
      case 'x':
        //x
        return +array[i - 1] * +array[i + 1]
      case '/':
        ///
        return +array[i - 1] / +array[i + 1]
    }
  }
  return ''
}

const buttonClickHandler = (e) => {
  const btnID = e.target.id
  //clear invalid input
  if (screenText.innerHTML === 'INVALID INPUT') {
    screenText.innerHTML = ''
  }
  //get operation and num1
  //if num1 and num2 populated then solve and set ans as num1 then num2 and operator cleared
  if (operationArray.includes(btnID)) {
    if (
      !operationArray.includes(screenText.innerHTML) ||
      !operationArray.includes(
        screenText.innerHTML[screenText.innerHTML.length - 1]
      )
    ) {
      if (screenText.innerHTML === '') {
        screenText.innerHTML = 'INVALID INPUT'
      } else if (inputArray.length === 2) {
        inputArray.push(screenText.innerHTML)
        let result = solveInput(inputArray).toString()
        screenText.innerHTML = `${result} ${btnID}`
        inputArray = [result, btnID]
        result = 0
      } else {
        inputArray.push(screenText.innerHTML)
        inputArray.push(btnID)
        screenText.innerHTML = btnID
      }
    }
  }
  //buttons 0-9
  if (btnID >= 0 && btnID < 10) {
    if (screenText.innerHTML.length > 10) {
      return
    }
    if (
      operationArray.includes(screenText.innerHTML) ||
      operationArray.includes(
        screenText.innerHTML[screenText.innerHTML.length - 1]
      )
    ) {
      screenText.innerHTML = ''
    }
    screenText.innerHTML += btnID
  }

  //= button
  if (btnID === '=') {
    if (!operationArray.includes(screenText.innerHTML)) {
      inputArray.push(screenText.innerHTML)
      let result = solveInput(inputArray).toString()
      screenText.innerHTML = result
      inputArray = []
      result = 0
    }
  }
  console.log(inputArray)
}

for (let i = 0; i < 15; i++) {
  let btn = document.createElement('button')
  if (i < 4) {
    btn.className = 'operation-button'
    btn.innerHTML = operationArray[i]
    btn.id = operationArray[i]
  } else if (i < 14) {
    btn.className = 'num-button'
    btn.innerHTML = 9 - i + 4
    btn.id = 9 - i + 4
  } else {
    btn.className = 'equals-button'
    btn.innerHTML = '='
    btn.id = '='
  }
  btn.addEventListener('click', buttonClickHandler)
  buttonContainer.appendChild(btn)
}

const clearHandler = (e) => {
  inputArray = []
  screenText.innerHTML = ''
}

let btn = document.createElement('button')
btn.className = 'clear-button'
btn.innerHTML = 'CLEAR'
btn.id = 'clear'
btn.addEventListener('click', clearHandler)
buttonContainer.appendChild(btn)
