/// <reference path="CommandHandler.ts" />

namespace STSEngine.Example {

    export class CommandInitWorldHandler extends CommandHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        protected executeCommand(command: CommandInitWorld): void {
            this.initLimit(this.world);
        }

        protected initLimit(world: IWorld) {
            let engine = world.getPhysicsEngine().getEngine();
            let itemInitializer = world.getItemInitializer();
            let size = world.getWorldAttributeList().getWorldSize();
            let w = 200;
            let itemListService = world.getItemListService();

            let w1 = itemInitializer.createWall();
            w1.setPosition(new Vector(size[0] / 2, -w));
            w1.setSize(size[0] + w, w * 2);
            itemListService.add(w1);

            let w2 = itemInitializer.createWall();
            w2.setPosition(new Vector(size[0] / 2, size[1] + w));
            w2.setSize(size[0] + w, w * 2);
            itemListService.add(w2);

            let w3 = itemInitializer.createWall();
            w3.setPosition(new Vector(-w, size[1] / 2));
            w3.setSize(w * 2, size[1] + w);
            itemListService.add(w3);

            let w4 = itemInitializer.createWall();
            w4.setPosition(new Vector(size[0] + w, size[1] / 2));
            w4.setSize(w * 2, size[1] + w);
            itemListService.add(w4);
        }

        protected isValidCommand(command: CommandInitWorld): boolean {
            return this.isSystemCommand(command);
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandInitWorld;
        }
    }
}