module STSEngine {
    "use strict";

    export class MetronomeImpl implements IMetronome {
        protected tickLength: number;
        protected startTime: number;
        protected pauseStart: number;
        protected pauseLength: number;

        protected isPaused: boolean;
        

        constructor(tickLength: number) {
            this.tickLength = tickLength;
            this.isPaused = true;
            this.pauseLength = 0;
        }

        public start(startTime?: number): void {
            if (!startTime) {
                this.startTime = Date.now();
            } else {
                this.startTime = startTime;
            }

            this.pauseStart = this.startTime;
            this.resume();
        }

        public getStartTime(): number {
            return this.startTime;
        }

        public pause(): void {
            if (!this.isPaused) {
                this.pauseStart = Date.now();
                this.isPaused = true;
            }
        }

        public resume(): void {
            if (this.isPaused) {
                var pauseEnd = Date.now();
                this.pauseLength += (pauseEnd - this.pauseStart);
                this.isPaused = false;
            }
        }

        public getTickLength(): number {
            return this.tickLength;
        }

        public getTickCount(): number {
            var totalTime = Date.now() - this.startTime - this.pauseLength;
            return Math.floor(totalTime / this.tickLength);
        }
    }
}