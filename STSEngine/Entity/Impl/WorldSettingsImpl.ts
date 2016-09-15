module STSEngine {
    "use strict";

    export class WorldSettingsImpl implements IWorldSettings {

        private settings: Map<string, number | string>;

        constructor(settings: Map<string, number | string>) {
            this.settings = settings;
        }

        getMoveStepSize(): number {
            return <number>(this.settings.get("moveStepSize"));
        }

    }

}