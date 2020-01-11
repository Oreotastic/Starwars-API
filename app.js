console.log('App Loaded')

let peoplePage = 1
let planetsPage = 1
let speciesPage = 1
let starshipsPage = 1
let vehiclesPage = 1

const filters = document.querySelectorAll('.filter')
const loadBtn = document.querySelectorAll('.loadMore')
const app = document.querySelector('.app')
const films = app.querySelector('#films')
const people = app.querySelector('#people')
const planets = app.querySelector('#planets')
const species = app.querySelector('#species')
const starships = app.querySelector('#starships')
const vehicles = app.querySelector('#vehicles')

const filmsUrl = axios.get('https://star-cors.herokuapp.com/films')
const peopleUrl = axios.get('https://star-cors.herokuapp.com/people')
const planetsUrl = axios.get('https://star-cors.herokuapp.com/planets')
const speciesUrl = axios.get('https://star-cors.herokuapp.com/species')
const starshipsUrl = axios.get('https://star-cors.herokuapp.com/starships')
const vehiclesUrl = axios.get('https://star-cors.herokuapp.com/vehicles')

const allPromise = Promise.all([filmsUrl, peopleUrl, planetsUrl, speciesUrl, starshipsUrl, vehiclesUrl])

const grabApi = () => {
    return allPromise
        .then(response => response)
}

const renderMain = (data, count, id, page) => {

    const domArr = [films, people, planets, species, starships, vehicles]

    if (typeof count === 'object') {
        for (i = 0; i < 11; i++) {
            for (j in data[i]) {

                const headerArr = ['films', 'people', 'planets', 'species', 'starships', 'vehicles']
                const name = data[i][j][`${Object.keys(data[i][j])[0]}`]

                domArr[i].innerHTML +=
                    `<li class="card ${headerArr[i]}Title page${page}">
                <b class="${headerArr[i]}Name">${name}</b>
                </li>`

            }
        }

        renderFilms(data[0], count[0])
        renderPeople(data[1], count[1], page)
        renderPlanets(data[2], count[2], page)
        renderSpecies(data[3], count[3], page)
        renderStarships(data[4], count[4], page)
        renderVehicles(data[5], count[5], page)
    } else {
        const domArr = [films, people, planets, species, starships, vehicles]
        const headerArr = ['films', 'people', 'planets', 'species', 'starships', 'vehicles']
        switch (id) {
            case 'people':
                peoplePage++
                el = domArr[1]
                for (i in data) {
                    const name = data[i][`${Object.keys(data[i])[0]}`]
                    el.innerHTML +=
                        `<li class="card ${id}Title page${peoplePage}">
                    <b class="${id}Name">${name}</b>
                    </li>`
                }

                renderPeople(data, count, peoplePage)
                break;
            case 'planets':
                planetsPage++
                el = domArr[1]
                for (i in data) {
                    const name = data[i][`${Object.keys(data[i])[0]}`]
                    el.innerHTML +=
                        `<li class="card ${id}Title page${planetsPage}">
                            <b class="${id}Name">${name}</b>
                            </li>`
                }

                renderPlanets(data, count, planetsPage)
                break;



        }
    }

}

const renderCount = (el, length, total) => {

    el.innerHTML = `viewing ${length} out of ${total}`
}

const renderFilms = (arr, totalCount) => {

    const filmList = document.querySelectorAll('.filmsTitle')
    const countEl = filmList[0].previousElementSibling

    for (let i = 0; i < filmList.length; i++) {
        filmList[i].innerHTML +=
            `
        <div class="box">
            <p>Episode: ${arr[i].episode_id}</p>
            <p>Release Date: ${arr[i].release_date}</p>
        </div>
        `
    }

    renderCount(countEl, filmList.length, totalCount)
}

