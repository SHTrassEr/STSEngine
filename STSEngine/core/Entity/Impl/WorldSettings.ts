namespace STSEngine {

    export class WorldSettings implements IWorldSettings {

        protected settings: Map<string, any>;

        constructor(settings: IKeyValuePair[]) {
            this.settings = new Map<string, any>();
            this.setSettilgs(settings);
        }

        protected setSettilgs(settings: IKeyValuePair[]) {
            for (var kvp of settings) {
                this.settings.set(kvp.key, kvp.value);
            }
        }

        public getMoveStepSize(): number {
            return <number>(this.settings.get("MoveStepSize"));
        }

        public getTickLength(): number {
            return <number>(this.settings.get("TickLength"));
        }

    }

}