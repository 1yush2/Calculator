class Calc {
    constructor(previousDislplayText,currentDisplayText){
        this.previousDislplayText = previousDislplayText
        this.currentDisplayText = currentDisplayText
        this.clear()
    }
    
    clear() {
        this.currentDisplay = ''
        this.previousDisplay = ''
        this.Operation = undefined
    }

    del() {
        this.currentDisplay = this.currentDisplay.toString().slice(0,-1)
    }

    chooseNumber(numb) {
        if (numb == '.' && this.currentDisplay.includes('.')) return
        this.currentDisplay = this.currentDisplay.toString() +  numb.toString()
    }

    chooseOperation(operation){
        if(this.currentDisplay === '') return
        if (this.previousDislplay !== ''){
            this.compute( )
        }
        this.operation = operation
        this.previousDislplay = this.currentDisplay
        this.currentDisplay = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousDislplay)
        const current = parseFloat(this.currentDisplay)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
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
            default:
                return      
        }
        this.currentDisplay = computation
        this.operation = undefined
        this.previousDislplay = ''
    }

    updateDisplay(){
        this.currentDisplayText.innerText = this.currentDisplay
        this.previousDislplayText.innerText = this.previousDislplay
    }
}

const numButtons = document.querySelectorAll('[data-numbs]')
const operateButtons = document.querySelectorAll('[data-operates]')
const clearButton = document.querySelector('[data-allClear]')
const delButton = document.querySelector('[data-del]')
const equalsButton = document.querySelector('[data-print]')
const previousDislplayText = document.querySelector('[data-previous-num]')
const currentDisplayText = document.querySelector('[data-now-num]')

const calculator = new Calc(previousDislplayText,currentDisplayText)

numButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operateButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', button => {
    calculator.del()
    calculator.updateDisplay()
})