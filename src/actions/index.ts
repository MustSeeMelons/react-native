import { IAskForPermission, ISetPositionData, IShowError, ISetLoading } from "./globalActions";

export type Action = IAskForPermission | ISetPositionData | IShowError | ISetLoading;