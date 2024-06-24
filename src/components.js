class Weather {
  constructor({ location, current, forecast, hourly }) {
    this.location = location;
    this.current = current;
    this.forecast = forecast;
    this.hourly = hourly;
  }
}

export { Weather };
