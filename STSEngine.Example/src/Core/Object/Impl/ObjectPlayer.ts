namespace STSEngine.Example {

    export class ObjectPlayer extends STSEngine.ObjectImpl {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setObjectType(ObjectType.Player);
        }

        public getPosition(): IPoint {
            return this.attributeList.get(ObjectAttributeType.Position);
        }

        public setPosition(position: IPoint): void {
            this.attributeList.set(ObjectAttributeType.Position, position);
        }

        public getPlayerId(): number {
            return this.attributeList.get(ObjectAttributeType.PlayerId);
        }

        public setPlayerId(playerId: number): void {
            this.attributeList.set(ObjectAttributeType.PlayerId, playerId);
        }
    }
}