namespace STSEngine {

    export class World implements IWorld {

        protected worldServiceList: IWorldServiceList;
        protected attributeList: IWorldAttributeList;

        constructor(worldSettings: IWorldServiceList) {
            this.attributeList = worldSettings.getWorldAttributeList();
            this.worldServiceList = worldSettings;
            this.attributeList.setStepNumber(0);
        }

        public getServiceList(): IWorldServiceList {
            return this.worldServiceList;
        }

        public getAttributeList(): IWorldAttributeList {
            return this.attributeList;
        }
    }
}