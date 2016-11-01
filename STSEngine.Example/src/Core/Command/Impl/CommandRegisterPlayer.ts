namespace STSEngine.Example {

    export class CommandRegisterPlayer extends Command {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setCommandType(STSEngine.CommandType.RegisterPlayer);
        }


        public getPlayerId(): number {
            return this.attributeList.get(CommandAttributeType.PlayerId);
        }

        public setPlayerId(id: number): void {
            this.attributeList.set(CommandAttributeType.PlayerId, id);
        }

    }
}