export interface ForecastData {
    code: string;
    message: string;
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        },
        country: string;
        sunrise: number; // Why not in API doc!?
        sunset: number; // Why not in API doc!?
        timezone: number;
    };
    list: {
        dt: number;
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        },
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        },
        clouds: {
            all: number;
        },
        wind: {
            speed: number;
            deg: number;
        },
        rain: {
            "3h": number;
        },
        snow: {
            "3h": number;
        },
        dt_txt: "string"
    }[]
}
