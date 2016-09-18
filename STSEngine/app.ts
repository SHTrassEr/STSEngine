function ready() {
    var settings: Map<string, number | string> = new Map<string, number | string>();
    var worldSettings: STSEngine.IWorldSettings = new STSEngine.WorldSettingsImpl(settings);
    settings.set("moveStepSize", 10);

    var objectListService = new STSEngine.ObjectListServiceImpl();
    var processListService = new STSEngine.ProcessListServiceImpl();
    var commandListService = new STSEngine.CommandListServiceImpl();

    var world: STSEngine.IWorld = new STSEngine.WorldImpl(worldSettings, objectListService, processListService);
    var engine: STSEngine.IEngine = new STSEngine.EngineImpl(world, commandListService);


    var registerPlayerAttributeList: STSEngine.IKeyValuePair[] = [];
    registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.NewPlayerId, 1));

    var moveDownCommandAttributeList = new Map<string, any>();
    moveDownCommandAttributeList.set(STSEngine.AttributeType.ObjectId, 1);

    var stopMoveDownCommandAttributeList = new Map<string, any>();
    stopMoveDownCommandAttributeList.set(STSEngine.AttributeType.ObjectId, 1);


    var moveRightCommandAttributeList = new Map<string, any>();
    moveRightCommandAttributeList.set(STSEngine.AttributeType.ObjectId, 1);

    var stopMoveRightCommandAttributeList = new Map<string, any>();
    stopMoveRightCommandAttributeList.set(STSEngine.AttributeType.ObjectId, 1);


    engine.step();
    commandListService.createCommand(STSEngine.CommandType.RegisterPlayer, 0, registerPlayerAttributeList);
    commandListService.createCommand(STSEngine.CommandType.StartMoveDown, 1, moveDownCommandAttributeList);
    engine.step();
    engine.step();

    commandListService.createCommand(STSEngine.CommandType.StartMoveRight, 1, moveRightCommandAttributeList);
    engine.step();
    engine.step();

    commandListService.createCommand(STSEngine.CommandType.StopMoveDown, 1, moveDownCommandAttributeList);
    engine.step();

    engine.step();
    engine.step();
    engine.step();
    engine.step();
    engine.step();

    commandListService.createCommand(STSEngine.CommandType.StopMoveRight, 1, moveDownCommandAttributeList);
    engine.step();

    var o = objectListService.getObject(1);
    alert("x: " + o.getPosition().getX() + " y:" + o.getPosition().getY());

};


document.addEventListener("DOMContentLoaded", ready);