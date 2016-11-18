namespace STSEngine.Example {

    export interface IItemRectangle extends IItem {

        getWidth(): number;
        getHeight(): number;
        setSize(width: number, height: number): void;
    }
}