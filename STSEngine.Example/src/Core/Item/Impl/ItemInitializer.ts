namespace STSEngine.Example {

    export class ItemInitializer extends STSEngine.ItemInitializer implements IItemInitializer {

        constructor(createIdHandler: () => number) {
            super(createIdHandler);
        }

        protected createByType(type: number, attr?: Iterable<[number, any]>): IItem {
            let item = super.createByType(type, attr);
            if (item) {
                return item;
            }

            switch (type) {
                case ItemPlayer.Type:
                    return this.createPlayer(attr);
                case ItemBullet.Type:
                    return this.createBullet(attr);
            }
        }

        public createPlayer(attr?: Iterable<[number, any]>): ItemPlayer {
            var object = new ItemPlayer(this.createAttributeList(), attr);
            this.initId(object);
            return object;
        }

        public createBullet(attr?: Iterable<[number, any]>): ItemBullet {
            var object = new ItemBullet(this.createAttributeList(), attr);
            this.initId(object);
            return object;
        }

    }
}

