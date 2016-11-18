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
                case ItemWall.Type:
                    return this.createWall(attr);
            }
        }

        public createTank(attr?: Iterable<[number, any]>): ItemTank {
            var item = new ItemTank(this.createAttributeList(), attr);
            this.initId(item);
            return item;
        }

        public createBullet(attr?: Iterable<[number, any]>): ItemBullet {
            var item = new ItemBullet(this.createAttributeList(), attr);
            this.initId(item);
            return item;
        }

        public createWall(attr?: Iterable<[number, any]>): ItemWall {
            var item = new ItemWall(this.createAttributeList(), attr);
            this.initId(item);
            return item;
        }

    }
}

