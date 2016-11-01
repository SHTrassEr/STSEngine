namespace STSEngine.Example {

    export class ProcessMoveObject extends STSEngine.ProcessImpl {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setProcessType(ProcessType.Move);
        }

        public getObjectId(): number {
            return this.attributeList.get(ProcessAttributeType.ObjectId);
        }

        public setObjectId(id: number): void {
            this.attributeList.set(ProcessAttributeType.ObjectId, id);
        }       

        public getMoveDirection(): MoveDirection {
            return this.attributeList.get(CommandAttributeType.MoveDirection);
        }

        public setMoveDirection(direction: MoveDirection): void {
            this.attributeList.set(CommandAttributeType.MoveDirection, direction);
        }
    }
}