"use strict";

let income = 0.0;
let expense = 0.0;
let balance = 0.0;

function createTransactionElement(text, amount) {
    let element = document.createElement('div');
    element.classList.add('transaction-element');

    let transactionTextElement = document.createElement('h5');
    transactionTextElement.textContent = text;
    transactionTextElement.classList.add('transaction-text');

    let transactionAmountElement = document.createElement('h5');
    transactionAmountElement.textContent = `${amount < 0 ? '' : '+'} ${amount}`;
    transactionAmountElement.classList.add('transaction-amount');

    element.appendChild(transactionTextElement);
    element.appendChild(transactionAmountElement);
    return element;
}

function addTransaction(event) {
    const incomeSpan = document.querySelector('.incomeValue');
    const expenseSpan = document.querySelector('.expenseValue');
    const balanceSpan = document.querySelector('.balanceValue');
    const transactionTextInput = document.querySelector('#wrapper > input[type=text]:nth-child(11)');
    const transactionAmountInput = document.querySelector('#wrapper > input[type=text]:nth-child(13)');

    if(transactionTextInput.value === '' || transactionAmountInput.value === '') {
        transactionTextInput.value = transactionAmountInput.value = '';
        return;
    }

    let transactionAmount = Number(transactionAmountInput.value);
    
    if(isNaN(transactionAmount)) {
        transactionTextInput.value = transactionAmountInput.value = '';
        return;
    }

    let transactionText = transactionTextInput.value;
    let transactionElement = createTransactionElement(transactionText, transactionAmount);
    
    document.querySelector('.history-transactions-container').appendChild(transactionElement);
    
    balance += transactionAmount;
    balanceSpan.textContent = `$ ${balance.toFixed(2)}`;

    if(transactionAmount < 0 ) {
        expense -= transactionAmount;
        expenseSpan.textContent = `${expense.toFixed(2)}`;
        transactionElement.classList.add('expense');
    }
    else {
        income += transactionAmount;
        incomeSpan.textContent = `${income.toFixed(2)}`;
        transactionElement.classList.add('income');
    }
    transactionTextInput.value = transactionAmountInput.value = '';   
}

function main() {
    document.querySelector('.incomeValue').textContent = income.toFixed(2);
    document.querySelector('.expenseValue').textContent = expense.toFixed(2);
    document.querySelector('.history-transactions-container').innerHTML = '';    

    const transactionButton = document.querySelector('button');
    transactionButton.addEventListener('click', addTransaction);
}

window.onload = main;