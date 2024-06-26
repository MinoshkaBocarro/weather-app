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
      air_quality: { pm2_5: airQuality },
      condition: { text: conditionText, icon: conditionIcon },
      temp_c: tempC,
      temp_f: tempF,
      uv,
      humidity,
    },
  } = dataArr;
  const current = {
    airQuality,
    conditionText,
    conditionIcon,
    tempC,
    tempF,
    uv,
    humidity,
  };
  return current;
}

function extractDayForecast(day) {
  const {
    mintemp_c: minTempC,
    mintemp_f: minTempF,
    maxtemp_c: maxTempC,
    maxtemp_f: maxTempF,
    totalprecip_mm: precipitationMm,
    condition: { text: conditionText, icon: conditionIcon },
  } = day;
  const dayCondensed = {
    minTempC,
    minTempF,
    maxTempC,
    maxTempF,
    precipitationMm,
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
      tempC: hour.temp_c,
      tempF: hour.temp_f,
      precipitationMm: hour.precip_mm,
      conditionText: hour.condition.text,
      conditionIcon: hour.condition.icon,
    };
  });
  return { hourly: reducedHours };
}

function extractForecastData(dataArr, time) {
  const forecastArr = dataArr.forecast.forecastday;
  const forecast = {};
  forecastArr.forEach((day, index) => {
    forecast[`day${index}`] = extractDayForecast(day.day);
  });
  const hourly = extractHourlyForecast(forecastArr, time);
  return { forecast, hourly };
}

export { extractCurrentData, extractLocationData, extractForecastData };
