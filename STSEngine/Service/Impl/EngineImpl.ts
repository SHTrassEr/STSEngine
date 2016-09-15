module STSEngine {
    "use strict";

    export class EngineImpl implements IEngine {
        private world: IWorld;

        constructor(world: IWorld) {
            this.world = world;
        }

        public getWorld(): IWorld {
            return this.world;
        }

        public update(commandList: ICommand[]): void {
        }

    }

}