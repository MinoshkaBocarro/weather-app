const gifLibrary = [];

function gifAdder(conditionArray, dayArray, gifIdString) {
  const newGif = {
    conditionText: conditionArray,
    isDay: dayArray,
    gifId: gifIdString,
  };
  gifLibrary.push(newGif);
}

gifAdder(['Sunny'], ['1'], 'lyVNcb1n5Ob0Q');
gifAdder(['Clear'], ['0'], 'plL5aANhyymzWcukba');
gifAdder(['Partly cloudy'], ['1'], 'G1T5M0qT6ZJlu');
gifAdder(['Partly cloudy'], ['0'], 'fx1VKoLfqi9DYPzB34');
gifAdder(['Cloudy'], ['1'], 'HoUgegTjteXCw');
gifAdder(['Cloudy'], ['0'], 'LRHiRGB4J56NlBosbO');
gifAdder(['Overcast'], ['0', '1'], '3o7rc6sa2RvKo8K5EI');
gifAdder(['Mist', 'Fog', 'Freezing fog'], ['0', '1'], 'yhZr5Wx7CBFbq');
gifAdder(
  [
    'Patchy rain possible',
    'Patchy freezing drizzle possible',
    'Patchy light drizzle',
    'Light drizzle',
    'Freezing drizzle',
    'Heavy freezing drizzle',
    'Patchy light rain',
    'Light rain',
    'Light freezing rain',
    'Light rain shower',
  ],
  ['0', '1'],
  't7Qb8655Z1VfBGr5XB',
);
gifAdder(
  [
    'Patchy snow possible',
    'Patchy sleet possible',
    'Light snow showers',
    'Patchy light snow',
    'Light snow',
  ],
  ['0', '1'],
  'FoVi0LDjy1XS8',
);
gifAdder(
  ['Moderate or heavy snow showers', 'Patchy moderate snow', 'Moderate snow'],
  ['0', '1'],
  '7Bgpw7PwdxoDC',
);
gifAdder(
  ['Heavy snow', 'Patchy heavy snow', 'Blowing snow', 'Blizzard'],
  ['0', '1'],
  'rRmBOCZDJJGU0',
);
gifAdder(['Thundery outbreaks possible'], ['0', '1'], 'xaZCqV4weJwHu');
gifAdder(
  [
    'Moderate rain at times',
    'Moderate rain',
    'Moderate or heavy freezing rain',
    'Heavy rain at times',
    'Heavy rain',
    'Moderate or heavy rain showers',
  ],
  ['0', '1'],
  'Mgq7EMQUrhcvC',
);
gifAdder(['Torrential rain shower'], ['0', '1'], '3o7atcQJyJzLoDn9EQ');
gifAdder(
  [
    'Light sleet',
    'Moderate or heavy sleet',
    'Light sleet showers',
    'Moderate or heavy sleet showers',
  ],
  [''],
  'A9dCxwH4iflw4',
);
gifAdder(['Patchy light rain with thunder'], ['0', '1'], '3o6gDYJBQLIHFZoWL6');
gifAdder(
  ['Moderate or heavy rain with thunder'],
  ['0', '1'],
  '3osxYzIQRqN4DOEddC',
);
gifAdder(
  ['Moderate or heavy snow with thunder', 'Patchy light snow with thunder'],
  ['0', '1'],
  '3oEjHB1EKuujDjYFWw',
);
gifAdder(
  ['Ice pellets', 'Light showers of ice pellets'],
  ['0', '1'],
  'ttiXhwvDgdNuR6nBxx',
);
gifAdder(
  ['Moderate or heavy showers of ice pellets'],
  ['0', '1'],
  'JA8vXJq74sng1GVzJJ',
);

function findGif(term, day) {
  const gifObject = gifLibrary.find((gif) => {
    if (gif.conditionText.includes(term)) {
      if (gif.isDay.includes(day)) {
        return gif;
      }
    }
    return null;
  });
  if (gifObject === 'undefined') {
    throw Error('gif search term not found');
  }
  return gifObject.gifId;
}

export { findGif };
