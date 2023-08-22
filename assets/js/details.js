class Details {

    getDetails() {
        const content = document.getElementById("content");
        const contentDetails = document.getElementById("contentDetails");
        const details = document.getElementById("details");
        const name = document.getElementById("name");
        const idPokemons = document.getElementById("idPokemon");
        const imgPokemon = document.getElementById("imgPokemon");
        const power = document.getElementById("power");
        const accuracy = document.getElementById("accuracy");
        const priority = document.getElementById("priority");
        const pp = document.getElementById("pp");

        power.innerHTML = "0";
        accuracy.innerHTML = "0";
        priority.innerHTML = "0";
        pp.innerHTML = "0";

        const btnBack = document.getElementById("btnBack");
        btnBack.addEventListener("click", () => {
            content.classList.add("contentVisible");
            contentDetails.classList.remove("contentVisible");
        });

        const pokemon = [...document.getElementsByClassName("pokemon")];
        pokemon.forEach((iten) => {
            iten.addEventListener("click", () => {
                const colorPokemon = iten.classList[1];
                const imagePokemon = iten.children[2].children[1].src;
                const id = iten.children[0].innerHTML
                const idPokemon = id.replace("#", "");
                const namePokemon = iten.children[1].innerHTML;
                name.innerHTML = namePokemon;
                idPokemons.innerHTML = id;
                imgPokemon.src = imagePokemon;

                const url = `https://pokeapi.co/api/v2/move/${idPokemon}`;
                details.classList.remove(details.classList[1]);
                details.classList.add(colorPokemon);
                content.classList.remove("contentVisible");
                contentDetails.classList.add("contentVisible");

                fetch(url)
                    .then(res => res.json())
                    .then((result) => {
                        power.innerHTML = result.power ? result.power : 0;
                        document.getElementsByClassName("progress-bar")[0].style.setProperty("--progress", result.power);
                        accuracy.innerHTML = result.accuracy ? result.accuracy : 0;
                        document.getElementsByClassName("progress-bar")[1].style.setProperty("--progress", result.accuracy);
                        priority.innerHTML = result.priority ? result.accuracy : 0;
                        document.getElementsByClassName("progress-bar")[2].style.setProperty("--progress", result.pp);
                        pp.innerHTML = result.pp ? result.pp : 0;
                        document.getElementsByClassName("progress-bar")[3].style.setProperty("--progress", result.priority);
                    })

            })
        });
    }
}
export { Details };