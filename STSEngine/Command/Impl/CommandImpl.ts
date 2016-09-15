module STSEngine {
    "use strict";

    export class CommandImpl implements ICommand {
        private paramList: IKeyValuePair[];
        private commandType: CommandType;

        constructor(commandType: CommandType, paramList: IKeyValuePair[]) {
            this.paramList = paramList;
            this.commandType = commandType;
        }

        public getParamList(): IKeyValuePair[] {
            return this.paramList;
        }

        getCommandType(): CommandType {
            return this.commandType;
        }
    }

}