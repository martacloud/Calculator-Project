class Calculator {
  constructor(previousOperandTextElement,currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
  // All the operation that calc does, ac, del, maths operations, equals
clear() {
this.currentOperand = ''
this.previousOperand = ''
this.operation = undefined
}
delete() {
  // Slice will work by removing numbers from the very last one on currentOperand
  this.currentOperand = this.currentOperand.toString().slice(0, -1)
}
appendNumber(number) {
//Checking if appendNumber is working and correctly hooked up with updateDisplay 
// this.currentOperand = number
// Alow user to add only one coma at a time
if (number === '.' && this.currentOperand.includes('.'))return
this.currentOperand = this.currentOperand.toString() + number.toString()
}
chooseOperation(operation){
  if (this.currentOperand === '') return
  // example 55 + 55 + user will see 110+ in previous operand and calculator will do the computation
  if (this.previousOperand !== '') {
    this.compute()
  }
  // set the operation when it compute the value. this operation is = to the operation it pass
  this.operation = operation
  // when finished adding current number so  it re cycles to previous operand 
  this.previousOperand = this.currentOperand
  // and clear out the new currentOperand
  this.currentOperand = ''
}
compute() {
  let computation
  const prev = parseFloat(this.previousOperand)
  const current = parseFloat(this.currentOperand)
  if (isNaN(prev) || isNaN(current))return
  switch (this.operation) {
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '÷':
      computation = prev / current
      break
    // if none of above symbols will match the operation, it means that it's invalid operation and do NOT do any computation
    default:
      return
  }
  this.currentOperand = computation
  this.operation = undefined
  this.previousOperand
}

// Display numbers with coma delimits
getDisplayNumber(number) {
  // sort out problems with adding 0000 after an before coma to get result as 0.2 and 0.000
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = (stringNumber.split('.')[1])
  let integerDisplay
  if(isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0})
  }
  // check if the decimal digits is set to null, meaning that user did enter number after
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }
}

updateDisplay() { 
  // if user types numbers and click + the number moves up to previousOperand
  this.currentOperandTextElement.innerText = this.currentOperand
  // Creating spaces between the numbers ( 1 000 000)
  if (this.operation != null) {
    this.previousOperandTextElement.innerText = 
      `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
  // to clear out values after .00008756
  } else {
    this.previousOperandTextElement.innerText = ''
  }
}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Number Buttons
numberButtons.forEach(button => {
  button.addEventListener('click', ()=> {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

// Operation Buttons
operationButtons.forEach(button => {
  button.addEventListener('click', ()=> {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

// = Button
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

// AC Button
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

// DEL Button
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})