const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pagination = document.getElementById("pagination");

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        getDetails();
    })
}

function getDetails() {
    const content = document.getElementById("content")
    const contentDetails = document.getElementById("contentDetails")
    const pokemon = [...document.getElementsByClassName("pokemon")]
    pokemon.forEach((iten) => {
        iten.addEventListener("click", () => {
            const idPokemon = iten.children[0].innerHTML.replace("#", "")
            const namePokemon = iten.children[1]
            const colorPokemon = iten.classList[1]
            const imagePokemon = iten.children[2].children[1]
            const url = `https://pokeapi.co/api/v2/move/${idPokemon}`
            content.classList.remove("contentVisible")
            contentDetails.classList.add("contentVisible");
            contentDetails.innerHTML = `<h1>Detalhes</h1><div class="details ${colorPokemon}"></div>`

            fetch(url)
                .then(res => res.json())
                .then((result) => {
                    const details = document.querySelector(".details");
                    details.addEventListener("click", () => {
                        content.classList.add("contentVisible")
                        contentDetails.classList.remove("contentVisible");
                    });
                })

        })
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit
    const loading = document.getElementById("loading");
    loading.classList.add("visible");
    pagination.classList.remove("visible")

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})