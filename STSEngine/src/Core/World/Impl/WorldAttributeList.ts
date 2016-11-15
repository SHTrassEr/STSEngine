/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export class WorldAttributeList extends Entity implements IWorldAttributeList {

        private _tickLength: number = ++this.lastAttributeId;
        private _processId: number = ++this.lastAttributeId;
        private _lastObjectId: number = ++this.lastAttributeId;
        private _stepNumber: number = ++this.lastAttributeId;

        public getTickLength(): number {
            return this.attributeList.get(this._tickLength, 50);
        }

        public setTickLength(tickLength: number): void {
            this.attributeList.set(this._tickLength, tickLength);
        }

        public getLastProcessId(): number {
            return this.attributeList.get(this._processId, 0);
        }

        public setLastProcessId(id: number) {
            this.attributeList.set(this._processId, id);
        }

        public getLastObjectId(): number {
            return this.attributeList.get(this._lastObjectId, 0);
        }

        public setLastObjectId(id: number) {
            this.attributeList.set(this._lastObjectId, id);
        }

        public getStepNumber(): number {
            return this.attributeList.get(this._stepNumber, 0);
        }

        public setStepNumber(stepNumber: number): void {
            this.attributeList.set(this._stepNumber, stepNumber);
        }
    }
}