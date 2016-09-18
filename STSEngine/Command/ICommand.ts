module STSEngine {
    "use strict";

    export interface ICommand extends IAttributeList {
        getCommandType(): CommandType;
    }

}