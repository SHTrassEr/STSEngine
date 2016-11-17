/// <reference path="Item.ts" />

namespace STSEngine.Example {

    export class ItemBullet extends Item  {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemBullet.Type);
        }

        protected createBody(): Matter.Body {
            let body = Matter.Bodies.rectangle(200, 200, 10, 10, { density: 0.001, friction: 0.1, frictionAir: 0.1, frictionStatic: 0.5, inertia: Infinity });
            return body;
        }

        public getSize(): [number, number] {
            return [10, 10];
        }

         
    }

    export module ItemBullet {
        export const Type = ++Item.LastTypeId;
    }
}