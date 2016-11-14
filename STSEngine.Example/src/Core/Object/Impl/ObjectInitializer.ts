namespace STSEngine.Example {

    export class ObjectInitializer extends ItemInitializer<IObject> {

        constructor() {
            super(STSEngine.ObjectAttributeType.Type);
        }

        protected createByType(type: number, attr?: Iterable<[number, any]>): IObject {
            switch (type) {
                case ObjectType.Player:
                    return this.createPlayer(attr);
            }
        }

        public createPlayer(attr?: Iterable<[number, any]>): ObjectPlayer {
            var object = new ObjectPlayer(this.createAttributeList(), attr);
            this.setObjectId(object);
            return object;
        }

        public createBullet(attr?: Iterable<[number, any]>): ObjectBullet {
            var object = new ObjectBullet(this.createAttributeList(), attr);
            this.setObjectId(object);
            return object;
        }

        protected setObjectId(object: IObject) {
            object.setId(this.getId());
        }

        protected createAttributeList(): IAttributeList {
            return new AttributeList();
        }
    }
}

