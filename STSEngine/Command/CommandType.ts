module STSEngine {
    "use strict";

    export enum CommandType {
        Unknown,
        CreateObject,
        StartMoveUp,
        StartMoveDown,
        StartMoveLeft,
        StartMoveRight,
        StopMoveUp,
        StopMoveDown,
        StopMoveLeft,
        StopMoveRight,
    }
}