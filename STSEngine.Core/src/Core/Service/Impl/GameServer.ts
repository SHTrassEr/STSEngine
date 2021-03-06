﻿namespace STSEngine.Core {

    export class GameServer implements IGameServer {
        protected emptyCommandList: ICommand[];
        protected engine: IEngine;
        protected metronome: IMetronome;
        protected commandLog: ICommand[][];
        protected timerId: any;

        protected onUpdateWorld: (world: IWorld, currentStepNumber: number, commandList: ICommand[]) => void;

        constructor(engine: IEngine) {
            this.engine = engine;
            var tickLength = engine.getWorld().getWorldAttributeList().getTickLength();
            //let tickLength = 100;
            this.metronome = new Metronome(tickLength);
            this.commandLog = [];
            this.emptyCommandList = [];
            this.timerId = 0;
        }

        public start(): void {
            this.metronome.start();
            this.timerId = setInterval(this.updateWorld.bind(this), 10);
        }

        public getCommandLog(startStepNumber: number): ICommand[][] {
            return this.commandLog;
        }

        protected updateWorld() {
            let metronomeStepNumber = this.metronome.getTickCount();
            let currentStepNumber = this.getStepNumber();
            while (currentStepNumber < metronomeStepNumber) {
                currentStepNumber += 1;
                let commandList = this.engine.getCommandList();
                this.commandLog[currentStepNumber] = commandList;

                this.engine.update();

                if (this.onUpdateWorld) {
                    this.onUpdateWorld(this.engine.getWorld(), currentStepNumber, commandList);
                }


            }
        }

        protected getStepNumber(): number {
            return this.engine.getWorld().getWorldAttributeList().getStepNumber();
        }

        public setOnUpdateWorld(handler: (world: IWorld, currentStepNumber: number, commandList: ICommand[]) => void): void {
            this.onUpdateWorld = handler;
        }

    }
}

