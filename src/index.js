import debounce from 'lodash.debounce';
import countryCardTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/countries-list.hbs';
import './styles.css';
import API from './js/fetchCountries';
import getRefs from './js/get-refs';
import { error } from './js/notifications';



const refs = getRefs();

refs.searchCountry.addEventListener('input', debounce(onSearch, 500));


function onSearch(evt) {
    evt.preventDefault();
    clearCountry();

    const searchQuery = refs.searchCountry.value;
    console.log(searchQuery);
   
    API.fetchCountry(searchQuery)
        .then(renderCountries)
        .catch(onFetchError)
        
}


// Функція складає країну по умові
function renderCountries(country) {
    console.log(country.length);
    if (country.length > 10) {
       error({
  text: 'Too many matches found. Please enter a more specific query!'
       });
    } else if (country.length > 1 && country.length < 11) {
        renderedCountriesList(country)
    } else if (country.length === 1) {
        renderCountryCard(country)   
    }
}



// Функція рендерить список країн
function renderedCountriesList(country) {
    const markups = countriesListTpl(country);
     refs.countriesList.innerHTML = markups;
}


// Функція по шаблону рендерить картку з країною і викидає її в HTML
function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.mainCard.innerHTML = markup;
}

// Функція помилки
function onFetchError(error) {
console.log('Error');

}

// Функція чистить нашу сторінку від попередніх даних від бека
function clearCountry() {
    refs.mainCard.innerHTML = '';
    refs.countriesList.innerHTML = '';
    
}


