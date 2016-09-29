namespace STSEngine {

    export interface ICommand extends IAttributeList{
        getCommandType(): number;
        getPlayerId(): number;
    }

}