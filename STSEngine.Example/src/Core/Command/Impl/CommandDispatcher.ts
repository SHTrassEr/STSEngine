namespace STSEngine.Example {

    export class CommandDispatcher extends STSEngine.CommandDispatcher {

        constructor(processInitializer: ProcessInitializer) {
            super();
            this.initCommandHandlerList(processInitializer);
        }

        protected initCommandHandlerList(processInitializer: ProcessInitializer) {
            this.commandHandlerList[STSEngine.CommandType.RegisterPlayer] = new CommandRegisterPlayerHandler(processInitializer);
            this.commandHandlerList[CommandType.CreatePlayerObject] = new CommandCreatePlayerObjectHandler(processInitializer);
            this.commandHandlerList[CommandType.MoveStart] = new CommandMoveObjectStartHandler(processInitializer);
            this.commandHandlerList[CommandType.MoveStop] = new CommandMoveObjectStopHandler(processInitializer);
            this.commandHandlerList[CommandType.Fire] = new CommandFireHandler(processInitializer);
        }

    }

}