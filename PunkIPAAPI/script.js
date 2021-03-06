// Global Variables
const urlBase = "https://api.punkapi.com/v2/beers?page=";
const filterABV = document.getElementById('filterABV');
let optionsABV = "";
const filterIBU = document.getElementById('filterIBU');
let optionsIBU = "";
const pageText = document.getElementById("pageNumber");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
let page = 1;

// ABV Filter
filterABV.addEventListener('change', e => {
    const value = e.target.value;

    switch(value) {
        case 'all':
            optionsABV = '';
            break;
        case "weak":
            optionsABV = "&abv_lt=4.6";
            break;
        case "medium":
            optionsABV = "&abv_gt=4.5&abv_lt=7.6";
            break;
        case "strong":
            optionsABV = "&abv_gt=7.5";
            break;
    }
    page = 1;
    getBeers();
})

// IBU Filter
filterIBU.addEventListener('change', e => {
    const value = e.target.value;

    switch(value) {
        case 'all':
            optionsIBU = '';
            break;
        case 'weak':
            optionsIBU = '&ibu_lt=35';
            break;
        case 'medium':
            optionsIBU = '&ibu_gt=34&ibu_lt=75';
            break;
        case 'strong':
            optionsIBU = '&ibu_gt=74';
            break;
    }
    page = 1;
    getBeers();
})



// Fetching API
async function getBeers() {
    const url = urlBase + page + optionsABV + optionsIBU;
    const beerPromise = await fetch(url);
    const beerData = await beerPromise.json();

    // Pagination
    pageText.innerHTML = page;

    if (page === 1) {
        prevPage.disabled = true;
    } else {
        prevPage.disabled = false;
    }

    if (beerData.length < 25) {
        nextPage.disabled = true;
    } else {
        nextPage.disabled = false;
    }


    // Rendering Beer Data
    let beerHtml = "";
    const genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png';

    beerData.forEach(beer => {
        beerHtml += `
        <div class='beer-wrapper card'>
            <div class='beer'>
                <img class='beer__img' src="${beer.image_url ? beer.image_url : genericBottle}">
                <h3>${beer.name}</h3>
                <span class='beer__info'>
                    <span>ABV: ${beer.abv}%</span>
                    <span>IBU: ${beer.ibu}</span>
                </span>
            </div>
            <div class='beer__content'>
                <div class='beer__name'>${beer.name}</div>
                <div class='beer__tagline'>${beer.tagline}</div>
                <div class='beer__description'>${beer.description}</div>
                <div class='beer__food-pairing'>
                    Pair with: ${beer.food_pairing.join(', ')}
                </div>
            </div>
        </div>
       `; 
    });
    const beersDiv = document.querySelector('.beers');
    beersDiv.innerHTML = beerHtml;
}

// pagination funcion
prevPage.addEventListener('click', () => {
    page--;
    getBeers();
})
nextPage.addEventListener('click', () => {
    page++;
    getBeers();
})
getBeers();