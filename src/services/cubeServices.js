const uniqid = require("uniqid");

let cubes = [
  {
    id: "sh69tsnln02ydsv",
    name: "dsadsa",
    description: "dsadsadsadsa",
    imageUrl: "32113321321321",
    difficultyLevel: "1",
  },
  {
    id: "sh69tsnln02yjv3",
    name: "dsasdadsadsa",
    description: "dsadsadsadsadsa",
    imageUrl: "dsadsadsadsaads",
    difficultyLevel: "1",
  },
];

exports.create = (cubeData) => {
  let newCube = {
    id: uniqid(),
    ...cubeData,
  };
  cubes.push(newCube);
  return newCube;
};

exports.getAll = () => {
  return [...cubes];
};
