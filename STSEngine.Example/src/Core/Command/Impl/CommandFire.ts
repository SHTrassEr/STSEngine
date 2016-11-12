namespace STSEngine.Example {

    export class CommandFire extends Command {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setCommandType(CommandType.Fire);
        }

        public getObjectId(): number {
            return this.attributeList.get(CommandAttributeType.ObjectId);
        }

        public setObjectId(id: number): void {
            this.attributeList.set(CommandAttributeType.ObjectId, id);
        }
    }
}