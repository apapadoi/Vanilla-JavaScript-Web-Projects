"use strict";
import { config, animate } from './vaccination-progressive-line.js';

const credentialsFile = 'credentials.json';

// DOM elements
const deathsCountHeading = document.querySelector('.deaths-count');
const totalCasesCountHeading = document.querySelector('.confirmed-count');
const rapidTestsCountHeading = document.querySelector('.rapid-tests-count');
const selfTestsCountHeading = document.querySelector('.self-tests-count');

// API endpoints
const DEATHS_ENDPOINT = 'https://covid-19-greece.herokuapp.com/deaths';
const TOTAL_CASES_ENDPOINT = 'https://covid-19-greece.herokuapp.com/confirmed';
const TOTAL_RAPID_TESTS_ENDPOINT = 'https://covid-19-greece.herokuapp.com/total-tests';
const TOTAL_SELF_TESTS_ENDPOINT = 'https://covid-19-greece.herokuapp.com/total-tests';
const VACCINATION_DATA_ENDPOINT = 'https://data.gov.gr/api/v1/query/mdg_emvolio';

async function getTotalDeaths() {
    const response = await fetch(DEATHS_ENDPOINT);
    const data = await response.json();
    deathsCountHeading.textContent = (data.cases)[data.cases.length - 1].deaths;
}

async function getTotalCasesConfirmed() {
    const response = await fetch(TOTAL_CASES_ENDPOINT);
    const data = await response.json();
    totalCasesCountHeading.textContent = (data.cases)[data.cases.length - 1].confirmed;
}

async function getTotalRapidTests() {
    const response = await fetch(TOTAL_RAPID_TESTS_ENDPOINT);
    const data = await response.json();
    rapidTestsCountHeading.textContent = (data.total_tests)[data.total_tests.length - 1]['rapid-tests'];
}

async function getTotalSelfTests() {
    const response = await fetch(TOTAL_SELF_TESTS_ENDPOINT);
    const data = await response.json();
    selfTestsCountHeading.textContent = (data.total_tests)[data.total_tests.length - 1].tests;
}

async function loadVaccinationAPICredentials() {
    const response = await fetch('credentials.json');
    const data = await response.json();
    return data['DATA-GOV-GR-API-TOKEN'];
}

async function getVaccinationData() {
    const apiToken = await loadVaccinationAPICredentials();
    const response = await fetch(
        VACCINATION_DATA_ENDPOINT,
        {
            headers:
            {
                "Authorization": `Token ${apiToken}`
            }
        }
    );
    const initialData = await response.json();
    console.log(initialData);

    const ctx = document.getElementById('vaccinations-chart').getContext('2d');
    const data = await calculateTotalVaccinations(initialData);
    const data2 = await calculateTotalVaccinationsDose1(initialData);

    await animate(data, data2, 'Total Vaccinations', 'Total Vaccinations Dose 1')
    // todo group vaccinations by day and add x and y property on the data passed to the animatee function
    // todo of the vaccination-progressive-line.js module
	const myChart = new Chart(ctx, config);
}

async function calculateTotalVaccinations(data) {
    const vaccinations = [];

    data.forEach(element => {
        vaccinations.push(element.totalvaccinations);
    });

    return vaccinations;
}

async function calculateTotalVaccinationsDose1(data) {

}

function main() {
	getTotalDeaths();
    getTotalCasesConfirmed();
    getTotalRapidTests();
    getTotalSelfTests();
    getVaccinationData();
}

window.onload = main;