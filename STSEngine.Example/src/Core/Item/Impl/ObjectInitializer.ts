namespace STSEngine.Example {

    export class ItemInitializer extends STSEngine.ItemInitializer implements IItemInitializer {

        constructor(createIdHandler: () => number) {
            super(createIdHandler);
        }

        protected createByType(type: number, attr?: Iterable<[number, any]>): IItem {
            switch (type) {
                case ItemType.Player:
                    return this.createPlayer(attr);
                case ItemType.Bullet:
                    return this.createBullet(attr);
            }
        }

        public createPlayer(attr?: Iterable<[number, any]>): ItemPlayer {
            var object = new ItemPlayer(this.createAttributeList(), attr);
            this.setItemId(object);
            return object;
        }

        public createBullet(attr?: Iterable<[number, any]>): ItemBullet {
            var object = new ItemBullet(this.createAttributeList(), attr);
            this.setItemId(object);
            return object;
        }

        protected setItemId(item: IItem) {
            item.setId(this.createId());
        }

        protected createAttributeList(): IAttributeList {
            return new AttributeListArray();
        }
    }
}

