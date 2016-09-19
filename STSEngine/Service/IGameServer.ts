namespace STSEngine {
    "use strict";

    export interface IGameServer {
        start(): void;
        getCommandLog(startStepNumber: number): ICommand[][]; 
    }
}


