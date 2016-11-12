namespace STSEngine.Example {

    export interface IObjectRectangle extends IObject {
        getPosition(): [number, number];
        setPosition(position: [number, number]);

        getSize(): [number, number];
        setSize(size: [number, number]);

        getMaxSpeed(): number;
        setMaxSpeed(speed: number): void;

        getMoveDirection(): MoveDirection;
        setMoveDirection(direction: MoveDirection): void;
    }
}