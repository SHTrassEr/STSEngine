/// <reference path="Item.ts" />

namespace STSEngine.Example {

    export class ItemTank extends Item implements IItemTank, IItemRectangle  {

        private _clientForceVector: number = ++this.lastAttributeId;
        private _clientForceModifier: number = ++this.lastAttributeId;

        constructor(attributeList: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemTank.Type);
        }

        protected createBody(): Matter.Body {
            let body = Matter.Bodies.rectangle(200, 200, this.getWidth(), this.getHeight(), { density: 0.001, friction: 0.1, frictionAir: 0.1, frictionStatic: 0.5, inertia: Infinity, label: "ItemTank" });
            return body;
        }

        public getWidth(): number {
            return 30;
        }

        public setSize(width: number, height: number): void {
            let newRectangle = Matter.Bodies.rectangle(this.body.position.x, this.body.position.y, width, height);
            Matter.Body.setVertices(this.body, newRectangle.vertices);
        }

        public getHeight(): number {
            return 30;
        }
    }

    export module ItemTank {
        export const Type = ++Item.LastTypeId;
    }
}