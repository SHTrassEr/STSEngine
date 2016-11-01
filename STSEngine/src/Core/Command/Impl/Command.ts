namespace STSEngine {

    export class Command implements ICommand {
        protected attributeList: IAttributeList;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            if (attributeList) {
                this.attributeList = attributeList;
            } else {
                this.attributeList = new AttributeList();
            }

            if (kvpList) {
                this.attributeList.setList(kvpList);
            }
        }

        public getCommandType(): number {
            return this.attributeList.get(CommandAttributeType.Type);
        }

        public setCommandType(commandType: number): void {
            this.attributeList.set(CommandAttributeType.Type, commandType);
        }

        public getInitiatorId(): number {
            return this.attributeList.get(CommandAttributeType.InitiatorId);
        }

        public setInitiatorId(id: number): void {
            this.attributeList.set(CommandAttributeType.InitiatorId, id);
        }

        public getList(): [number, any][] {
            return this.attributeList.getList();
        }

        [Symbol.iterator]
        public getIterator(): IterableIterator<[number, any]> {
            return this.attributeList.getIterator();
        }

        public getAttributeList(): IAttributeList {
            return this.attributeList;
        }
    }
}