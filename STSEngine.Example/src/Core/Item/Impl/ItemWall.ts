/// <reference path="Item.ts" />

namespace STSEngine.Example {

    export class ItemWall extends Item implements IItemRectangle  {

        protected createBody(): Matter.Body {
            let body = Matter.Bodies.rectangle(200, 200, this.getWidth(), this.getHeight(), { isStatic: true, label: "Wall" });

            return body;
        }

        public setSize(width: number, height: number): void {
            Matter.Body.scale(this.body, width, height);

        }

        public getWidth(): number {
            return 1;
        }

        public getHeight(): number {
            return 1;
        }
 
    }

    export module ItemWall {
        export const type = ModuleInfo.name + '.' + ItemWall.name;
    }
}