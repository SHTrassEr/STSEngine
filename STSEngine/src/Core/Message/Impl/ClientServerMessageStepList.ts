/// <reference path="ClientServerMessage.ts" />

namespace STSEngine {

    export class ClientServerMessageStepList extends ClientServerMessage {

        private _stepList: number = ++this.lastAttributeId;

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

    export module ClientServerMessageStepList {
        export const type = ModuleInfo.name + '.' + ClientServerMessageStepList.name;
    }
}