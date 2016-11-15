namespace STSEngine.Example {

    export class CommandDispatcher extends STSEngine.CommandDispatcher {

        constructor(worldServiceList: IWorldServiceList) {
            super();
            this.initCommandHandlerList(worldServiceList);
        }

        protected initCommandHandlerList(worldServiceList: IWorldServiceList) {
            this.commandHandlerList[STSEngine.CommandType.RegisterPlayer] = new CommandRegisterPlayerHandler(worldServiceList);
            this.commandHandlerList[CommandType.CreatePlayerObject] = new CommandCreatePlayerObjectHandler(worldServiceList);
            this.commandHandlerList[CommandType.MoveStart] = new CommandMoveObjectStartHandler(worldServiceList);
            this.commandHandlerList[CommandType.MoveStop] = new CommandMoveObjectStopHandler(worldServiceList);
            this.commandHandlerList[CommandType.Fire] = new CommandFireHandler(worldServiceList);
        }

    }

}