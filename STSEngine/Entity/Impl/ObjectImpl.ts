module STSEngine {
    "use strict";

    export class ObjectImpl implements IObject {

        protected attributeList: IAttributeList;

        constructor(id: number) {
            this.attributeList = new AttributeListImpl();
            this.attributeList.setAttribute(ObjectAttributeType.Id, id);
        }


        public getAttributeList(): IAttributeList {
            return this.attributeList;
        }

        setAttributeList(attributeList: IAttributeList): void {
            this.attributeList = attributeList;
        }

        public getId(): number {
            return this.attributeList.getAttribute(ObjectAttributeType.Id);
        }

        public getObjectType(): ObjectType {
            return this.attributeList.getAttribute(ObjectAttributeType.ObjectType);
        }

        public setObjectType(objectType: ObjectType): void {
            this.attributeList.setAttribute(ObjectAttributeType.ObjectType, objectType);
        }


        public getMoveDirection(): number {
            return this.attributeList.getAttribute(ObjectAttributeType.MoveDirection);
        }

        public setMoveDirection(moveDirection: number): void {
            this.attributeList.setAttribute(ObjectAttributeType.MoveDirection, moveDirection);
        }

        public getPosition(): IPoint {
            return this.attributeList.getAttribute(ObjectAttributeType.Position);
        }

        public setPosition(position: IPoint): void {
            this.attributeList.setAttribute(ObjectAttributeType.Position, position);
        }


        //IAttributeList

        public getAttribute(attribute: string, defaultValue?: any): any {
            return this.attributeList.getAttribute(attribute, defaultValue);
        }

        public setAttribute(attribute: string, value: any): void {
            this.attributeList.setAttribute(attribute, value);
        }

        public hasAttribute(attribute: string): boolean {
            return this.attributeList.hasAttribute(attribute);
        }

        public rollback(): void {
            this.attributeList.rollback();
        }

        public commit(): void {
            this.attributeList.commit();
        }

        public isDirty(): boolean {
            return this.attributeList.isDirty();
        }

        public removeAttribute(attribute: string): void {
            this.attributeList.removeAttribute(attribute);
        }
    }
}