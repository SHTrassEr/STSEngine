/// <reference path="Process.ts" />

namespace STSEngine.Example {

    export class ProcessCreateClientItemTank extends Process {

        private _clientId: number = ++this.lastAttributeId;
        private _position: number = ++this.lastAttributeId;

        public getClientId(): number {
            return this.attributeList.get(this._clientId);
        }

        public setClientId(id: number): void {
            this.attributeList.set(this._clientId, id);
        }

        public getPosition(): IVector {
            return VectorHelper.parse(this.attributeList.get(this._position));
        }

        public setPosition(position: IVector): void {
            this.attributeList.set(this._position, new Vector(position));
        }
    }

    export module ProcessCreateClientItemTank {
        export const type = ModuleInfo.name + '.' + ProcessCreateClientItemTank.name;
    }
}