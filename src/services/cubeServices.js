let Cube = require("./../models/Cube");

exports.create = async (cubeData) => {
  const newCube = await Cube.create(cubeData);
  return newCube;
};

exports.getAllQueried = async (params) => {
  let defaultSearchParams = {
    search: "(.*?)",
    from: 1,
    to: 6,
  };

  Object.entries(params)
    .filter((x) => x[1] != "")
    .map((x) => (defaultSearchParams[x[0]] = x[1]));

  let filteredCubes = await Cube.find({
    name: { $regex: defaultSearchParams.search },
  })
    .where("difficultyLevel")
    .gte(defaultSearchParams.from)
    .lte(defaultSearchParams.to)
    .lean();

  return filteredCubes;
};

exports.getCurrentCube = async (id) => {
  return await Cube.findById(id).lean();
};

exports.getCurrentCubeNotLeaned = async (id) => {
  return await Cube.findById(id);
};

exports.delete = async (id) => Cube.findByIdAndDelete(id);
