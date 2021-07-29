"use strict";

async function loadAvailableCurrencies() {
    const response = await fetch('available-currencies.json');
    const data = await response.json();
    const keys = Object.keys(data);
    const selectBoxes = [ document.querySelector('#fromCurrency'), document.querySelector('#toCurrency') ]; 
    keys.forEach(currency => {
        selectBoxes.forEach(selectBox => {
            selectBox.innerHTML += `<option value="${currency}">${currency}</option>`;
        });
    });
}

async function getCurrencyRate(from, to, amount = 1) {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await response.json();
    return data.result;
}

async function changeCurrency(event) {
    let oneAmountResult;
    const result = await getCurrencyRate(document.querySelector('#fromCurrency').value, document.querySelector('#toCurrency').value, document.querySelector('#fromCurrencyInput').value);

    if(document.querySelector('#fromCurrencyInput').value !== '1')
        oneAmountResult = await getCurrencyRate(document.querySelector('#fromCurrency').value, document.querySelector('#toCurrency').value, '1');
    else
        oneAmountResult = result;
    
    document.querySelector('#toCurrencyInput').textContent = result.toFixed(2);
    document.querySelector('span.toValue').textContent = oneAmountResult;
    document.querySelector('span.fullFromCurrency').textContent = document.querySelector('#fromCurrency').value;
    document.querySelector('span.fullToCurrency').textContent = document.querySelector('#toCurrency').value;
}

async function swapCurrencies(event) {
    const fromCurrencySelect = document.querySelector('#fromCurrency');
    const toCurrencySelect = document.querySelector('#toCurrency');
    const fromCurrencySelectedIndex = fromCurrencySelect.selectedIndex;

    fromCurrencySelect.selectedIndex = toCurrencySelect.selectedIndex;
    toCurrencySelect.selectedIndex = fromCurrencySelectedIndex;
    await changeCurrency(null);
}

async function main() {
    document.querySelector('#fromCurrency').addEventListener('change', changeCurrency);
    document.querySelector('#toCurrency').addEventListener('change', changeCurrency);
    document.querySelector('#fromCurrencyInput').addEventListener('change', changeCurrency);
    document.querySelector('input[type=button]').addEventListener('click', swapCurrencies);


    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
        })
    });

    // load available currencies
    await loadAvailableCurrencies();
    
    // change default value of the second option of available currencies
    document.querySelector('#toCurrency').selectedIndex = 1;
    document.querySelector('#fromCurrencyInput').value = 1;
    
    const toValue = await getCurrencyRate(document.querySelector('#fromCurrency').value, document.querySelector('#toCurrency').value);
    document.querySelector('#toCurrencyInput').textContent = toValue.toFixed(2);
    document.querySelector('span.toValue').textContent = toValue;
}

window.onload = main;