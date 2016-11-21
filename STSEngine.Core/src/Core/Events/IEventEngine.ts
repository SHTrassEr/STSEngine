namespace STSEngine.Core {

    export interface IEventEngine {
        getSource(): IEngine;
        getStep(): number;
    }
}