import React, { useState } from "react";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);

  async function loadPokemon() {
    let count = prompt("enter the amount of pokemon to load")
    if (count> 1350) {
      alert("please enter smaller number")
    }
    else if (count<=0) {
      alert("please enter positive number")
    }else if(count=> 0 && count<=1350 ){
      var res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`);
    }


    const data = await res.json();

    const pokemonPromises = data.results.map(async (pokemon) => {
      const pRes = await fetch(pokemon.url);
      const p = await pRes.json();
      
      const sRes = await fetch(p.species.url);
      const s = await sRes.json();
      
      return {
        id: p.id,
        name: p.name,
        image: p.sprites.other["official-artwork"].front_default,
        types: p.types.map((t) => t.type.name),
        color: s.color.name,
        stats: [
          { name: "HP", value: Math.min(p.stats[0].base_stat, 100) },
          { name: "ATK", value: Math.min(p.stats[1].base_stat, 100) },
          { name: "DEF", value: Math.min(p.stats[2].base_stat, 100) },
        ],
      };
    });
    
    setPokemonList(await Promise.all(pokemonPromises));
    
  }

  return (
    <div className="app">
      <h1 className="title">Pokémon Cards</h1>

      <button className="load-btn" onClick={loadPokemon}>
        Load Pokémon
      </button>

      <div className="card-grid">
        {pokemonList.map((p) => (
          <PokemonCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
};

export default App;
