﻿namespace STSEngine {

    export class CommandDispatcher implements ICommandDispatcher {

        protected commandHandlerList: ICommandHandler[];

        constructor() {
            this.commandHandlerList = [];
        }

        public execute(world: IWorld, command: ICommand): void {
            let handler = this.commandHandlerList[command.getCommandType()];
            if (handler.isValid(world, command)) {
                handler.execute(world, command);
            }
        }
    }

}