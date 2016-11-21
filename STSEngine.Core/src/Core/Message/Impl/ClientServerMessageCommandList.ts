/// <reference path="ClientServerMessage.ts" />

namespace STSEngine.Core {

    export class ClientServerMessageCommandList extends ClientServerMessage {

        private _commandList: number = ++this.lastAttributeId;

        public setCommandList(commandList: [number, any][][]): void {
            this.attributeList.set(this._commandList, commandList);
        }

        public getCommandList(): [number, any][][] {
            return this.attributeList.get(this._commandList);
        }
    }

    export module ClientServerMessageCommandList {
        export const type = ModuleInfo.name + '.' + ClientServerMessageCommandList.name;
    }
}