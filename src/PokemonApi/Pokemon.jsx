import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./Pokemon.css"; // Import the CSS file

// API :  https://pokeapi.co/api/v2/pokemon/1

const Pokemon = () => {
  const [num, setnum] = useState("1");
  const [name, setname] = useState("");
  const [moves, setmoves] = useState();
  const [heroMoves, setHeroMoves] = useState([]);
  const [showMoves, setShowMoves] = useState(false);
  const [pokemonList, setPokemonList] = useState([]); // State to store the list of Pokémon

  useEffect(() => {
    async function getPokemonList() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        ); // Fetch the first 151 Pokémon for example
        const pokemonData = response.data.results;
        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    }

    getPokemonList();
  }, []); // Fetch the Pokémon list once when the component mounts

  useEffect(() => {
    async function getdata() {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`);
      // console.log(res.data.name);
      // console.log(res);
      setname(res.data.name);
      setmoves(res.data.moves.length);
      const hero = res.data.moves.map((val) => {
        return val.move.name;
      });
      setHeroMoves(hero);
    }
    getdata();
  }, [num]);

  const handleButtonClick = () => {
    setShowMoves((prevShowMoves) => !prevShowMoves); // Toggle showMoves state
  };

  return (
    <>
      <div className="pokemon-container">
        <h1>Pokemon Information</h1>
        <div className="input-container">
          <label htmlFor="pokemon-select">Select a Pokemon:</label>
          <select
            id="pokemon-select"
            value={num}
            onChange={(event) => {
              setnum(event.target.value);
            }}
          >
          {/* It is also done my the pokemon number */}
            {/* 
             <option value="1">1</option>
            <option value="25">25</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option> */}
            {pokemonList.map((pokemon, index) => (
              <option key={index} value={index + 1}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
        <h1>
          You choose <span style={{ color: "red" }}> {num}</span> value
        </h1>
        <h1>
          My name is <span style={{ color: "red" }}>{name}</span>
        </h1>
        <h1>
          I have <span style={{ color: "red" }}>{moves}</span> moves
        </h1>

        <button className="toggle-button" onClick={handleButtonClick}>
          {showMoves ? "Hide Moves" : "Show Moves"}
        </button>

        {showMoves && (
          <div className="moves-container">
            <h2>Pokemon Moves Names</h2>
            <ul>
              {heroMoves.map((move, index) => (
                <li key={index}>{move}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Pokemon;
