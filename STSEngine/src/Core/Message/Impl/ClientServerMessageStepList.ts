namespace STSEngine {

    export class ClientServerMessageStepList extends ClientServerMessage {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageType.StepList);
        }

        public setStepList(stepList: IEntity[]): void {
            let stepAttributeList: [number, any][][] = []
            if (stepList) {
                for (let step of stepList) {
                    stepAttributeList.push(step.getList());
                }
            }

            this.attributeList.set(ClientServerMessageAttributeType.StepList, stepAttributeList);
        }

        public getStepList(): [number, any][][] {
            return this.attributeList.get(ClientServerMessageAttributeType.StepList);
        }

    }
}