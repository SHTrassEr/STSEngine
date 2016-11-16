namespace STSEngine.Example {

    export class CommandDispatcher extends STSEngine.CommandDispatcher {

        constructor(worldServiceList: IWorldServiceList) {
            super();
            this.initCommandHandlerList(worldServiceList);
        }

        protected initCommandHandlerList(worldServiceList: IWorldServiceList) {
            this.commandHandlerList[CommandRegisterPlayer.Type] = new CommandRegisterPlayerHandler(worldServiceList);
            this.commandHandlerList[CommandCreatePlayerObject.Type] = new CommandCreatePlayerObjectHandler(worldServiceList);
            this.commandHandlerList[CommandMoveObjectStart.Type] = new CommandMoveObjectStartHandler(worldServiceList);
            this.commandHandlerList[CommandMoveObjectStop.Type] = new CommandMoveObjectStopHandler(worldServiceList);
            this.commandHandlerList[CommandFire.Type] = new CommandFireHandler(worldServiceList);
        }

    }

}