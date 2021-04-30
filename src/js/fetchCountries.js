export default { fetchCountry };


// Функція іде на сервер просить країну, розпарсить результат і поверне із себе Проміс(результьат методу .json())
function fetchCountry(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
        return response.json();
    },
    );
}

