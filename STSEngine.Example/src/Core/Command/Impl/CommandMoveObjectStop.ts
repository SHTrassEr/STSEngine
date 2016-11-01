namespace STSEngine.Example {

    export class CommandMoveObjectStop extends Command {

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