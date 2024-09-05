import { isSameHour, roundToNearestHours } from 'date-fns';

function extractLocationData(dataArr) {
  const {
    location: { country, localtime: time, name: cityName, region },
  } = dataArr;
  const location = {
    country,
    time: new Date(time),
    cityName,
    region,
  };
  return location;
}

function extractCurrentData(dataArr) {
  const {
    current: {
      condition: {
        text: conditionText,
        icon: conditionIcon,
        code: conditionCode,
      },
      is_day: isDay,
      temp_c: tempC,
      temp_f: tempF,
      uv,
      humidity,
    },
  } = dataArr;
  const current = {
    conditionText,
    conditionIcon,
    conditionCode,
    isDay,
    tempC: Math.round(parseInt(tempC, 10)),
    tempF: Math.round(parseInt(tempF, 10)),
    uv,
    humidity,
  };
  return current;
}

function extractDayForecast(day, date) {
  const {
    mintemp_c: minTempC,
    mintemp_f: minTempF,
    maxtemp_c: maxTempC,
    maxtemp_f: maxTempF,
    daily_chance_of_rain: precipitation,
    condition: { text: conditionText, icon: conditionIcon },
  } = day;
  const weekdate = new Date(date);
  const dayOfWeek = weekdate.getDay();
  const dayCondensed = {
    dayOfWeek,
    minTempC: Math.round(parseInt(minTempC, 10)),
    minTempF: Math.round(parseInt(minTempF, 10)),
    maxTempC: Math.round(parseInt(maxTempC, 10)),
    maxTempF: Math.round(parseInt(maxTempF, 10)),
    precipitation: Math.round(parseInt(precipitation, 10)),
    conditionText,
    conditionIcon,
  };
  return dayCondensed;
}

function extractHourlyForecast(forecastArr, time) {
  const roundedTime = roundToNearestHours(time, { roundingMethod: 'ceil' });

  const firstDayArr = forecastArr[0].hour;
  const index = firstDayArr.findIndex((hour) => {
    return isSameHour(roundedTime, hour.time);
  });
  const firstHours = firstDayArr.slice(index);

  const secondDayArr = forecastArr[1].hour;
  const secondHours = secondDayArr.slice(0, index);

  const twentyFourHours = [...firstHours, ...secondHours];
  const options = {
    hour12: true,
    hour: 'numeric',
  };
  const intDateFormat = new Intl.DateTimeFormat(undefined, options);

  const reducedHours = twentyFourHours.map((hour) => {
    const currentHour = hour.time;
    const formattedHour = intDateFormat.format(new Date(currentHour));
    return {
      hour: formattedHour,
      tempC: Math.round(parseInt(hour.temp_c, 10)),
      tempF: Math.round(parseInt(hour.temp_f, 10)),
      precipitation: Math.round(parseInt(hour.chance_of_rain, 10)),
      conditionText: hour.condition.text,
      conditionIcon: hour.condition.icon,
    };
  });
  return reducedHours;
}

function extractForecastData(dataArr, time) {
  const forecastArr = dataArr.forecast.forecastday;
  const forecast = {};
  forecastArr.forEach((day, index) => {
    forecast[index] = extractDayForecast(day.day, day.date);
  });
  const hourly = extractHourlyForecast(forecastArr, time);
  return { forecast, hourly };
}

export { extractCurrentData, extractLocationData, extractForecastData };
