namespace STSEngine.Example {

    export abstract class Item extends STSEngine.Item implements IItem {

    }

    export module Item {
        let lastTypeId = STSEngine.Item.LastTypeId;
    }
}