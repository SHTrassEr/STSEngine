namespace STSEngine {

    export class Command implements ICommand {
        protected attributeList: IAttributeList;

        constructor(attributeList: IAttributeList) {
            this.attributeList = attributeList;
        }

        public getCommandType(): number {
            return this.attributeList.get(AttributeType.CommandType);
        }

        public getPlayerId(): number {
            return this.attributeList.get(AttributeType.PlayerId);
        }

        public getAttributeList(): IAttributeList {
            return this.attributeList;
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