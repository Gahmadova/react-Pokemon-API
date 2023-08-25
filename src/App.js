import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [searchInput, setSearchInput] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  // const allPokemon = [
  //   { name: "Pikachu" },
  //   { name: "Charmander" },
  //   { name: "Squirtle" },
  //   // ... more Pokemon objects
  // ];
  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Filter Pokemon based on search input
    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredPokemon(filtered);
    // console.log(filtered);
  };

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
        await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-contaner">
      <h1>Pokemon Evolution</h1>
      <h1>Pokemon Search</h1>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <div className="pokemon-list">
        {filteredPokemon.map((pokemonStats, index) => (
          <PokemonCard
            id={pokemonStats.id}
            image={pokemonStats.sprites.other.dream_world.front_default}
            name={pokemonStats.name}
            type={pokemonStats.types[0].type.name}
            key={index}
          />
        ))}
      </div>

      <div className="pokemon-container">
        {/* <div className="pokemon-card"> */}
        <div className="all-container">
          {allPokemons.map((pokemonStats, index) => (
            <PokemonCard
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
              key={index}
            />
          ))}
        </div>

        {/* </div> */}
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
