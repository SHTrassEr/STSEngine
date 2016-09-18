module STSEngine {
    "use strict";

    export class WorldSettingsImpl implements IWorldSettings {

        private settings: Map<string, number | string>;

        constructor(settings: Map<string, number | string>) {
            this.settings = settings;
        }

        public getMoveStepSize(): number {
            return <number>(this.settings.get("MoveStepSize"));
        }

        public getTickLength(): number {
            return <number>(this.settings.get("TickLength"));
        }

    }

}