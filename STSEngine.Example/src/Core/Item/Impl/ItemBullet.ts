/// <reference path="Item.ts" />

namespace STSEngine.Example {

    export class ItemBullet extends Item implements IItemRectangle  {

        constructor(attributeList: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemBullet.Type);
        }

        protected createBody(): Matter.Body {
            let body = Matter.Bodies.rectangle(200, 200, this.getWidth(), this.getHeight(), { density: 0.001, friction: 0.1, frictionAir: 0.1, frictionStatic: 0.5, inertia: Infinity, label: "ItemBullet" });
            return body;
        }

        public setSize(width: number, height: number): void {
            let newRectangle = Matter.Bodies.rectangle(this.body.position.x, this.body.position.y, width, height);
            Matter.Body.setVertices(this.body, newRectangle.vertices);
        }

        public getWidth(): number {
            return 8;
        }

        public getHeight(): number {
            return 8;
        }
 
    }

    export module ItemBullet {
        export const Type = ++Item.LastTypeId;
    }
}