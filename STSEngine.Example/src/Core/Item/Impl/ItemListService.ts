
namespace STSEngine.Example {

    export class ItemListService extends EntityListService<IItem> implements IItemListService {

        protected matterEngine: Matter.Engine

        constructor(matterEngine: Matter.Engine) {
            super();

            this.matterEngine = matterEngine;
        }


        public add(object: IItem): void {
            super.add(object);

            Matter.World.add(this.matterEngine.world, object.getBody());
        }
        
    }
}

