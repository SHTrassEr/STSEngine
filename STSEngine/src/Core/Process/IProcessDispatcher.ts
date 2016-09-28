namespace STSEngine {

    export interface IProcessDispatcher {
        init(world: IWorld, process: IProcess): void;
        execute(world: IWorld, process: IProcess): void;
        finish(world: IWorld, process: IProcess): void;
    }

}