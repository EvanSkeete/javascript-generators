import "babel-polyfill";
import api from './lib/api.js';
import cache from './lib/cache.js';
import {
  printPokemonInfo,
  printPokemonInfo2,
  printPokemonInfo3
} from './lib/generators.js';

// api.get('pokemon', '1', console.log);

const repl = require('repl');
const r = repl.start('>>> ');
r.context.api = api;
r.context.cache = cache;
r.context.printPokemonInfo = printPokemonInfo;
r.context.printPokemonInfo2 = printPokemonInfo2;
r.context.printPokemonInfo3 = printPokemonInfo3;
