namespace STSEngine {

    export interface ICommand extends IterableKeyValuePair {
        getCommandType(): number;
        setCommandType(commandType: number): void 

        getInitiatorId(): number;
        setInitiatorId(id: number): void 

        getAttributeList(): IAttributeList;
    }
}