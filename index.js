const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []

const promiseFetch = fetch(endpoint)
    .then(resp => resp.json())
    .then(data => cities.push(...data))

function findMatches(inputWord, cities) {
    return cities.filter(location => {
        const regex = new RegExp(inputWord, 'gi')
        return location.city.match(regex) || location.state.match(regex)
    })
}

function numWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3}) + (?!\d))/g, ',')
}

const searchInput = document.querySelector('.search')
const sugesstions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayInput)
searchInput.addEventListener('keyup', displayInput)

function displayInput() {
    const matchArr = findMatches(this.value, cities)

    const html = matchArr.map(location => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = location.city.replace(regex, `<span class="hl"> ${this.value}</span>`)
        const stateName = location.state.replace(regex, `<span class"hl"> ${this.value}</span>`)
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numWithCommas(location.population)}</span>
            </li>`
    }).join('')

    sugesstions.innerHTML = html; 
}