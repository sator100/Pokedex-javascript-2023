const ListaPokemon = document.querySelector("#ListaPokemon");
const botonesHeader = document.querySelectorAll(" .btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 0; i<=251; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

async function obtenerPokemones() {
    try {
        for (let i = 1; i <= 251; i++) {
        const response = await fetch(URL + i);
        const data = await response.json();
        mostrarPokemon(data);
    }
    } catch (error) {
        console.error("Error al obtener los pokémon", error);
    }
}

function mostrarPokemon(poke){

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if(pokeId.length === 1){
        pokeId = "00" + pokeId;
    }else if(pokeId.length === 2){
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add('pokemon');
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="imagen-pokemon">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.id}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height} dm</p>
                <p class="stat">${poke.weight} Kg</p>
            </div>
        </div>
    `;
    ListaPokemon.append(div);
}

obtenerPokemones();

botonesHeader.forEach((boton) => boton.addEventListener("click", async (event) => {
    const BotonId = event.currentTarget.id;

    ListaPokemon.innerHTML = "";

    try {
        for (let i = 1; i <= 251; i++) {
            const response = await fetch(URL + i);
            const data = await response.json();

            if (BotonId === "ver-todos") {
                mostrarPokemon(data);
            } else {
                const tipos = data.types.map((type) => type.type.name);
                if (tipos.some((tipo) => tipo.includes(BotonId))) {
                    mostrarPokemon(data);
                }
            }
        }
    } catch (error) {
        console.error("Error al filtrar los pokémon", error);
    }
}
));