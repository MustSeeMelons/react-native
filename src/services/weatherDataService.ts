import { ForecastData } from "../definitions/apiDefinitions";
import { IProcessedWeatherData } from "../definitions/storeDefinitions";
import _ from "lodash";
import moment from "moment";
import { HOUR_FORMAT, getWindDirection, isDay, isThisWorse } from "../utils";

const getDayOfTheMonth = (date: number) => {
    return new Date(date * 1000).getDate();
}

const getDayOfTheWeek = (date: number) => {
    return new Date(date * 1000).getDay();
}

const toCelcius = (tempKelvin: number) => {
    return tempKelvin - 273.15;
}

/**
 * @description Process api data into the format we need
 * @param data 
 */
export const processWeatherData = (data: ForecastData): IProcessedWeatherData => {
    const processWeatherData: IProcessedWeatherData = {
        city: data.city.name,
        future: [],
        hourly: [],
        timestamp: new Date()
    };

    data.list.reduce((acc, curr, index) => {
        // Take the first as the current temprature
        if (index === 0) {
            acc.current = {
                currTemp: toCelcius(curr.main.temp),
                sunrise: moment(data.city.sunrise * 1000).format(HOUR_FORMAT),
                sunset: moment(data.city.sunset * 1000).format(HOUR_FORMAT),
                description: _.get(curr, "weather[0].description"),
                wind: {
                    dir: getWindDirection(curr.wind.deg),
                    speed: curr.wind.speed
                }
            }
        }

        // For hourly graph 
        acc.hourly.push({
            temp: toCelcius(curr.main.temp),
            time: moment(curr.dt * 1000).format(HOUR_FORMAT),
            icon: _.get(curr, "weather[0].icon"),
            wind: {
                dir: getWindDirection(curr.wind.deg),
                speed: curr.wind.speed
            }
        });

        // Group max/min temps by date
        const last = _.last(acc.future);
        if (last) {
            if (getDayOfTheMonth(curr.dt) !== last.date) {
                acc.future.push({
                    date: getDayOfTheMonth(curr.dt),
                    maxTemp: toCelcius(curr.main.temp),
                    minTemp: toCelcius(curr.main.temp),
                    weekDay: getDayOfTheWeek(curr.dt),
                    recCount: 1,
                    icon: {
                        day: _.get(curr, "weather[0].icon"),
                        night: _.get(curr, "weather[0].icon")
                    },
                    wind: {
                        dir: getWindDirection(curr.wind.deg),
                        speed: curr.wind.speed
                    }
                });
            } else {
                const currTemp = toCelcius(curr.main.temp);
                if (currTemp > last.maxTemp) {
                    last.maxTemp = currTemp;
                }

                if (currTemp < last.minTemp) {
                    last.minTemp = currTemp;
                }

                last.recCount++;

                const currIcon = _.get(curr, "weather[0].icon");

                if (isDay(curr.dt)) {
                    if (isThisWorse(last.icon.day, currIcon)) {
                        last.icon.day = currIcon;
                    }
                } else {
                    if (isThisWorse(last.icon.night, currIcon)) {
                        last.icon.night = currIcon;
                    }
                }
            }
        } else {
            acc.future.push({
                date: getDayOfTheMonth(curr.dt),
                maxTemp: toCelcius(curr.main.temp),
                minTemp: toCelcius(curr.main.temp),
                weekDay: getDayOfTheWeek(curr.dt),
                icon: {
                    day: _.get(curr, "weather[0].icon"),
                    night: _.get(curr, "weather[0].icon")
                },
                recCount: 1,
                wind: {
                    dir: getWindDirection(curr.wind.deg),
                    speed: curr.wind.speed
                }
            });
        }


        return acc;
    }, processWeatherData);

    return processWeatherData;
}