namespace STSEngine.Example {

    export class CollisionService implements ICollisionService {
        protected objectListService: IObjectListService<IObject>;
        protected worldAttributeList: IWorldAttributeList;

        constructor(worldAttributeList: IWorldAttributeList, objectListService: IObjectListService<IObject>) {
            this.worldAttributeList = worldAttributeList;
            this.objectListService = objectListService;
        }

        public processCollision(moveObject: IObject, newPosition: [number, number]): void {
            if (moveObject instanceof ObjectPlayer) {
                this.processCollisionObjectPlayer(moveObject, newPosition);
            } else if (moveObject instanceof ObjectBullet) {
                this.processCollisionObjectBullet(moveObject, newPosition);
            }
        }

        protected processCollisionObjectPlayer(moveObject: ObjectPlayer, newPosition: [number, number]) {
            this.processCollisionObjectRectangleWorld(moveObject, newPosition);

            let objectList = this.objectListService.getIterator();
            for (var o of objectList) {
                if (moveObject.getId() != o.getId()) {
                    if (o instanceof ObjectPlayer) {
                        this.processCollisionObjectPlayerObjectPlayer(moveObject, newPosition, o);
                    }

                }
            }

            moveObject.setPositionPrecise(newPosition);
        }

        protected processCollisionObjectBullet(moveObject: ObjectBullet, newPosition: [number, number]) {
            if (this.processCollisionObjectRectangleWorld(moveObject, newPosition)) {
                this.objectListService.remove(moveObject.getId());
            }

            let objectList = this.objectListService.getIterator();
            for (var o of objectList) {
                if (moveObject.getId() != o.getId()) {
                    if (o instanceof ObjectPlayer) {
                        this.processCollisionObjectBulletObjectPlayer(moveObject, newPosition, o);
                    } 

                }
            }

            moveObject.setPositionPrecise(newPosition);
        }

        protected processCollisionObjectPlayerObjectPlayer(moveObject: ObjectPlayer, newPosition: [number, number], o: ObjectPlayer): boolean {

            let position = moveObject.getPositionPrecise();
            let oPosition = o.getPositionPrecise();
            let moveObjectSize = moveObject.getSize();
            let oSize = o.getSize();

            if (!this.isRectangleObjectCollision(position, moveObjectSize, oPosition, oSize)) {
                if (this.isRectangleObjectCollision(newPosition, moveObjectSize, oPosition, oSize)) {
                    if (position[0] < newPosition[0]) {
                        newPosition[0] = oPosition[0] - moveObjectSize[0];
                        return true;
                    } else if (position[0] > newPosition[0]) {
                        newPosition[0] = oPosition[0] + oSize[0];
                        return true;
                    } else if (position[1] < newPosition[1]) {
                        newPosition[1] = oPosition[1] - moveObjectSize[1];
                        return true;
                    } else if (position[1] > newPosition[1]) {
                        newPosition[1] = oPosition[1] + oSize[1];
                        return true;
                    }
                }

            }

            return false;
        }

        protected processCollisionObjectBulletObjectPlayer(moveObject: ObjectBullet, newPosition: [number, number], o: ObjectPlayer): boolean {

            let position = moveObject.getPositionPrecise();
            let oPosition = o.getPositionPrecise();
            let moveObjectSize = moveObject.getSize();
            let oSize = o.getSize();

            if (!this.isRectangleObjectCollision(position, moveObjectSize, oPosition, oSize)) {
                if (this.isRectangleObjectCollision(newPosition, moveObjectSize, oPosition, oSize)) {
                    this.objectListService.remove(moveObject.getId());
                    return true;
                }

            }

            return false;
        }


        protected processCollisionObjectRectangleWorld(moveObject: IObjectRectangle, newPosition: [number, number]): boolean {
            if (newPosition[0] < 0) {
                newPosition[0] = 0;
                return true;
            }
            if (newPosition[1] < 0) {
                newPosition[1] = 0;
                return true;
            }

            if (newPosition[0] > this.worldAttributeList.getWorldSize()[0] - moveObject.getSize()[0]) {
                newPosition[0] = this.worldAttributeList.getWorldSize()[0] - moveObject.getSize()[0];
                return true;
            }
            if (newPosition[1] > this.worldAttributeList.getWorldSize()[1] - moveObject.getSize()[1]) {
                newPosition[1] = this.worldAttributeList.getWorldSize()[1] - moveObject.getSize()[1];
                return true;
            }

            return false;
        }


/*        public processCollisionAny(o1: IObject, objectList: Iterable<IObject>): boolean {
            for (var o of objectList) {
                if (o1.getId() != o.getId()) {
                    if (this.isCollision(o1, o)) {
                        return true;
                    }
                }
            }

            return false;
        }*/

        protected isRectangleObjectCollision(pos1: [number, number], size1: [number, number], pos2: [number, number], size2: [number, number]): boolean {
            if ((pos2[0] + size2[0] <= pos1[0]) ||
                (pos2[1] + size2[1] <= pos1[1]) ||
                (pos2[0] >= pos1[0] + size1[0]) ||
                (pos2[1] >= pos1[1] + size1[1])) {
                return false;
            }

            return true;
        }


    }
}