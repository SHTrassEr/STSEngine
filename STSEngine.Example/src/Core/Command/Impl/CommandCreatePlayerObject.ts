namespace STSEngine.Example {

    export class CommandCreatePlayerObject extends STSEngine.Command {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            
            this.setCommandType(CommandType.CreatePlayerObject);
        }

        public getPlayerId(): number {
            return this.attributeList.get(CommandAttributeType.PlayerId);
        }

        public setPlayerId(id: number): void {
            this.attributeList.set(CommandAttributeType.PlayerId, id);
        }

    }
}