namespace STSEngine.Example {

    export class CollisionService implements ICollisionService {
        protected objectListService: IObjectListService;
        protected worldAttributeList: IWorldAttributeList;

        constructor(worldAttributeList: IWorldAttributeList, objectListService: IObjectListService) {
            this.worldAttributeList = worldAttributeList;
            this.objectListService = objectListService;
        }


        /*public isCollision(o1: IObject, o2: IObject): boolean {
            if (o1 instanceof ObjectPlayer && o2 instanceof ObjectPlayer) {
                return this.isObjectPlayerCollision(o1, o2);
            }

            return false;
        }*/

        public processCollision(moveObject: IObject, newPosition: [number, number]): void {
            if (moveObject instanceof ObjectPlayer) {
                this.processCollisionObjectPlayer(moveObject, newPosition);
            } else if (moveObject instanceof ObjectBullet) {
                this.processCollisionObjectPlayer(moveObject, newPosition);
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

            moveObject.setPosition(newPosition);
        }

        protected processCollisionObjectBullet(moveObject: ObjectPlayer, newPosition: [number, number]) {
            this.processCollisionObjectRectangleWorld(moveObject, newPosition);
            moveObject.setPosition(newPosition);
        }

        protected processCollisionObjectPlayerObjectPlayer(moveObject: ObjectPlayer, newPosition: [number, number], o: ObjectPlayer) {

            let position = moveObject.getPosition();
            let oPosition = o.getPosition();
            let moveObjectSize = moveObject.getSize();
            let oSize = o.getSize();

            if (!this.isRectangleObjectCollision(position, moveObjectSize, oPosition, oSize)) {
                if (this.isRectangleObjectCollision(newPosition, moveObjectSize, oPosition, oSize)) {
                    if (position[0] < newPosition[0]) {
                        newPosition[0] = oPosition[0] - moveObjectSize[0];
                    } else if (position[0] > newPosition[0]) {
                        newPosition[0] = oPosition[0] + oSize[0];
                    } else if (position[1] < newPosition[1]) {
                        newPosition[1] = oPosition[1] - moveObjectSize[1];
                    } else if (position[1] > newPosition[1]) {
                        newPosition[1] = oPosition[1] + oSize[1];
                    }
                }

            }
        }


        protected processCollisionObjectRectangleWorld(moveObject: IObjectRectangle, newPosition: [number, number]): void {
            if (newPosition[0] < 0) {
                newPosition[0] = 0;
            }
            if (newPosition[1] < 0) {
                newPosition[1] = 0;
            }

            if (newPosition[0] > this.worldAttributeList.getWorldSize()[0] - moveObject.getSize()[0]) {
                newPosition[0] = this.worldAttributeList.getWorldSize()[0] - moveObject.getSize()[0];
            }
            if (newPosition[1] > this.worldAttributeList.getWorldSize()[1] - moveObject.getSize()[1]) {
                newPosition[1] = this.worldAttributeList.getWorldSize()[1] - moveObject.getSize()[1];
            }
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