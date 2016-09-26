(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'stsEngine/server'], factory);
    }
})(function (require, exports) {
    "use strict";
    const server_1 = require('stsEngine/server');
    //var c = new STSEngine.AttributeListImpl();
    var WebSocketServer = require('ws').Server;
    var server = new WebSocketServer({ port: 62785 });
    var webSocketGameServer = new server_1.default.WebSocketGameServer(server);
    webSocketGameServer.start();
});
/*

var registerPlayerAttributeList: STSEngine.IKeyValuePair[] = [];
registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.CommandType, STSEngine.CommandType.RegisterPlayer));
registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.PlayerId, 0))
registerPlayerAttributeList.push(new STSEngine.KeyValuePairImpl(STSEngine.AttributeType.NewPlayerId, 1))
commandListService.createCommand(registerPlayerAttributeList);

*/ 
