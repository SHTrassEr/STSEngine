namespace STSEngine.Example {

    export class CommandDispatcher extends STSEngine.CommandDispatcher {

        constructor(worldServiceList: IWorldServiceList) {
            super();
            this.initCommandHandlerList(worldServiceList);
        }

        protected initCommandHandlerList(worldServiceList: IWorldServiceList) {
            this.commandHandlerList[CommandRegisterClient.Type] = new CommandRegisterClientHandler(worldServiceList);
            this.commandHandlerList[CommandCreateClientItemTank.Type] = new CommandCreateClientItemTankHandler(worldServiceList);
            this.commandHandlerList[CommandMoveObjectStart.Type] = new CommandMoveObjectStartHandler(worldServiceList);
            this.commandHandlerList[CommandMoveObjectStop.Type] = new CommandMoveObjectStopHandler(worldServiceList);
            this.commandHandlerList[CommandFire.Type] = new CommandFireHandler(worldServiceList);
            this.commandHandlerList[CommandChangeClientName.Type] = new CommandChangeClientNameHandler(worldServiceList);
        }

    }

}