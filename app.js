
console.log('app loaded')

const app = document.querySelector('.app')

const filmsUrl = axios.get('https://star-cors.herokuapp.com/films')
const peopleUrl = axios.get('https://star-cors.herokuapp.com/people')
const planetsUrl = axios.get('https://star-cors.herokuapp.com/planets')
const speciesUrl = axios.get('https://star-cors.herokuapp.com/species')
const starshipsUrl = axios.get('https://star-cors.herokuapp.com/starships')
const vehiclesUrl = axios.get('https://star-cors.herokuapp.com/vehicles')

const allPromise = Promise.all([filmsUrl, peopleUrl, planetsUrl, speciesUrl, starshipsUrl, vehiclesUrl])

const filters = document.querySelectorAll('.filter')
const films = app.querySelector('#films')
const people = app.querySelector('#people')
const planets = app.querySelector('#planets')
const species = app.querySelector('#species')
const starships = app.querySelector('#starships')
const vehicles = app.querySelector('#vehicles')


const grabApi = () => {
    return allPromise
    .then(response => response)
}

const renderMain = (APIarr, countArr) => {
    const domArr = [films, people, planets, species, starships, vehicles]
    for(i = 0; i < 11; i++){
        for(j in APIarr[i]) {
            
            const headerArr = ['films', 'people', 'planets', 'species', 'starships', 'vehicles']
            const titleArr = ['filmsTitle', 'peopleTitle', 'planetsTitle', 'speciesTitle', 'starshipsTitle', 'vehiclesTitle']
            const name = APIarr[i][j][`${Object.keys(APIarr[i][j])[0]}`]
            
            domArr[i].innerHTML += 
            `<li class="card ${titleArr[i]}">
            <b class="${headerArr[i]}Name">${name}</b>
            </li>`
            
        }
    }
    
    renderCount(countArr)
    renderFilms(APIarr[0])
    renderPeople(APIarr[1])
    renderPlanets(APIarr[2])
    renderSpecies(APIarr[3])
    renderStarships(APIarr[4])
    renderVehicles(APIarr[5])
}

const renderCount = (totalArr) => {
    const lists = document.querySelectorAll('.list')
    const countsEl = []
    const listLength = []
    for(i = 0; i < totalArr.length; i++) {
        listLength.push(lists[i].children.length-1)
        countsEl.push(lists[i].querySelector('.count'))
        countsEl[i].innerHTML = 
        `viewing ${listLength[i]} out of ${totalArr[i]}`
    }

}

const renderFilms = (arr) => {
    const filmList = document.querySelectorAll('.filmsTitle')
    for(let i = 0; i < filmList.length; i++) {
        filmList[i].innerHTML += 
        `
        <div class="box">
        <p>Episode: ${arr[i].episode_id}</p>
        <p>Release Date: ${arr[i].release_date}</p>
        </div>
        `
    }
    
}

const renderPeople = (arr) => {
    const peopleList = document.querySelectorAll('.peopleTitle')
    for(let i = 0; i < peopleList.length; i++) {
        
        peopleList[i].innerHTML += 
        `
        <div class="box">
        <p>Films Appeared: ${arr[i].films.length}</p>
        </div>
        `
    }
}

const renderPlanets = (arr) => {
    const planetList = document.querySelectorAll('.planetsTitle')
    for(let i = 0; i < planetList.length; i++) {
        planetList[i].innerHTML += 
        `<div class="box">
        <p>Films Appeared: ${arr[i].films.length}</p>
        <p>Climate: ${arr[i].climate}</p>
        </div>`
    }
}

const renderSpecies = (arr) => {
    const speciesList = document.querySelectorAll('.speciesTitle')
    for(let i = 0; i < speciesList.length; i++) {
        speciesList[i].innerHTML += 
        `<div class="box">
        <p>Films Appeared: ${arr[i].films.length}</p>
        <p>Average Lifespan: ${arr[i].average_lifespan}</p>
        </div>`
    }
}

const renderStarships = (arr) => {
    const starshipList = document.querySelectorAll('.starshipsTitle') 
    for(let i = 0; i < starshipList.length; i++) {
        starshipList[i].innerHTML += 
        `<div class="box">
        <p>Model: ${arr[i].model}</p>
        <p>Manufacturer: ${arr[i].manufacturer}</p>
        </div>`
    }
}

const renderVehicles = (arr) => {
    const vehicleList = document.querySelectorAll('.vehiclesTitle') 
    for(let i = 0; i < vehicleList.length; i++) {
        vehicleList[i].innerHTML += 
        `<div class="box">
        <p>Model: ${arr[i].model}</p>
        <p>Manufacturer: ${arr[i].manufacturer}</p>
        </div>`
    }
}

for(let i = 0; i < filters.length; i++){
    filters[i].addEventListener('input', (event) => {
        
        const nameList = document.querySelectorAll(`.${event.target.nextElementSibling.id}Name`)
        const nameArr = [...nameList]

        for(let j in nameArr) {
            if(!(nameArr[j].innerText.indexOf(event.target.value) === 0)) {
                
                nameArr[j].parentElement.classList = ('card hide ')
                
            } else {
                nameArr[j].parentElement.classList = ('card display')
            }
        }
    })
}

grabApi()
.then(response => response)
.then(data => data)
.then(result => {
    const resultArr = []
    const countArr = []
    for(i in result) {
        countArr.push(result[i].data.count)
        resultArr.push(result[i].data.results)
    }
    renderMain(resultArr, countArr)
})

