export default { fetchCountry };


// Функція іде на сервер просить країну, розпарсить результат і поверне із себе Проміс(результьат методу .json())
function fetchCountry(name) {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    return fetch(url).then(response =>
        response.json());
}

