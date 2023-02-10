const numberBtns = document.querySelectorAll("[data-number]")
const operatorBtns = document.querySelectorAll("[data-operator]")
const clearBtn = document.querySelector("[data-clear]")
const backspaceBtn = document.querySelector("[data-backspace]")
const equalsBtn = document.querySelector("[data-equals]")

const calculation = document.querySelector("[data-calculation")

let currentVal = ""
let operator = null
let previousVal = ""

calculation.innerText = currentVal


const clear = () => {
    currentVal = ""
    operator = null
    previousVal = ""
    calculation.innerText = currentVal
}

const backspace = () => {
    currentVal = currentVal.toString().slice(0, -1) || ""

    if (currentVal === "") {
        clear()
    }
    
    calculation.innerText = currentVal;
}

const appendNum = (num) => {
    if (currentVal.includes(".") && num === ".") return;

    if (currentVal === "0" && !currentVal === ".") {
      currentVal = num;
    } else {
      currentVal += num;
    }

    calculation.innerText = ` ${currentVal} `
  
  };


const selectOperatorKey = (op) => {
    if (currentVal === '') return

    if (previousVal !== '') {
        calculate()
    }

    operator = op
    previousVal = currentVal
    currentVal = ''
    calculation.innerText += ` ${op} ` 
  
}

const calculate = () => {
    let computation

    const a = parseFloat(previousVal)
    const b = parseFloat(currentVal)

    if (isNaN(a) || isNaN(b)) return

    switch (operator) {
        case '+':
            computation = a + b
            break
        case '-':
            computation =  a - b
            break
        case '×':
            computation = a * b
            break
        case '÷':
            if (b === 0) {
                computation = "Can't divide by zero"
                break
            }
            computation = a / b
            break
        case '^':
            computation = a ** b
            break
            default:
                return
    }

    currentVal = computation
    operator = null
    previousVal = ''
    calculation.innerText = currentVal
}

clearBtn.addEventListener("click", () => clear())

backspaceBtn.addEventListener("click", () => backspace())

numberBtns.forEach(button => {
  button.addEventListener("click", () => {
    appendNum(button.innerText)
  })
})

operatorBtns.forEach(button => {
  button.addEventListener("click", () => {
    selectOperatorKey(button.innerText)
  })
})

equalsBtn.addEventListener("click", () => calculate())


