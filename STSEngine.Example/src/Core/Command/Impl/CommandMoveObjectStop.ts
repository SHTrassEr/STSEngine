namespace STSEngine.Example {

    export class CommandMoveObjectStop extends Command {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setCommandType(CommandType.MoveStop);
        }

        public getObjectId(): number {
            return this.attributeList.get(CommandAttributeType.ObjectId);
        }

        public setObjectId(id: number): void {
            this.attributeList.set(CommandAttributeType.ObjectId, id);
        }

        public getMoveDirection(): MoveDirection {
            return this.attributeList.get(CommandAttributeType.MoveDirection);
        }

        public setMoveDirection(direction: MoveDirection): void {
            this.attributeList.set(CommandAttributeType.MoveDirection, direction);
        }
    }
}