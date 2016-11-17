/// <reference path="Item.ts" />

namespace STSEngine.Example {

    export class ItemTank extends Item implements IItemTank  {

        private _clientForceVector: number = ++this.lastAttributeId;
        private _clientForceModifier: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemTank.Type);
        }

        protected createBody(): Matter.Body {
            let body = Matter.Bodies.rectangle(200, 200, 50, 50, { density: 0.001, friction: 0.1, frictionAir: 0.1, frictionStatic: 0.5, inertia: Infinity });
            //Matter.Body.setMass(body, 1000);
            //Matter.Body.setInertia(body, 1000000);

            return body;
        }

        public getSize(): [number, number] {
            return [50, 50];
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