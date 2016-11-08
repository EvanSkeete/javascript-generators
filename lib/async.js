import api from './api.js';
import prettyPrint from './print.js';

/*
* Like a regular map, but wraps the results in a Promise.all
*/
function mapAsync(collection, func) {
  return Promise.all(collection.map(item => func(item)));
}

/*
* Makes several requests to get some crucial information about a pokemon
*/
async function getPokemonInfo(name) {
  // Get the basic pokemon info
  const pokemon = await api.promiseGet(
    'pokemon', name
  );

  // Get a list of encounters for this pokemon
  let encounters = await api.promiseGet(
    'pokemon', pokemon.id, 'encounters'
  );

  // Fetch data for each of the pokemon's abilities
  let abilities = await mapAsync(
    pokemon.abilities,
    ability => api.promiseGet(
      'ability', ability.ability.name
    )
  );

  // The stuff below here is not interesting
  encounters = Object.keys(encounters.reduce(
    (mapOfEncounters, encounter) => {
      mapOfEncounters[encounter.location_area.name] = true;
      return mapOfEncounters;
    },
    {}
  ));

  abilities = abilities.map(
    ability => `${ability.name}: ${ability.effect_entries[0].short_effect}`
  );

  return ({
    name: pokemon.name,
    types: pokemon.types.map(type => type.type.name),
    abilities,
    encounters
  });
}

/*
* Given a pokemon name, fetch and print some info about it... 3
*/
export async function iChooseYou3(name) {
  try {
    // This is the magic right here
    const info = await getPokemonInfo(name);
    prettyPrint(info);
  } catch (e) {
    console.log(e);
  }
}
