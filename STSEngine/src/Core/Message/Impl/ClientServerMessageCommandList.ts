/// <reference path="ClientServerMessage.ts" />

namespace STSEngine {

    export class ClientServerMessageCommandList extends ClientServerMessage {

        private _commandList: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageCommandList.Type);
        }

        public setCommandList(commandList: [number, any][][]): void {
            this.attributeList.set(this._commandList, commandList);
        }

        public getCommandList(): [number, any][][] {
            return this.attributeList.get(this._commandList);
        }
    }

    export module ClientServerMessageCommandList {
        export const Type = ++ClientServerMessage.LastTypeId;
    }
}