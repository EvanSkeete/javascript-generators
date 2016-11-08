import "babel-polyfill";
import api from './lib/api.js';
import cache from './lib/cache.js';
import {iChooseYou, iChooseYou2} from './lib/generators.js';
import {iChooseYou3} from './lib/async.js';

/*
cache.set('Evan', 'attributes', 'isCool', true)
cache.set('Evan', 'age', 25)
cache.get('Evan')
cache.get('Evan', 'age')
cache.dump()
*/

/*
api.get('pokemon', 'pikachu', console.log)
api.cacheGet('pokemon', 'jigglypuff', console.log)
api.promiseGet('pokemon', 'mewtwo').then(console.log)
*/

// api.get('pokemon', 'pikachu', (err, pikachu) => {
//   if (!err) {
//     api.get('pokemon', pikachu.id, 'encounters', (err, encounters) => {
//       if (!err) {
//         pikachu.abilities.forEach((err, ability) => {
//           if (!err) {
//             api.get('ability', ability.ability.name, () => {
//               console.log("😭😭😭");
//             });
//           }
//         });
//       }
//     });
//   }
// });

// api.promiseGet('pokemon', 'pikachu').then(pikachu => {
//   // Do something with pikachu
//   console.log(pikachu.id);
//   return api.promiseGet('pokemon', pikachu.id, 'encounters');
// }).then(encounters => {
//   // Do something with encounters
//   console.log(encounters);
//   // Do something with pikachu
//   console.log("🤔🤔🤔");
// }).catch(err => {
//   // Deal with it
//   console.log(err);
// });

// // THIS IS WHAT WE REALLY WANT
// try {
//   const pika = api.get('pokemon', 'pikachu');
//   const pikaEncounters = api.get('pokemon', pika.id, 'encounters');
//   const pikaAbilities = pika.abilities.map(ability => (
//     api.get('ability', ability.ability.name)
//   ));
//   console.log(pika);
//   console.log(pikaEncounters);
//   console.log(pikaAbilities);
//   takeTheRestOfTheDayOff();
// } catch (e) {
//   // Deal with it
//   console.log(e);
// }

/*
  iChooseYou('charmander')
  iChooseYou('squirtle')
  iChooseYou('drowzee')
  iChooseYou2('pidgey')
  iChooseYou2('rattata')
  iChooseYou2('zubat')
  iChooseYou3('rapidash')
  iChooseYou3('zapdos')
  iChooseYou3('dragonite')
*/

const repl = require('repl');
const r = repl.start('>>> ');
r.context.api = api;
r.context.cache = cache;
r.context.iChooseYou = iChooseYou;
r.context.iChooseYou2 = iChooseYou2;
r.context.iChooseYou3 = iChooseYou3;
