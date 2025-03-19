// TODO write your code here
const cardTemplate = document.getElementById('cardTemplate');
const cardsContainer = document.getElementById('cardsContainer');
const infoTemplate = document.getElementById('infoTemplate');
const infoContainer = document.getElementById('infoContainer');

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then(response => response.json())
  .then((data) => {
    const pokemons = data.results;
    pokemons.forEach((pokemon) => {
      fetch(pokemon.url)
        .then(pokeresponse => pokeresponse.json())
        .then((pokedata) => {
          const clone = cardTemplate.content.cloneNode(true);

          clone.querySelector('img').src = pokedata.sprites.front_default;
          clone.querySelector('h2').innerText = pokedata.name;
          clone.querySelector('p').innerText = pokedata.types.map(item => item.type.name)
          clone.querySelector('a').addEventListener('click', () => {
            infoContainer.innerHTML = '';

            const infoClone = cardTemplate.content.cloneNode(true);

            infoClone.querySelector('img').src = pokedata.sprites.front_default;
            infoClone.querySelector('h2').innerText = pokedata.name;
            infoClone.querySelector('p').innerText = pokedata.types.map(item => item.type.name)

            infoContainer.appendChild(infoClone);
          })

          cardsContainer.appendChild(clone);
        })
    })
  });
