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

        public processCollision(moveItem: IItem): void {
            if (moveItem instanceof ItemTank) {
                this.processCollisionTank(moveItem);
            } else if (moveItem instanceof ItemBullet) {
                this.processCollisionObjectBullet(moveItem);
            }
        }

        protected processCollisionTank(moveItem: ItemTank) {
            this.processCollisionObjectRectangleWorld(moveItem);

            /*let objectList = this.itemListService.getIterator();
            for (var o of objectList) {
                if (moveItem.getId() != o.getId()) {
                    if (o instanceof ItemTank) {
                        this.processCollisionTankTank(moveItem, newPosition, o);
                    }

                }
            }*/
        }

        protected processCollisionObjectBullet(moveItem: ItemBullet) {
            if (this.processCollisionObjectRectangleWorld(moveItem)) {
                this.itemListService.remove(moveItem.getId());
            }

            /*let objectList = this.itemListService.getIterator();
            for (var o of objectList) {
                if (moveItem.getId() != o.getId()) {
                    if (o instanceof ItemTank) {
                        this.processCollisionBulletTank(moveItem, newPosition, o);
                    } 

                }
            }*/
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


        protected processCollisionObjectRectangleWorld(moveItem: IItem): boolean {

            let position = moveItem.getPosition();
            let moveVector = moveItem.getMoveVector();

            let res = false;

            if (position[0] + moveVector[0] < 0) {
                moveVector[0] = - position[0];
                res = true;
            }
            if (position[1] + moveVector[1] < 0) {
                moveVector[1] = - position[1];
                res = true;
            }


            return res;
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