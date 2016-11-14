namespace STSEngine {

    export class ClientServerMessageInit extends ClientServerMessage {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageType.Init);
        }

        public setPlayerId(playerId: number): void {
            this.attributeList.set(ClientServerMessageAttributeType.PlayerId, playerId);
        }

        public getPlayerId(): number {
            return this.attributeList.get(ClientServerMessageAttributeType.PlayerId);
        }
    }
}