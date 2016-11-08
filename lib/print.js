/*
* Given a pokemon print some info about it
*/
export default pokemon => {
  const abilities = pokemon.abilities.map(ability => `
    ${ability}
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
  );

  const encounters = pokemon.encounters.map(encounter => `
    ${encounter}`
  );

  console.log(`
    ****************************************************************************
  `);

  console.log('\x1b[35m', `
        _ __   ___ | | _____ _ __ ___   ___  _ __
       | '_ \\ / _ \\| |/ / _ \\ '_   _ \\ / _ \\|  _ \\
       | |_) | (_) |   <  __/ | | | | | (_) | | | |
       | .__/ \\___/|_|\\_\\___|_| |_| |_|\\___/|_| |_|
       |_|
  `);

  console.log('\x1b[0m', `
                  NAME: ${pokemon.name.toUpperCase()}

                  TYPES: ${pokemon.types}

    ABILITIES:
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      ${abilities}

    ENCOUNTERS:
    ----------------------------------------
      ${encounters}
    ----------------------------------------

    ****************************************************************************
  `);
};
