function ready() {
    var settings: Map<string, number | string> = new Map<string, number | string>();
    var worldSettings: STSEngine.IWorldSettings = new STSEngine.WorldSettingsImpl(settings);
    settings.set("moveStepSize", 10);

    var objectListService = new STSEngine.ObjectListServiceImpl();
    var processListService = new STSEngine.ProcessListServiceImpl();
    var commandListService = new STSEngine.CommandListServiceImpl();

    var world: STSEngine.IWorld = new STSEngine.WorldImpl(worldSettings, objectListService, processListService);
    var engine: STSEngine.IEngine = new STSEngine.EngineImpl(world, commandListService);

    var playerAction = new STSEngine.PlayerActionImpl(1, commandListService);




    engine.step();

    var registerPlayerAttributeList: STSEngine.IKeyValuePair[] = [];
    registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.NewPlayerId, 1));
    commandListService.createCommand(STSEngine.CommandType.RegisterPlayer, 0, registerPlayerAttributeList);

    playerAction.startMoveDown(1);
    engine.step();
    engine.step();

    playerAction.startMoveRight(1);
    engine.step();
    engine.step();

    playerAction.stopMoveDown(1);
    engine.step();

    engine.step();
    engine.step();
    engine.step();
    engine.step();
    engine.step();

    playerAction.stopMoveRight(1);
    engine.step();

    var o = objectListService.getObject(1);
    alert("x: " + o.getPosition().getX() + " y:" + o.getPosition().getY());

};


document.addEventListener("DOMContentLoaded", ready);