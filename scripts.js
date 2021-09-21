const baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
let url;

const searchWord = document.getElementsByClassName('search');
const resultDisplay = document.getElementsByClassName('displayResults');
const form = document.getElementsByClassName('form');

form.addEventListener('submit', findMeaning);


async function findMeaning(e) {
    event.preventDefault();
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

    // console.log(data[0]);
    // console.log(data[0].meanings);
    // console.log(data[0].meanings[0]);
    // console.log(data[0].meanings[0].definitions);
    // console.log(data[0].meanings[0].definitions[0]);
    //console.log(data[0].meanings[0].definitions[0].definition);
    

    let def = data;
    const numberOfDefs = deff.length;
    console.log(numberOfDefs);
   

    if (def.length === 0 || def.length == undefined){
        console.log('no results');
        resultsDisplay.innerHTML = `
        <h4>No result found. Check your spelling, please!</h4>`
    } else {
        for (let i = 0; i < numberOfDef; i++) {
            let defDiv = document.createElement(div);
            let defHead = document.createElement(h3);
            let defText = document.createElement(p);
            let orgHead = document.createElement(h4);
            let orgText = document.createElement(p);
            let phonHead = document.createElement(h4);
            let phonLink = document.createElement(a);
            let current = def[i];
            
            defText.setAttribute('id', 'deffText');
            orgText.ssetAttribute('id', 'orgText');
            defDiv.setAttribute('id', 'defDiv');


            defHead.text.Content = 'Definition:';
            defText.textContent = current.meanings[0].definitions[0].definition;

            orgHead.textContent = 'Origin:';
            orgText.textContent = current.origin;
          
            phonHead.textContent = 'Phonetic:';
            phonLink.href = current.phonetics[0].audio;
            phonLink.target = '_blank';
            phonLink.rel = 'noreferrer noopener';
            phonLink.textContent = current.phonetic;


            defHead.style.textDecoration = underline;
            orgHead.style.textDecoration = underline;
            phonHead.style.textDecoration = underline;

            resultsDisplay.appendChild(defDiv);
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
