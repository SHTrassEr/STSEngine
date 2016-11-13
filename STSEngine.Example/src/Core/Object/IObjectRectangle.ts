namespace STSEngine.Example {

    export interface IObjectRectangle extends IObject {

        getPosition(): [number, number];
        getPosition(d: number): number;

        getPositionPrecise(): [number, number];
        getPositionPrecise(d: number): number;
        setPositionPrecise(position: [number, number]);


        getSize(): [number, number];
        getSize(d: number): number;
        setSize(size: [number, number]);

        getMaxSpeed(): number;
        setMaxSpeed(speed: number): void;

        getMoveDirection(): MoveDirection;
        setMoveDirection(direction: MoveDirection): void;
    }
}