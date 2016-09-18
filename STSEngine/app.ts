function ready() {
    var settings: Map<string, number | string> = new Map<string, number | string>();
    var worldSettings: STSEngine.IWorldSettings = new STSEngine.WorldSettingsImpl(settings);
    settings.set("moveStepSize", 10);

    var objectListService: STSEngine.IObjectListService = new STSEngine.ObjectListServiceImpl();
    var processListService: STSEngine.IProcessListService = new STSEngine.ProcessListServiceImpl();

    var world: STSEngine.IWorld = new STSEngine.WorldImpl(worldSettings, objectListService, processListService);
    var engine: STSEngine.IEngine = new STSEngine.EngineImpl(world);


    var objectAttributeList = new Map<string, any>();
    objectAttributeList.set(STSEngine.AttributeType.Position, new STSEngine.PointImpl(0, 0));
    var createObjectCommandAttributeList = new Map<string, any>();
    createObjectCommandAttributeList.set(STSEngine.AttributeType.ObjectAttributeList, objectAttributeList);
    var createObjectCommand = new STSEngine.CommandImpl(STSEngine.CommandType.CreateObject, createObjectCommandAttributeList);


    var moveDownCommandAttributeList = new Map<string, any>();
    moveDownCommandAttributeList.set(STSEngine.AttributeType.ObjectId, 1);
    var startMoveDownCommand = new STSEngine.CommandImpl(STSEngine.CommandType.StartMoveDown, moveDownCommandAttributeList);

    var stopMoveDownCommandAttributeList = new Map<string, any>();
    stopMoveDownCommandAttributeList.set(STSEngine.AttributeType.ObjectId, 1);
    var stopMoveDownCommand = new STSEngine.CommandImpl(STSEngine.CommandType.StopMoveDown, moveDownCommandAttributeList);


    var moveRightCommandAttributeList = new Map<string, any>();
    moveRightCommandAttributeList.set(STSEngine.AttributeType.ObjectId, 1);
    var startMoveRightCommand = new STSEngine.CommandImpl(STSEngine.CommandType.StartMoveRight, moveRightCommandAttributeList);

    var stopMoveRightCommandAttributeList = new Map<string, any>();
    stopMoveRightCommandAttributeList.set(STSEngine.AttributeType.ObjectId, 1);
    var stopMoveRightCommand = new STSEngine.CommandImpl(STSEngine.CommandType.StopMoveRight, moveDownCommandAttributeList);


    engine.step();
    engine.step([createObjectCommand, startMoveDownCommand]);
    engine.step();
    engine.step([startMoveRightCommand]);
    engine.step();

    engine.step([stopMoveDownCommand]);

    engine.step();
    engine.step();
    engine.step();
    engine.step();
    engine.step([stopMoveRightCommand]);

    var o = objectListService.getObject(1);
    alert("x: " + o.getPosition().getX() + " y:" + o.getPosition().getY());

};


document.addEventListener("DOMContentLoaded", ready);