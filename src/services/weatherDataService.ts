import { ForecastData } from "../definitions/apiDefinitions";
import { IProcessedWeatherData } from "../definitions/storeDefinitions";
import _ from "lodash";

const getDate = (date: number) => {
    return new Date(date * 1000).getDate();
}

const getTime = (date: number) => {
    const data = new Date(date * 1000);
    const hours = data.getHours();
    const minutes = data.getMinutes();

    // Minutes will always be 0, but what the heck
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

const toCelcius = (tempKelvin: number) => {
    return tempKelvin - 273.15;
}

// Process api data into the format we need
export const processWeatherData = (data: ForecastData): IProcessedWeatherData => {
    const processWeatherData: IProcessedWeatherData = {
        city: data.city.name,
        future: [],
        hourly: []
    };

    data.list.reduce((acc, curr, index) => {
        // Take the first as the current temprature
        if (index === 0) {
            acc.current = {
                currTemp: toCelcius(curr.main.temp)
            }
        }

        // For hourly graph
        acc.hourly.push({
            temp: toCelcius(curr.main.temp),
            time: getTime(curr.dt)
        });

        // Group max/min temps by date
        const last = _.last(acc.future);
        if (last) {
            if (getDate(curr.dt) !== last.date) {
                acc.future.push({
                    date: getDate(curr.dt),
                    maxTemp: toCelcius(curr.main.temp),
                    minTemp: toCelcius(curr.main.temp),
                    recCount: 1
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
            }
        } else {
            acc.future.push({
                date: getDate(curr.dt),
                maxTemp: toCelcius(curr.main.temp),
                minTemp: toCelcius(curr.main.temp),
                recCount: 1
            });
        }


        return acc;
    }, processWeatherData);

    return processWeatherData;
}