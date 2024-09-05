const gifLibrary = [];

function gifAdder(conditionArray, dayArray, gifIdString) {
  const newGif = {
    conditionText: conditionArray,
    isDay: dayArray,
    gifId: gifIdString,
  };
  gifLibrary.push(newGif);
}

gifAdder(['1000'], ['1'], 'lyVNcb1n5Ob0Q');
gifAdder(['1000'], ['0'], 'plL5aANhyymzWcukba');
gifAdder(['1003'], ['1'], 'G1T5M0qT6ZJlu');
gifAdder(['1003'], ['0'], 'fx1VKoLfqi9DYPzB34');
gifAdder(['1006'], ['1'], 'HoUgegTjteXCw');
gifAdder(['1006'], ['0'], 'LRHiRGB4J56NlBosbO');
gifAdder(['1009'], ['0', '1'], '3o7rc6sa2RvKo8K5EI');
gifAdder(['1030', 'Fog', 'Freezing fog'], ['0', '1'], 'yhZr5Wx7CBFbq');
gifAdder(
  [
    '1063',
    '1072',
    '1150',
    '1153',
    '1168',
    '1171',
    '1180',
    '1183',
    '1198',
    '1240',
  ],
  ['0', '1'],
  't7Qb8655Z1VfBGr5XB',
);
gifAdder(['1066', '1069', '1255', '1279', '1213'], ['0', '1'], 'FoVi0LDjy1XS8');
gifAdder(['1258', '1216', '1219'], ['0', '1'], '7Bgpw7PwdxoDC');
gifAdder(['1225', '1222', '1114', '1117'], ['0', '1'], 'rRmBOCZDJJGU0');
gifAdder(['1087'], ['0', '1'], 'xaZCqV4weJwHu');
gifAdder(
  ['1186', '1189', '1201', '1192', '1195', '1243'],
  ['0', '1'],
  'Mgq7EMQUrhcvC',
);
gifAdder(['Torrential rain shower'], ['0', '1'], '3o7atcQJyJzLoDn9EQ');
gifAdder(['1204', '1207', '1249', '1252'], [''], 'A9dCxwH4iflw4');
gifAdder(['1273'], ['0', '1'], '3o6gDYJBQLIHFZoWL6');
gifAdder(['1276'], ['0', '1'], '3osxYzIQRqN4DOEddC');
gifAdder(['1282', '1279'], ['0', '1'], '3oEjHB1EKuujDjYFWw');
gifAdder(['1237', '1261'], ['0', '1'], 'ttiXhwvDgdNuR6nBxx');
gifAdder(['1264'], ['0', '1'], 'JA8vXJq74sng1GVzJJ');

function findGif(code, day) {
  const gifObject = gifLibrary.find((gif) => {
    if (gif.conditionText.includes(code)) {
      if (gif.isDay.includes(day)) {
        return gif;
      }
    }
    return null;
  });
  if (gifObject === 'undefined') {
    throw Error('gif search code not found');
  }
  return gifObject.gifId;
}

export { findGif };
