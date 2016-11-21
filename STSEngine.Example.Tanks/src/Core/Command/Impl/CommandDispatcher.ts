namespace STSEngine.Example.Tanks {

    export class CommandDispatcher extends Core.CommandDispatcher {

        constructor(world: IWorld) {
            super();
            this.initCommandHandlerList(world);
        }

        protected initCommandHandlerList(world: IWorld) {
            this.commandHandlerList.set(CommandRegisterClient.type, new CommandRegisterClientHandler(world));
            this.commandHandlerList.set(CommandCreateClientItemTank.type, new CommandCreateClientItemTankHandler(world));
            this.commandHandlerList.set(CommandFire.type, new CommandFireHandler(world));
            this.commandHandlerList.set(CommandChangeClientName.type, new CommandChangeClientNameHandler(world));
            this.commandHandlerList.set(CommandApplyForce.type, new CommandApplyForceHandler(world));
            this.commandHandlerList.set(CommandInitWorld.type, new CommandInitWorldHandler(world));
        }

    }

}