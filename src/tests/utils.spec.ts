import { expect } from "chai";
import sinon from "sinon";
import { formatNumber, getDayName, remapNumberRange, getApiWeatherIcon, getWindDirection, parseWeatherCodeNumber, isThisWorse, isDay } from "../utils";

describe("Utils", () => {
    it("formatNumber", () => {
        const result = formatNumber(123.123);
        expect(result).to.equal("123.12");
    });

    it("getDayName", () => {
        const indexes = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
        const results = [];

        indexes.forEach((index) => {
            results.push(getDayName(index));
        });

        expect(results).to.eql(["?", "Today", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "?", "?"]);
    });

    it("remapNumberRange", () => {
        const mapper = remapNumberRange(-10, 0, 0, 10);
        const values = [-10, -5, 0];
        const results = [];

        values.forEach((value) => {
            results.push(mapper(value));
        });

        expect(results).to.eql([0, 5, 10]);
    });

    it("getApiWeatherIcon", () => {
        const codes = ["01d", "09d", "50d"];
        const resuts = [];

        codes.forEach((code) => {
            resuts.push(getApiWeatherIcon(code));
        });

        expect(resuts).to.eql(["ios-sunny", "ios-rainy", "weather-fog"]);
    });

    it("getWindDirection", () => {
        const degrees = [0, 90, 180, 270];
        const results = [];

        degrees.forEach((degree) => {
            results.push(getWindDirection(degree));
        });

        expect(results).to.eql(["N", "E", "S", "W"]);
    });

    it("parseWeatherCodeNumber", () => {
        const codes = ["01d", "09d", "50d"];
        const results = [];

        codes.forEach((code) => {
            results.push(parseWeatherCodeNumber(code));
        });

        expect(results).to.eql([1, 9, 50]);
    });

    it("isThisWorse", () => {
        const codes = ["01d", "09d", "50d"];
        const results = [];

        codes.forEach((code) => {
            results.push(isThisWorse("04n", code));
        });

        expect(results).to.eql([false, true, true]);
    });

    it("isDay", () => {
        // TODO: moment_1.default is not a function
    });
})