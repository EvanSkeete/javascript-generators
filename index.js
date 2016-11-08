import "babel-polyfill";
import api from './lib/api.js';
import cache from './lib/cache.js';
import {iChooseYou, iChooseYou2} from './lib/generators.js';
import {iChooseYou3} from './lib/async.js';
// api.get('pokemon', '1', console.log);

const repl = require('repl');
const r = repl.start('>>> ');
r.context.api = api;
r.context.cache = cache;
r.context.iChooseYou = iChooseYou;
r.context.iChooseYou2 = iChooseYou2;
r.context.iChooseYou3 = iChooseYou3;
