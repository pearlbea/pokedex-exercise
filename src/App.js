import { useEffect, useState } from "react";
import {
  fetchAllPokemon,
  fetchPokemonDetailsByName,
  fetchEvolutionChainById,
  fetchPokemonSpeciesByName,
} from "./api";

function getFirstEvolution(evolutionChain) {
  if (evolutionChain?.chain?.species?.name) {
    return <li>{evolutionChain.chain.species.name}</li>
  } 
  return null;
}

function getSecondEvolution(evolutionChain) {
  if (evolutionChain?.chain?.evolves_to[0]?.species?.name) {
    return <li>{evolutionChain.chain.evolves_to[0].species.name}</li>
  }
  return null; 
}

function getThirdEvolution(evolutionChain) {
  if (evolutionChain?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name) {
    return <li>{evolutionChain.chain.evolves_to[0].evolves_to[0].species.name}</li>
  }
  return null 
}

function SearchBox({searchValue, onSearchValueChange}) {
  return (
      <div className={"pokedex__search-input"}>
        <input
          value={searchValue}
          onChange={onSearchValueChange}
          placeholder={"Search Pokemon"}
        />
      </div>
    )
}

function App() {
    const [pokemonIndex, setPokemonIndex] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pokemonDetails, setPokemonDetails] = useState();
    const [evolutionChain, setEvolutionChain] = useState([]);

    // status = pending, loading, success, or error
    const [status, setStatus] = useState('pending');

    useEffect(() => {
        const fetchPokemon = async () => {
          setStatus('loading');
          try {
            const {results: pokemonList} = await fetchAllPokemon();
            if (pokemonList) { 
              setStatus('success');
              setPokemon(pokemonList);
              setPokemonIndex(pokemonList);
            } else {
              setStatus('error');
            }
          } catch (err) {
            setStatus('error');
          }
        }

        fetchPokemon().then(() => {
            /** noop **/
        })
    }, []) // Passing an empty array because we want the list to be fetched only once

    const onSearchValueChange = (event) => {
        const value = event.target.value;
        setPokemonDetails(null);
        setSearchValue(value);
        setPokemon(
            pokemonIndex.filter(monster => monster.name.includes(value))
        );
    }

    const onGetDetails = (name) => async () => {
      try {
        const details = await fetchPokemonDetailsByName(name);
        const species =  await fetchPokemonSpeciesByName(name);
        const evolutionChainId = new URL(species?.evolution_chain.url).pathname.split('/')[4];
        const evolution = await fetchEvolutionChainById(evolutionChainId);
        if (details && evolution) {
          setPokemonDetails(details);
          setEvolutionChain(evolution);
        } else {
          setStatus('error')
        }
      } catch (err) {
        setStatus('error');
      }
    }

    if (status === 'error') {
      return (
        <div className={'pokedex__container'}>
          <SearchBox searchValue={searchValue} onSearchValueChange={onSearchValueChange}/>
          Oops! Somthing went wrong. 
        </div>
      );
    }

    if (status === 'loading') {
      return (
        <div className={'pokedex__container'}>
          <SearchBox searchValue={searchValue} onSearchValueChange={onSearchValueChange}/>
          Loading...
        </div>
      );
    }

    if (status === 'pending' || status === 'success') {
      return (
        <div className={"pokedex__container"}>
          <SearchBox searchValue={searchValue} onSearchValueChange={onSearchValueChange} />
          <div className={"pokedex__content"}>
            {pokemon.length > 0 ? (
              <div className={"pokedex__search-results"}>
                {pokemon.map((monster) => {
                  return (
                    <div className={"pokedex__list-item"} key={monster.name}>
                      <div>{monster.name}</div>
                      <button onClick={onGetDetails(monster.name)}>
                        Get Details
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>No Results Found</div>
            )}
            {pokemonDetails && (
              <div className={"pokedex__details"}>
                <h1>{pokemonDetails.name}</h1>
                <div className={"pokedex__details_inner"}>
                  <div className={"pokedex__types"}>
                    <h2>Types</h2>
                    <ul>
                      {pokemonDetails.types?.map((type) => (
                        <li key={type.type.name}>{type.type.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={"pokedex__moves"}>
                    <h2>Moves</h2>
                    <ul>
                      {pokemonDetails.moves?.map((move) => (
                        <li key={move.move.name}>{move.move.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={"pokedex__evolutions"}>
                  <h2>Evolutions</h2>
                  {evolutionChain ? (
                      <ul>
                        {getFirstEvolution(evolutionChain)}
                        {getSecondEvolution(evolutionChain)}
                        {getThirdEvolution(evolutionChain)}
                      </ul>
                  ) : (
                      <div>No Evolution Info</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
  }
}

export default App;
