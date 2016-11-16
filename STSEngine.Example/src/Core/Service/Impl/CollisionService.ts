namespace STSEngine.Example {

    export class CollisionService implements ICollisionService {
        protected itemListService: IItemListService;
        protected worldAttributeList: IWorldAttributeList;
        protected clientListService: IClientListService;

        constructor(worldAttributeList: IWorldAttributeList, itemListService: IItemListService, clientListService: IClientListService) {

            this.clientListService = clientListService;
            this.worldAttributeList = worldAttributeList;
            this.itemListService = itemListService;
        }

        public processCollision(moveItem: IItem, newPosition: [number, number]): void {
            if (moveItem instanceof ItemTank) {
                this.processCollisionTank(moveItem, newPosition);
            } else if (moveItem instanceof ItemBullet) {
                this.processCollisionObjectBullet(moveItem, newPosition);
            }
        }

        protected processCollisionTank(moveItem: ItemTank, newPosition: [number, number]) {
            this.processCollisionObjectRectangleWorld(moveItem, newPosition);

            let objectList = this.itemListService.getIterator();
            for (var o of objectList) {
                if (moveItem.getId() != o.getId()) {
                    if (o instanceof ItemTank) {
                        this.processCollisionTankTank(moveItem, newPosition, o);
                    }

                }
            }

            moveItem.setPosition(newPosition);
        }

        protected processCollisionObjectBullet(moveItem: ItemBullet, newPosition: [number, number]) {
            if (this.processCollisionObjectRectangleWorld(moveItem, newPosition)) {
                this.itemListService.remove(moveItem.getId());
            }

            let objectList = this.itemListService.getIterator();
            for (var o of objectList) {
                if (moveItem.getId() != o.getId()) {
                    if (o instanceof ItemTank) {
                        this.processCollisionBulletTank(moveItem, newPosition, o);
                    } 

                }
            }

            moveItem.setPosition(newPosition);
        }

        protected processCollisionTankTank(moveItem: ItemTank, newPosition: [number, number], o: ItemTank): boolean {

            let position = moveItem.getPosition();
            let oPosition = o.getPosition();
            let moveItemSize = moveItem.getSize();
            let oSize = o.getSize();

            if (!this.isRectangleObjectCollision(position, moveItemSize, oPosition, oSize)) {
                if (this.isRectangleObjectCollision(newPosition, moveItemSize, oPosition, oSize)) {
                    if (position[0] < newPosition[0]) {
                        newPosition[0] = oPosition[0] - moveItemSize[0];
                        return true;
                    } else if (position[0] > newPosition[0]) {
                        newPosition[0] = oPosition[0] + oSize[0];
                        return true;
                    } else if (position[1] < newPosition[1]) {
                        newPosition[1] = oPosition[1] - moveItemSize[1];
                        return true;
                    } else if (position[1] > newPosition[1]) {
                        newPosition[1] = oPosition[1] + oSize[1];
                        return true;
                    }
                }

            }

            return false;
        }

        protected processCollisionBulletTank(moveItem: ItemBullet, newPosition: [number, number], o: ItemTank): boolean {

            let position = moveItem.getPosition();
            let oPosition = o.getPosition();
            let moveItemSize = moveItem.getSize();
            let oSize = o.getSize();

            if (!this.isRectangleObjectCollision(position, moveItemSize, oPosition, oSize)) {
                if (this.isRectangleObjectCollision(newPosition, moveItemSize, oPosition, oSize)) {
                    this.itemListService.remove(moveItem.getId());

                    let clientId = moveItem.getClientId();
                    let client = this.clientListService.getTyped<IClientActive>(clientId, ClientActive);

                    client.setScore(client.getScore() + 10);

                    return true;
                }

            }

            return false;
        }


        protected processCollisionObjectRectangleWorld(moveItem: IItem, newPosition: [number, number]): boolean {
            if (newPosition[0] < 0) {
                newPosition[0] = 0;
                return true;
            }
            if (newPosition[1] < 0) {
                newPosition[1] = 0;
                return true;
            }

            if (newPosition[0] > this.worldAttributeList.getWorldSize()[0] - moveItem.getSize()[0]) {
                newPosition[0] = this.worldAttributeList.getWorldSize()[0] - moveItem.getSize()[0];
                return true;
            }
            if (newPosition[1] > this.worldAttributeList.getWorldSize()[1] - moveItem.getSize()[1]) {
                newPosition[1] = this.worldAttributeList.getWorldSize()[1] - moveItem.getSize()[1];
                return true;
            }

            return false;
        }


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