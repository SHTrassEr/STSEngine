namespace STSEngine.Example {

    export class ExampleWorldServiceList extends WorldServiceList {
        constructor(worldAttributeList: IWorldAttributeList) {
            let commandInitializer = new CommandInitializer();
            let objectInitializer = new ObjectInitializer();
            let processInitializer = new ProcessInitializer();
            let commandDispatcher = new CommandDispatcher(processInitializer);
            let processDispatcher = new ProcessDispatcher(processInitializer, objectInitializer);
            super(worldAttributeList, commandInitializer, objectInitializer, processInitializer, processDispatcher, commandDispatcher);
        }
        
    }
}