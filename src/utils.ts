export const formatNumber = (num: number): string => {
    return num.toFixed(2);
}

export const getDayName = (index: number) => {
    switch (index) {
        case -1:
            return "Today";
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
    }
}

export const remapNumberRange = (
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
) => (num: number) => {
    return outMin + (outMax - outMin) * (num - inMin) / (inMax - inMin);
}

/**
 * d - Day, n - Night
 * Clear SKy:
 * 01d
 * 01n
 * 
 * Few Clouds:
 * 02d
 * 02n
 * 
 * Scattered Clouds:
 * 03d
 * 
 * Broken Clouds:
 * 04d
 * 04n
 * 
 * Showewr Rain:
 * 09d
 * 09n
 * 
 * Rain:
 * 10d
 * 10n
 * 
 * Thunderstorm:
 * 11d
 * 11n
 * 
 * Snow:
 * 13d
 * 13n
 * 
 * Mist/Fog:
 * 50d
 * 50n
 * 
 * @param code 
 */
export const getApiWeatherIcon = (code: string) => {
    switch (code) {
        case "01d":
            return "ios-sunny";
        case "01n":
            return "ios-moon";
        case "02d":
            return "md-partly-sunny";
        case "02n":
            return "md-cloudy-night";
        case "03d":
            return "ios-partly-sunny";
        case "03n":
            return "md-cloudy-night";
        case "04d":
        case "04n":
            return "ios-cloud";
        case "09d":
        case "09n":
        case "10d":
        case "10n":
            return "ios-rainy";
        case "11d":
        case "11n":
            return "ios-thunderstorm";
        case "13d":
        case "13n":
            return "cloud-snow";
        case "50d":
        case "50n":
            return "weather-fog";
        default:
            console.warn(`Could not find icon for: ${code}`);
            return "ios-warning"
    }
}