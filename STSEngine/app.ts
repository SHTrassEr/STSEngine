
var settings: Map<string, number | string> = new Map<string, number | string>();

var worldSettings: STSEngine.IWorldSettings = new STSEngine.WorldSettingsImpl(settings);

settings.set("moveStepSize", 10);

var objectStateListService: STSEngine.IObjectListService = new STSEngine.ObjectListServiceImpl();

var world: STSEngine.IWorld = new STSEngine.WorldImpl(worldSettings, objectStateListService);


// 7, add, blow
