namespace STSEngine.Example {

    export class CommandDispatcher extends STSEngine.CommandDispatcher {

        constructor(world: IWorld) {
            super();
            this.initCommandHandlerList(world);
        }

        protected initCommandHandlerList(world: IWorld) {
            this.commandHandlerList[CommandRegisterClient.Type] = new CommandRegisterClientHandler(world);
            this.commandHandlerList[CommandCreateClientItemTank.Type] = new CommandCreateClientItemTankHandler(world);
            this.commandHandlerList[CommandFire.Type] = new CommandFireHandler(world);
            this.commandHandlerList[CommandChangeClientName.Type] = new CommandChangeClientNameHandler(world);
            this.commandHandlerList[CommandApplyForce.Type] = new CommandApplyForceHandler(world);
            this.commandHandlerList[CommandInitWorld.Type] = new CommandInitWorldHandler(world);
        }

    }

}