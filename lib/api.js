import request from 'request';
import cache from './cache.js';

const BASE_URL = 'http://pokeapi.co/api/v2/';

const get = (...args) => {
  const callback = args.pop();
  const url = BASE_URL + args.join('/');

  return request(
    url,
    (error, response, body) => {
      try {
        const result = JSON.parse(body);
        callback(error, result);
      } catch (e) {
        callback({
          error: 'Unable to parse response'
        });
      }
    }
  );
};

const cacheGet = (...args) => {
  const callback = args.pop();
  var maybeCached = cache.get(...args);
  if (maybeCached) return callback(null, maybeCached);

  get(...args, (error, result) => {
    cache.set(...args, result);
    callback(error, result);
  });
};

const promiseGet = (...args) => new Promise((resolve, reject) => {
  cacheGet(...args, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

export default {
  get,
  cacheGet,
  promiseGet
};
