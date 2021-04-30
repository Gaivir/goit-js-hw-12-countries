import './styles.css';
import API from './js/fetchCountries';
import countryCardTpl from './templates/country-card.hbs';

const refs = {
    mainCard: document.querySelector('.country-card-js'),
    searchCountry: document.querySelector('.input-search-js'),
    countrysList: document.querySelector('.country-list-js'),
}



refs.searchCountry.addEventListener('input', debounce(onSearch, 500));
// refs.searchCountry.addEventListener('input', onSearch);

function onSearch(evt) {
    evt.preventDefault();

    const searchQuery = evt.currentTarget.value;
    console.log(searchQuery);
 

    API.fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(error => console.log(error)).finally(()=>searchQuery.reset());
        
}



// Функція по шаблону рендерить картку з країною і викидає її в HTML
function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.mainCard.innerHTML = markup;
}
    


function fetchCountry(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
        return response.json();
    },
    );
}



