namespace STSEngine {

    export class ClientServerMessageStep extends ClientServerMessage {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageType.Step);
        }

        public setCommandList(commandList: ICommand[]): void {
            let commandAttributeList: [number, any][][] = []
            if (commandList) {
                for (let command of commandList) {
                    commandAttributeList.push(command.getList());
                }
            }

            this.attributeList.set(ClientServerMessageAttributeType.CommandList, commandAttributeList);
        }

        public getCommandList(): [number, any][][] {
            return this.attributeList.get(ClientServerMessageAttributeType.CommandList);
        }

        public getStepNumber(): number {
            return this.attributeList.get(ClientServerMessageAttributeType.StepNumber);
        }

        public setStepNumber(stepNumber: number): void {
            this.attributeList.set(ClientServerMessageAttributeType.StepNumber, stepNumber);
        }
    }
}