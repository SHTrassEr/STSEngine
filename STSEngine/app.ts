function ready() {

    var settings: Map<string, number | string> = new Map<string, number | string>();

    var worldSettings: STSEngine.IWorldSettings = new STSEngine.WorldSettingsImpl(settings);

    settings.set("moveStepSize", 10);

    var objectListService: STSEngine.IObjectListService = new STSEngine.ObjectListServiceImpl();
    var processListService: STSEngine.IProcessListService = new STSEngine.ProcessListServiceImpl();

    var world: STSEngine.IWorld = new STSEngine.WorldImpl(worldSettings, objectListService, processListService);

    var objectAttributeList = new Map<string, any>();
    objectAttributeList.set(STSEngine.ObjectAttributeType.Position, new STSEngine.PointImpl(0, 0));

    var processAttributeList = new Map<string, any>();
    processAttributeList.set(STSEngine.ProcessAttributeType.ObjectAttributeList, objectAttributeList);

    var creaetObjectProcess = new STSEngine.CreateObjectProcessImpl(processListService.getNewProcessId(), world, processAttributeList);
    processListService.addProcess(creaetObjectProcess);

    var moveDownProcess = new STSEngine.MoveDownObjectProcessImpl(processListService.getNewProcessId(), world, 1);
    processListService.addProcess(moveDownProcess);


    world.step();
    world.step();
    world.step();
    world.step();

    var o = objectListService.getObject(1);

};


document.addEventListener("DOMContentLoaded", ready);