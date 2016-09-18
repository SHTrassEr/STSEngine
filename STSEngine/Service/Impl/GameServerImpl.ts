module STSEngine {
    "use strict";

    export class GameServerImpl implements IGameServer {

        protected engine: IEngine;
        protected metronome: IMetronome;
        protected commandLog: ICommand[][];
        protected timerId: number;

        constructor(engine: IEngine) {
            this.engine = engine;
            this.metronome = new MetronomeImpl(100);
            this.commandLog = [];
            this.timerId = 0;
        }

        public start(): void {
            var world = this.engine.getWorld();
            this.metronome.start();
            this.timerId = setInterval( () => this.updateWorld(), 100);
        }

        public getCommandLog(startStepNumber: number): ICommand[][] {
            return this.commandLog;
        }

        protected updateWorld() {
            var metronomeStepNumber = this.metronome.getTickCount();
            var currentStepNumber = this.getStepNumber();

            while (currentStepNumber < metronomeStepNumber) {
                currentStepNumber += 1;
                this.commandLog[currentStepNumber] = this.engine.getCommandList();
                this.engine.step();
            }
        }

        protected getStepNumber(): number {
            var world = this.engine.getWorld();
            return world.getStepNumber();
        }
    }
}


