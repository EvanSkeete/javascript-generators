import api from './api.js';
import co from 'co';
import prettyPrint from './print.js';

function run(g) {
  const it = g();
  let ret;

  // asynchronously iterate over generator
  var iterate = function iterate(err, val) {
    if (err) {
      ret = it.throw(err);
    } else {
      ret = it.next(val);
    }
    if (!ret.done) {
      // is it a promise?
      if ("then" in ret.value) {
        // wait on the promise
        ret.value.then(val => iterate(null, val));
        ret.value.catch(err => iterate(err));
      } else {
        setTimeout(function() {
          return iterate(null, ret.value);
        });
      }
    }
  };

  iterate();
}

/*
* Like a regular map, but wraps the results in a Promise.all
*/
function mapAsync(collection, func) {
  return Promise.all(collection.map(item => func(item)));
}

/*
* Makes several requests to get some crucial information about a pokemon
*/
function * getPokemonInfo(name) {
  // Get the basic pokemon info
  const pokemon = yield api.promiseGet(
    'pokemon', name
  );

  // Get a list of encounters for this pokemon
  let encounters = yield api.promiseGet(
    'pokemon', pokemon.id, 'encounters'
  );

  // Fetch data for each of the pokemon's abilities
  let abilities = yield mapAsync(
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
* Given a pokemon name, fetch and print some info about it
*/
export function iChooseYou(name) {
  run(function * foo() {
    try {
      // This is the magic right here
      const info = yield * getPokemonInfo(name);
      prettyPrint(info);
    } catch (e) {
      console.log(e);
    }
  });
}

/*
* Given a pokemon name, fetch and print some info about it... 2
*/
export function iChooseYou2(name) {
  co(function * foo() {
    try {
      // This is the magic right here
      const info = yield * getPokemonInfo(name);
      prettyPrint(info);
    } catch (e) {
      console.log(e);
    }
  });
}
