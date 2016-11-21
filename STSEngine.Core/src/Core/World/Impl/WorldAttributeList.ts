/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine.Core {

    export class WorldAttributeList extends Entity implements IWorldAttributeList {

        private _tickLength: number = ++this.lastAttributeId;
        private _processId: number = ++this.lastAttributeId;
        private _lastObjectId: number = ++this.lastAttributeId;
        private _stepNumber: number = ++this.lastAttributeId;

        public getTickLength(): number {
            return this.attributeList.get(this._tickLength, 20);
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

        public getLastItemId(): number {
            return this.attributeList.get(this._lastObjectId, 0);
        }

        public setLastItemId(id: number) {
            this.attributeList.set(this._lastObjectId, id);
        }

        public getStepNumber(): number {
            return this.attributeList.get(this._stepNumber, 0);
        }

        public setStepNumber(stepNumber: number): void {
            this.attributeList.set(this._stepNumber, stepNumber);
        }
    }

    export module WorldAttributeList {
        export let LastTypeId = 0;
        export const Type = ++LastTypeId;
    }
}