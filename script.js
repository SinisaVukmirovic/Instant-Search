const searchInput = document.getElementById('search');
const results = document.getElementById('results');

let searchTerm = '';
let countries;

const fetchCountries = async () => {
    const apiUrl = 'https://restcountries.eu/rest/v2/all?fields=name;capital;population;flag;region';

    countries = await fetch(apiUrl).then(res => res.json());
}

const showCountries = async () => {
    results.innerHTML = '';

    await fetchCountries();

    const container = document.createElement('div');

    countries
        .filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .forEach(country => {
            if (country.name.includes('Kosovo')) {
                return;
            }
            else {
                const countryElem = document.createElement('div');
                countryElem.classList.add('country');
        
                const flag = document.createElement('img');
                flag.src = country.flag;
                flag.classList.add('flag');
    
                const info = document.createElement('div');
                info.classList.add('country-info');
    
                const name = document.createElement('h2');
                name.innerText = country.name;
                name.style.color = '#fff';
                name.style.paddingLeft = '1em';
    
                const details = document.createElement('div');
                details.classList.add('details');
    
                details.innerHTML = `
                    <div>
                        <span>Population</span>
                        <h4>${numberWithSpaces(country.population)}</h4>
                    </div>
                    <div>
                        <span>Capital</span>
                        <h4>${country.capital}</h4>
                    </div>
                    <div>
                        <span>Region</span>
                        <h4>${country.region}</h4>
                    </div>
                `;
    
                info.appendChild(name);
                info.appendChild(details);
    
                countryElem.appendChild(flag);
                countryElem.appendChild(info);
    
                container.appendChild(countryElem);
            }
    });

    results.appendChild(container);
}

showCountries();

searchInput.addEventListener('input', e => {
    searchTerm = e.target.value;
    showCountries();
});

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}