const renderPeople = (arr, totalCount, page) => {

    const fullList = document.querySelectorAll(`li.card.peopleTitle`).length
    const newList = document.querySelectorAll(`li.card.peopleTitle.page${page}`)

    const countEl = newList[0].parentNode.firstElementChild
    console.dir(countEl)

    for (let i = 0; i < newList.length; i++) {
        newList[i].innerHTML +=
            `
        <div class="box">
        <p>Films Appeared: ${arr[i].films.length}</p>
        </div>
        `
    }

    renderCount(countEl, fullList, totalCount)
}

const renderPlanets = (arr, totalCount, page) => {

    const fullList = document.querySelectorAll(`li.card.peopleTitle`).length
    const newList = document.querySelectorAll('.planetsTitle')
    const countEl = newList[0].previousElementSibling

    for (let i = 0; i < newList.length; i++) {
        newList[i].innerHTML +=
            `<div class="box">
        <p>Films Appeared: ${arr[i].films.length}</p>
        <p>Climate: ${arr[i].climate}</p>
        </div>`
    }

    renderCount(countEl, fullList, totalCount)
}

const renderSpecies = (arr, totalCount) => {

    const fullList = document.querySelectorAll(`li.card.peopleTitle`).length
    const newList = document.querySelectorAll('.speciesTitle')
    const countEl = newList[0].previousElementSibling

    for (let i = 0; i < newList.length; i++) {
        newList[i].innerHTML +=
            `<div class="box">
        <p>Films Appeared: ${arr[i].films.length}</p>
        <p>Average Lifespan: ${arr[i].average_lifespan}</p>
        </div>`
    }

    renderCount(countEl, fullList, totalCount)
}

const renderStarships = (arr, totalCount) => {

    const fullList = document.querySelectorAll(`li.card.peopleTitle`).length
    const newList = document.querySelectorAll('.starshipsTitle')
    const countEl = newList[0].previousElementSibling

    for (let i = 0; i < newList.length; i++) {
        newList[i].innerHTML +=
            `<div class="box">
        <p>Model: ${arr[i].model}</p>
        <p>Manufacturer: ${arr[i].manufacturer}</p>
        </div>`
    }

    renderCount(countEl, fullList, totalCount)
}

const renderVehicles = (arr, totalCount) => {

    const fullList = document.querySelectorAll(`li.card.peopleTitle`).length
    const newList = document.querySelectorAll('.vehiclesTitle')
    const countEl = newList[0].previousElementSibling

    for (let i = 0; i < newList.length; i++) {
        newList[i].innerHTML +=
            `<div class="box">
        <p>Model: ${arr[i].model}</p>
        <p>Manufacturer: ${arr[i].manufacturer}</p>
        </div>`
    }

    renderCount(countEl, fullList, totalCount)
}

const loadMoreAPI = (id) => {
    axios.get(`https://star-cors.herokuapp.com/${id}`)
        .then(response => response)
        .then(({
            data
        }) => data.next)
        .then(url => {
            axios.get(url)
                .then(response => response)
                .then(({
                    data
                }) => {
                    renderMain(data.results, data.count, id)
                })
        })
}

const loadMore = () => {
    for (let i = 0; i < loadBtn.length; i++) {
        loadBtn[i].addEventListener('click', (event) => {
            const id = event.target.parentElement.nextElementSibling.id
            loadMoreAPI(id)
        })
    }
}

const addFilters = () => {

    for (let i = 0; i < filters.length; i++) {

        filters[i].addEventListener('input', (event) => {

            const nameList = document.querySelectorAll(`.${event.target.nextElementSibling.id}Name`)
            const nameArr = [...nameList]

            for (let j in nameArr) {
                if (!(nameArr[j].innerText.indexOf(event.target.value) === 0)) {

                    nameArr[j].parentElement.classList = ('card hide ')

                } else {
                    nameArr[j].parentElement.classList = ('card display')
                }
            }
        })
    }

}


grabApi()
    .then(response => response)
    .then(data => data)
    .then(result => {
        const resultArr = []
        const countArr = []

        for (i in result) {
            countArr.push(result[i].data.count)
            resultArr.push(result[i].data.results)
        }

        renderMain(resultArr, countArr, null, 1)
    })


addFilters()
loadMore()