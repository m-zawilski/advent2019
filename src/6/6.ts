import readFile from '../common/readFile';
import { isString } from 'util';

interface Planet {
  name: string,
  orbitChain: string[]
}

const question6 = async () => {
  readFile(6).then(data => {
    if (isString(data)) {
      getFirstAnswer(data);
      getSecondAnswer(data);
    } else {
      throw 'Wrong data type';
    }
  })
  .catch(err => {
    console.log(err);
  });
}

const getFirstAnswer = (data: string) => {
  const planets: Planet[] = createPlanets(data);
  console.log(`1) First answer: ${getOrbitSum(planets)}`);
}

const getSecondAnswer = (data: string) => {
  const planets: Planet[] = createPlanets(data);
  const closestCommonParent: Planet = findClosestCommonParent(planets, 'YOU', 'SAN');
  console.log(`2) Second answer: ${getTransfersSum(planets, closestCommonParent, 'YOU', 'SAN')}`);
}

const getTransfersSum = ( planets: Planet[], closestCommonParent: Planet, s1: string, s2: string ): number => {
  return planets.reduce((acc, planet) => {
    if(closestCommonParent.orbitChain.includes(planet.name) && 
    (planet.orbitChain.includes(s1) || planet.orbitChain.includes(s2))){
      return acc + 1;
    } else {
      return acc;
    }
  }, 0) 
}

const findClosestCommonParent = ( planets: Planet[], s1: string, s2: string ): Planet => {
  let found: Planet = planets[0];
  let minLength = Infinity;
  for(let planet of planets) {
    if(planet.orbitChain.length < minLength && planet.orbitChain.includes(s1) && planet.orbitChain.includes(s2)){
      found = planet;
      minLength = planet.orbitChain.length;
    }
  }
  return found;
}

const getOrbitSum = ( planets: Planet[] ): number => {
  return planets.reduce((acc, planet) => {
    return acc + planet.orbitChain.length;
  }, 0)
}

const createPlanets = ( data: string ): Planet[] => {
  const orbitCodes = data.split('\n');
  let planets: Planet[] = [];
  for(let orbitCode of orbitCodes){
    planets = updatePlanets(orbitCode, planets);
  }
  return planets;
}

const updatePlanets = ( orbitCode: string, planets: Planet[] ): Planet[] => {
  const [ orbited, orbiting ] = orbitCode.split(')');
  let planetsCopy: Planet[] = [];
  const isOrbitedInArray = isPlanetInArray(orbited, planets);
  const isOrbitingInArray = isPlanetInArray(orbiting, planets);
  if (isOrbitedInArray && isOrbitingInArray){
    planetsCopy = connectTwoPlanetsAndUpdateChains(planets, orbited, orbiting);
  } else if (isOrbitedInArray){
    planetsCopy = addNewPlanetToSuitableChains(planets, orbited, orbiting);
  } else if (isOrbitingInArray){
    planetsCopy = addNewOrbitedPlanet(planets, orbited, orbiting);
  } else {
    planetsCopy = addBothNewPlanets(planets, orbited, orbiting);
  }
  return planetsCopy;
}

const connectTwoPlanetsAndUpdateChains = ( planets: Planet[], orbited: string, orbiting: string ): Planet[] => {
  const orbitingPlanet = planets.find(planet => {
    return planet.name === orbiting;
  });
  if(orbitingPlanet === undefined){
    throw 'Unexpected planet disappearance';
  } 
  return planets.map((planet) => {
    if(planet.orbitChain.includes(orbited) || planet.name === orbited){
      return {
        name: planet.name,
        orbitChain: [
          orbiting,
          ...orbitingPlanet.orbitChain,
          ...planet.orbitChain
        ]
      }
    } else {
      return planet;
    }
  });
}

const addNewOrbitedPlanet = ( planets: Planet[], orbited: string, orbiting: string ): Planet[] => {
  const orbitingPlanet = planets.find(planet => {
    return planet.name === orbiting;
  })
  if(orbitingPlanet === undefined){
    throw 'Unexpected planet disappearance';
  } 
  return [
    ...planets,
    { name: orbited, orbitChain: [orbiting, ...orbitingPlanet.orbitChain ]}
  ]
}

const isPlanetInArray = ( name: string, planets: Planet[] ): boolean => {
  return planets.some(planet => {
    return planet.name === name;
  })
}

const addBothNewPlanets = ( planets: Planet[], orbited: string, orbiting: string ): Planet[] => {
  return [...planets, 
    { name: orbited, orbitChain: [orbiting]}, 
    { name: orbiting, orbitChain: []}
  ]
}

const addNewPlanetToSuitableChains = ( planets: Planet[], orbited: string, orbiting: string ): Planet[] => {
  return [ 
    ...planets.map((planet) => {
      return putNewPlanetIfInChain(planet, orbited, orbiting);
    }),
    { name: orbiting, orbitChain: []}
  ]
}

const putNewPlanetIfInChain = (planet: Planet, orbited: string, orbiting: string ): Planet => {
  if(planet.orbitChain.includes(orbited) || planet.name === orbited){
    return {
      name: planet.name,
      orbitChain: [...planet.orbitChain, orbiting]
    }
  } else {
    return planet;
  }
}

export {
  updatePlanets,
  putNewPlanetIfInChain,
  Planet,
  isPlanetInArray,
  getOrbitSum,
  findClosestCommonParent, 
  createPlanets,
  getTransfersSum,
  question6
}