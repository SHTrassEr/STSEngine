namespace STSEngine {

    export class World implements IWorld {

        protected worldServiceList: IWorldServiceList;
        protected stepNumber: number;
        protected attributeList: IWorldAttributeList;

        constructor(worldSettings: IWorldServiceList) {
            this.attributeList = worldSettings.getWorldAttributeList();
            this.worldServiceList = worldSettings;
            this.setStepNumber(0);
        }

        public getServiceList(): IWorldServiceList {
            return this.worldServiceList;
        }

        public getAttributeList(): IWorldAttributeList {
            return this.attributeList;
        }

        public getStepNumber(): number {
            return this.stepNumber;
        }

        public setStepNumber(stepNumber: number): void {
            this.stepNumber = stepNumber;
        }

        public increaseStepNumber(): void {
            let stepNumber: number = this.getStepNumber() + 1;
            this.setStepNumber(stepNumber);
        }

        public getCommandInitializer<T extends IItemInitializer<ICommand>>(): T {
            return <T>(this.getServiceList().getCommandInitializer());
        }

        public getProcessInitializer<T extends IItemInitializer<IProcess>>(): T {
            return <T>(this.getServiceList().getProcessInitializer());
        }

        public getObjectInitializer<T extends IItemInitializer<IObject>>(): T {
            return <T>(this.getServiceList().getObjectInitializer());
        }
    }
}