namespace STSEngine {

    export class ClientServerMessageStepList extends ClientServerMessage {

        private _stepList: number = ++this.lastAttributeId;

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

            this.attributeList.set(this._stepList, stepAttributeList);
        }

        public getStepList(): [number, any][][] {
            return this.attributeList.get(this._stepList);
        }
    }

    export module ClientServerMessageType {
        export const StepList = ClientServerMessageType.getNewTypeId();
    }
}