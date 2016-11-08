const _cache = {};

export default {
  set: (...args) => {
    const val = args.pop();
    const key = args.pop();

    let obj = _cache;

    args.forEach(arg => {
      if (obj[arg] === undefined) obj[arg] = {};
      obj = obj[arg];
    });

    obj[key] = val;
  },

  get: (...args) => args.reduce((obj, arg) =>
      (obj === undefined ? undefined : obj[arg]),
      _cache),

  dump: () => _cache
};
