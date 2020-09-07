#!/usr/bin/env node

const axios = require('axios');
const {getCode, getName} = require('country-list');



let countryInput =  getCode(process.argv[2]);

axios.defaults.baseURL = "https://date.nager.at/Api/v1/Get/";

let currentYear = new Date().getFullYear();


async function getPublicHoliday(country,year) {
    try {
        const recup = await axios.get(country + "/" + year);
        const data = recup.data;
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function displayResult(country, year) {

    hollidayResults = await getPublicHoliday(country, year);

    for (const result of hollidayResults){
        console.log(result.date + " " + result.name);
    }
}

if (countryInput) {
    displayResult(countryInput, currentYear);
} else {
    console.log ("Country doesn't exist !");
}


