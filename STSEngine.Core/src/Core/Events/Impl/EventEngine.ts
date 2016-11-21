namespace STSEngine.Core {

    export class EventEngine implements IEventEngine {

        protected engine: IEngine;
        protected step: number;

        constructor(engine: IEngine, step: number) {
            this.engine = engine;
            this.step = step;
        }

        public getSource(): IEngine {
            return this.engine;
        }

        public getStep(): number {
            return this.step;
        }
    }
}