namespace STSEngine {

    export class CommandDispatcher implements ICommandDispatcher {

        protected commandHandlerList: ICommandHandler[];

        constructor() {
            this.initCommandHandlerList();
        }

        protected initCommandHandlerList() {
            this.commandHandlerList = [];
            this.commandHandlerList[CommandType.CreateObject] = new CommandCreateObject();
            this.commandHandlerList[CommandType.RegisterPlayer] = new CommandRegisterPlayer ();
            this.commandHandlerList[CommandType.StartMoveUp] = new CommandStartMoveObject();
            this.commandHandlerList[CommandType.StartMoveDown] = new CommandStartMoveObject();
            this.commandHandlerList[CommandType.StartMoveLeft] = new CommandStartMoveObject();
            this.commandHandlerList[CommandType.StartMoveRight] = new CommandStartMoveObject();
            this.commandHandlerList[CommandType.StopMoveUp] = new CommandStopMoveObject();
            this.commandHandlerList[CommandType.StopMoveDown] = new CommandStopMoveObject();
            this.commandHandlerList[CommandType.StopMoveLeft] = new CommandStopMoveObject();
            this.commandHandlerList[CommandType.StopMoveRight] = new CommandStopMoveObject();
        }

        public execute(world: IWorld, command: ICommand): void {
            let handler = this.commandHandlerList[command.getCommandType()];
            if (handler.isValid(world, command)) {
                handler.execute(world, command);
            }

        }

    }

}