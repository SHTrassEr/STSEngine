/// <reference path="Item.ts" />

namespace STSEngine.Example {

    export class ItemTank extends Item implements IItemTank  {

        private _clientForceVector: number = ++this.lastAttributeId;
        private _clientForceModifier: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemTank.Type);
        }

        public getClientForceModifier(): number {
            return this.attributeList.get(this._clientForceModifier);
        }

        public setClientForceModifier(speed: number): void {
            this.attributeList.set(this._clientForceModifier, speed);
        }

        public getClientForceVector(): [number, number];
        public getClientForceVector(d: number): number;
        public getClientForceVector(d?: number): [number, number] | number {
            if (d) {
                return this.attributeList.get(this._clientForceVector)[d];
            }

            return this.attributeList.get(this._clientForceVector);
        }

        public setClientForceVector(clientForceVector: [number, number]): void {

            var forceVector = this.getForceVector();
            if (!forceVector) {
                forceVector = [0, 0];
            }

            var oldClientForceVector = this.getClientForceVector();
            if (oldClientForceVector) {
                forceVector[0] -= oldClientForceVector[0]; 
                forceVector[1] -= oldClientForceVector[1];
            }

            forceVector[0] += clientForceVector[0];
            forceVector[1] += clientForceVector[1];

            this.setForceVector(forceVector);
            this.attributeList.set(this._clientForceVector, clientForceVector);
        }

    }

    export module ItemTank {
        export const Type = ++Item.LastTypeId;
    }
}