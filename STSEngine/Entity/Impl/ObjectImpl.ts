namespace STSEngine {
    "use strict";

    export class ObjectImpl implements IObject {

        protected attributeList: IAttributeList;

        constructor(attributeList: IKeyValuePair[]) {
            this.attributeList = new AttributeListImpl();
            this.setAttributeList(attributeList);
        }


        public getAttributeList(): IAttributeList {
            return this.attributeList;
        }

        public getId(): number {
            return this.attributeList.getAttribute(AttributeType.Id);
        }

        public getObjectType(): ObjectType {
            return this.attributeList.getAttribute(AttributeType.ObjectType);
        }

        public setObjectType(objectType: ObjectType): void {
            this.attributeList.setAttribute(AttributeType.ObjectType, objectType);
        }


        public getMoveDirection(): number {
            return this.attributeList.getAttribute(AttributeType.MoveDirection);
        }

        public setMoveDirection(moveDirection: number): void {
            this.attributeList.setAttribute(AttributeType.MoveDirection, moveDirection);
        }

        public getPosition(): IPoint {
            return this.attributeList.getAttribute(AttributeType.Position);
        }

        public setPosition(position: IPoint): void {
            this.attributeList.setAttribute(AttributeType.Position, position);
        }

        public getPlayerId(): number {
            return this.attributeList.getAttribute(AttributeType.PlayerId);
        }

        public setPlayerId(playerId: number): void {
            this.attributeList.setAttribute(AttributeType.PlayerId, playerId);
        }


        //IAttributeList

        public getAttribute(attribute: string, defaultValue?: any): any {
            return this.attributeList.getAttribute(attribute, defaultValue);
        }

        public setAttribute(attribute: string, value: any): void {
            this.attributeList.setAttribute(attribute, value);
        }


        public setAttributeList(attributeList: Map<string, any> | IKeyValuePair[]): void {
            this.attributeList.setAttributeList(attributeList);
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

        public getKeyValuePairList(): IKeyValuePair[] {
            return this.attributeList.getKeyValuePairList();
        }
    }
}