import { expect } from "chai";
import raw_data from "./raw/forecast.json";
import { processWeatherData } from "../services/weatherDataService";
import { Direction } from "../utils";

describe("weatherDataService", () => {
    it("processWeatherData", () => {
        const result = processWeatherData(raw_data as any);

        expect(result.city).to.equal("Tawarano");

        expect(result.current).to.eql({
            currTemp: 10.610000000000014,
            sunrise: "04:00",
            sunset: "04:00",
            description: "clear sky",
            wind: { dir: Direction.NORTH, speed: 7.27 }
        });

        expect(result.future[0]).to.eql({
            date: 31,
            maxTemp: 10.610000000000014,
            minTemp: 9.120000000000005,
            weekDay: 2,
            icon: {
                day: "01n",
                night: "01n"
            },
            recCount: 6,
            wind: {
                dir: Direction.NORTH,
                speed: 7.27
            }
        });

        expect(result.future[3]).to.eql({
            date: 3,
            maxTemp: 13.008000000000038,
            minTemp: 10.41900000000004,
            weekDay: 5,
            recCount: 8,
            icon: {
                day: "01n",
                night: "01n"
            },
            wind: {
                dir: Direction.WEST,
                speed: 8.87
            }
        });
    });
});