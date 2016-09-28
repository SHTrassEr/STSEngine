namespace STSEngine {

    export interface ICommand extends IAttributeList {
        getCommandType(): CommandType;
        getPlayerId(): number;
    }

}