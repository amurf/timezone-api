const chrono = require('chrono-node');

var CityRefiner = new chrono.Refiner();


const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

CityRefiner.refine = function(text, results) {

  let cityRegex = new RegExp("Tokyo|Melbourne|Japan", "i");
  let cityMap = {
    'Melbourne' : 'Australia/Melbourne',
    'Japan'     : 'Asia/Tokyo',
    'Tokyo'     : 'Asia/Tokyo',
  };

  results.forEach(function(result) {
    let match;

    if ((match = cityRegex.exec(text.toLowerCase())) !== null) {
      let city = capitalize(match[0]);
      result.start.assign('city', city);

      let timezone = cityMap[city];
      if (timezone) {
        result.start.assign('timezone', timezone);
      }
    }
  });

  return results;
}
module.exports = CityRefiner;
