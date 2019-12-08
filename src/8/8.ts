import readFile from '../common/readFile';
import { isString } from 'util';

const question8 = async () => {
  readFile(8).then(data => {
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

const getFirstAnswer = (dataString: string) => {
  const data = dataString.split('').map(v => parseInt(v));
  const layers = getAllLayers(data, 25, 6);
  const foundLayer = getLayerWithFewestZeroes(layers);
  console.log(`1) Result is: ${getValueOfLayer(foundLayer)}`);
}

const getSecondAnswer = (dataString: string) => {
  const data = dataString.split('').map(v => parseInt(v));
  const layers = getAllLayers(data, 25, 6);
  const picture = getPicture(layers);
  console.log(`2) Result:`);
  console.log(picture);
}

const getPicture = ( layers: number[][][] ): string => {
  const pictureLayer = getPictureLayer(layers);
  let picture = '';
  for(let row of pictureLayer){
    for(let i of row){
      if(i === 1){
        picture+='#';
      } else {
        picture+=' ';
      }
    }
    picture+='\n';
  }
  return picture;
}

const getPictureLayer = ( layers: number[][][] ): number[][] => {
  let pictureArray = getEmptyLayer(25, 6);
  for(let layer of layers){
    for(let i = 0; i < layer.length; i++){
      for (let j = 0; j < layer[0].length; j++){
        if([0,1].includes(layer[i][j]) && pictureArray[i][j] === -1){
          pictureArray[i][j] = layer[i][j];
        }
      }
    }
  }
  return pictureArray;
}

const getValueOfLayer = ( layer: number[][] ): number => {
  let numberOfOnes = 0;
  let numberOfTwoes = 0;
  for(let row of layer){
    for (let i of row){
      if(i === 1){
        numberOfOnes++;
      } else if (i === 2){
        numberOfTwoes++;
      }
    }
  }
  return numberOfOnes * numberOfTwoes;
}

const getLayerWithFewestZeroes = ( layers: number[][][] ): number[][] => {
  let fewestZeroes = Infinity;
  return layers.reduce((found, layer) => {
    let currentLayerZeroes = 0;
    for(let row of layer){
      for (let i of row){
        if(i === 0){
          currentLayerZeroes++;
        }
      }
    }
    if(currentLayerZeroes < fewestZeroes){
      fewestZeroes = currentLayerZeroes;
      return layer;
    }
    return found;
  }, [])
}

const getAllLayers = ( data: number[], width: number, height: number ): number[][][] => {
  let layers = [];
  let id = 0;
  while(id*width*height < data.length){
    layers.push(getLayer(data, id, width, height));
    id++;
  }
  return layers;
}

const getLayer = ( data: number[], id: number, width: number, height: number ): number[][] => {
  let layer = [];
  for(let i = 0; i < height; i++){
    let row = [];
    for (let j = 0; j < width; j++){
      row.push(data[id*width*height+i*width+j]);
    }
    layer.push(row);
  }
  return layer;
}

const getEmptyLayer = ( width: number, height: number ): number[][] => {
  let layer = [];
  for(let i = 0; i < height; i++){
    let row = [];
    for (let j = 0; j < width; j++){
      row.push(-1);
    }
    layer.push(row);
  }
  return layer;
}

export {
  getLayer,
  getAllLayers,
  getLayerWithFewestZeroes,
  question8
}