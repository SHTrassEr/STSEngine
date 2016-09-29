namespace STSEngine {

    export class ObjectImpl implements IObject {

        protected attributeList: IAttributeList;

        constructor(attributeList: ICommitableAttributeList, kvpList?: IKeyValuePair[]) {
            this.attributeList = attributeList;

            if (kvpList) {
                this.attributeList.setList(kvpList);
            }
        }

        public getAttributeList(): IAttributeList {
            return this.attributeList;
        }

        public getId(): number {
            return this.attributeList.get(AttributeType.Id);
        }

        public getObjectType(): ObjectType {
            return this.attributeList.get(AttributeType.ObjectType);
        }

        public setObjectType(objectType: ObjectType): void {
            this.attributeList.set(AttributeType.ObjectType, objectType);
        }

        public getPosition(): IPoint {
            return this.attributeList.get(AttributeType.Position);
        }

        public setPosition(position: IPoint): void {
            this.attributeList.set(AttributeType.Position, position);
        }

        public getPlayerId(): number {
            return this.attributeList.get(AttributeType.PlayerId);
        }

        public setPlayerId(playerId: number): void {
            this.attributeList.set(AttributeType.PlayerId, playerId);
        }

        //IAttributeList

        public get(attribute: string, defaultValue?: any): any {
            return this.attributeList.get(attribute, defaultValue);
        }

        public set(attribute: string, value: any): void {
            this.attributeList.set(attribute, value);
        }

        public setList(attributeList: Map<string, any> | IKeyValuePair[]): void {
            this.attributeList.setList(attributeList);
        }

        public has(attribute: string): boolean {
            return this.attributeList.has(attribute);
        }

        public delete(attribute: string): void {
            this.attributeList.delete(attribute);
        }

        public getKeyValuePairList(): IKeyValuePair[] {
            return this.attributeList.getKeyValuePairList();
        }
    }
}