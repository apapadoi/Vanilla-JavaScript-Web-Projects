"use strict";

let selectedSeats = 0;

function regex(value) {
    return value.match('[(][$][0-9][0-9]*')[0].replace('$','').replace('(','');
}

function selectSeat(event) {
    if(this.classList.contains('occupied'))
        return;

    if(this.classList.contains('na'))
        selectedSeats++;
    
    if(this.classList.contains('selected'))
        selectedSeats--;

    this.classList.toggle('na');
    this.classList.toggle('selected');

    const numOfSeatsSpan = document.querySelector('#numberOfSeats');
    const priceSpan = document.querySelector('#price');
    const moviesDropDown = document.querySelector('#movies');
    const value = moviesDropDown.options[moviesDropDown.selectedIndex].value;
    numOfSeatsSpan.textContent = selectedSeats;
    priceSpan.textContent = Number(regex(value)) * selectedSeats;
}

function selectMovie(event) {
    const priceSpan = document.querySelector('#price');
    const value = this.options[this.selectedIndex].value;
    priceSpan.textContent = Number(regex(value)) * selectedSeats;
}

function main() {
    const firstColumn = document.querySelector('.first-column');
    for(let i=0;i<12;i++)
        firstColumn.innerHTML += '<div class="seat na"></div>';

    const secondColumn = document.querySelector('.second-column');
    for(let i=0;i<24;i++)
        secondColumn.innerHTML += '<div class="seat na"></div>'; 

    const thirdColumn = document.querySelector('.third-column');
    for(let i=0;i<12;i++) 
        thirdColumn.innerHTML += '<div class="seat na"></div>';

    
    const seats = document.querySelectorAll('.seat');
    seats.forEach((seat) => {
        if(Math.random() < 0.1875) {
            seat.classList.add('occupied');
            seat.classList.remove('na');
        }
        
        
        seat.addEventListener('click', selectSeat);
    });

    document.querySelector('#movies').addEventListener('change', selectMovie);
}

window.onload = main;