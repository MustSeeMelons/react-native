export const getLocation = async (): Promise<Position> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position: Position) => {
                return resolve(position);
            },
            (error: PositionError) => {
                console.warn(error);
                reject(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    });
}