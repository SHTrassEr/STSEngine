namespace STSEngine.Example {

    export class ItemInitializer extends STSEngine.ItemInitializer implements IItemInitializer {

        protected createByType(type: number, attr?: Iterable<[number, any]>): STSEngine.IItem {
            let item = super.createByType(type, attr);
            if (item) {
                return item;
            }

            switch (type) {
                case ItemTank.Type:
                    return this.createTank(attr);
                case ItemBullet.Type:
                    return this.createBullet(attr);
            }
        }

        public createTank(attr?: Iterable<[number, any]>): ItemTank {
            var object = new ItemTank(this.createAttributeList(), attr);
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

