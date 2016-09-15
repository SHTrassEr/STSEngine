module STSEngine {
    "use strict";

    export interface ICommand {
        getCommandType(): CommandType;
        getParamList(): IKeyValuePair[];
    }

}