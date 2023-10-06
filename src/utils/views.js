exports.generateDifficultyLevelViewOpts = (difficultyLevel) => {
  let optionNames = [
    "Very Easy",
    "Easy",
    "Medium",
    "Intermediate",
    "Expert",
    "Hardcore",
  ];
  let mappedOptions = optionNames.map((element, index) => {
    currentOption = {
      name: `${index + 1} - ${element}`,
      value: index + 1,
      selected: difficultyLevel == index + 1 ? true : false,
    };
    return currentOption;
  });
  return mappedOptions;
};
