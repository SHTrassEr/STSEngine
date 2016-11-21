namespace STSEngine.Core {

    export interface ICommand extends IEntity {

        getInitiatorId(): number;
        setInitiatorId(id: number): void 
    }
}