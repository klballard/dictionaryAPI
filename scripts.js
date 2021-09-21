const baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
let url;

const searchWord = document.getElementById('search');
const resultDisplay = document.getElementById('displayResults');
const form = document.getElementById('form');

form.addEventListener('submit', findMeaning);


async function findMeaning(e) {
    e.preventDefault();
    url = `${baseURL}${searchWord.value}`
    const response = await fetch(url);
    if (response.status === 404){
        resultDisplay.innerHTML = `
        <h4>No result found. Check your spelling, please!</h4>`
    }

    //console.log(response);
    const json = await response.json();
    displayMeaning(json);
}

let displayMeaning = (data) => {
     console.log(data);

     while (resultDisplay.firstChild) {
        resultDisplay.removeChild(resultDisplay.firstChild);
    }
    // console.log(data[0]);
    // console.log(data[0].meanings);
    // console.log(data[0].meanings[0]);
    // console.log(data[0].meanings[0].definitions);
    // console.log(data[0].meanings[0].definitions[0]);
    //console.log(data[0].meanings[0].definitions[0].definition);
    

    let def = data;
    const numberOfDefs = def.length;
    console.log(numberOfDefs);
   

    if (def.length === 0 || def.length == undefined){
        console.log('no results');
        resultDisplay.innerHTML = `
        <h4>No result found. Check your spelling, please!</h4>`
    } else {
        for (let i = 0; i < numberOfDefs; i++) {
            let defDiv = document.createElement('div');
            let defHead = document.createElement('h3');
            let defText = document.createElement('p');
            let orgHead = document.createElement('h4');
            let orgText = document.createElement('p');
            let phonHead = document.createElement('h4');
            let phonLink = document.createElement('a');
            let current = def[i];
            
            defText.setAttribute('id', 'defText');
            orgText.setAttribute('id', 'orgText');
            defDiv.setAttribute('id', 'defDiv');


            defHead.textContent = 'Definition:';
            defText.textContent = current.meanings[0].definitions[0].definition;

            orgHead.textContent = 'Origin:';
            orgText.textContent = current.origin;
          
            phonHead.textContent = 'Phonetic:';
            phonLink.href = current.phonetics[0].audio;
            phonLink.target = '_blank';
            phonLink.rel = 'noreferrer noopener';
            phonLink.textContent = current.phonetic;


            defHead.style.textDecoration = 'underline';
            orgHead.style.textDecoration = 'underline';
            phonHead.style.textDecoration = 'underline';

            resultDisplay.appendChild(defDiv);
            defDiv.appendChild(defHead);
            defDiv.appendChild(defText);
            defDiv.appendChild(orgHead);
            defDiv.appendChild(orgText);
            defDiv.appendChild(phonHead);
            defDiv.appendChild(phonLink);
        }
    }

    // let def = data[0];
    // let definition = def.meanings[0].definitions[0].definition;
    // resultDisplay.innerHTML = `
    // <h3>Definition: </h3>
    // <p>${definition.charAt(0).toUpperCase() + definition.slice(1)}</p>
    // <h3>Origin: </h3>
    // <p>${def.origin}</p>
    // <h3>Phonetic: </h3>
    // <a href=${def.phonetics[0].audio} target="_blank" rel="noreferrer noopener">${def.phonetic}</a>
    // `

}
