/// <reference path="ClientServerMessage.ts" />

namespace STSEngine.Core {

    export class ClientServerMessageStep extends ClientServerMessage {

        private _commandList: number = ++this.lastAttributeId;
        private _stepNumber: number = ++this.lastAttributeId;

        public setCommandList(commandList: ICommand[]): void {
            let commandAttributeList: [number, any][][] = []
            if (commandList) {
                for (let command of commandList) {
                    commandAttributeList.push(command.getList());
                }
            }

            this.attributeList.set(this._commandList, commandAttributeList);
        }

        public getCommandList(): [number, any][][] {
            return this.attributeList.get(this._commandList);
        }

        public getStepNumber(): number {
            return this.attributeList.get(this._stepNumber);
        }

        public setStepNumber(stepNumber: number): void {
            this.attributeList.set(this._stepNumber, stepNumber);
        }
    }

    export module ClientServerMessageStep {
        export const type = ModuleInfo.name + '.' + ClientServerMessageStep.name;
    }
}