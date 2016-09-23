namespace STSEngine {

    export class CommandImpl implements ICommand {
        protected attributeList: IAttributeList;

        constructor(attributeList: IKeyValuePair[]) {
            this.attributeList = new AttributeListImpl();

            if (attributeList) {
                this.setAttributeList(attributeList);
            }
        }

        public getCommandType(): CommandType {
            return this.attributeList.getAttribute(AttributeType.CommandType);
        }

        public getPlayerId(): number {
            return this.attributeList.getAttribute(AttributeType.PlayerId);
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