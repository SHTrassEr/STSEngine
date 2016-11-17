namespace STSEngine.Example {

    export class World extends STSEngine.World implements IWorld {

        protected worldServiceList: IWorldServiceList;
        protected attributeList: IWorldAttributeList;

        public getServiceList(): IWorldServiceList {
            return this.worldServiceList;
        }

        public getAttributeList(): IWorldAttributeList {
            return this.attributeList;
        }
    }
}