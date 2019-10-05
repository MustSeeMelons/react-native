import { IAskForPermission, ISetPositionData, IShowError, ISetLoading, ISetWeather } from "./globalActions";

export type Action = IAskForPermission | ISetPositionData | IShowError | ISetLoading | ISetWeather;