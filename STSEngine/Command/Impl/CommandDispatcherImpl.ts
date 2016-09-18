module STSEngine {
    "use strict";

    export class CommandDispatcherImpl implements ICommandDispatcher {

        protected commandHandlerList: ICommandHandler[];

        constructor() {
            this.initCommandHandlerList();
        }

        protected initCommandHandlerList() {
            this.commandHandlerList = [];
            this.commandHandlerList[CommandType.CreateObject] = new CommandCreateObjectImpl();
            this.commandHandlerList[CommandType.RegisterPlayer] = new CommandRegisterPlayerImpl ();
            this.commandHandlerList[CommandType.StartMoveUp] = new CommandStartMoveObjectImpl();
            this.commandHandlerList[CommandType.StartMoveDown] = new CommandStartMoveObjectImpl();
            this.commandHandlerList[CommandType.StartMoveLeft] = new CommandStartMoveObjectImpl();
            this.commandHandlerList[CommandType.StartMoveRight] = new CommandStartMoveObjectImpl();
            this.commandHandlerList[CommandType.StopMoveUp] = new CommandStopMoveObjectImpl();
            this.commandHandlerList[CommandType.StopMoveDown] = new CommandStopMoveObjectImpl();
            this.commandHandlerList[CommandType.StopMoveLeft] = new CommandStopMoveObjectImpl();
            this.commandHandlerList[CommandType.StopMoveRight] = new CommandStopMoveObjectImpl();
        }

        public execute(world: IWorld, command: ICommand): void {
            var handler = this.commandHandlerList[command.getCommandType()];
            if (handler.isValid(world, command)) {
                handler.execute(world, command);
            }
            
        }

    }

}