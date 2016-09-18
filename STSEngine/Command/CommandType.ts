﻿module STSEngine {
    "use strict";

    export enum CommandType {
        Unknown,
        CreateObject,
        RegisterPlayer,
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