namespace STSEngine {

    export interface IPointService {
        copy(point: IPoint): IPoint;
        add(p1: IPoint, p2: IPoint): IPoint;
        substract(p1: IPoint, p2: IPoint): IPoint;
    }
}