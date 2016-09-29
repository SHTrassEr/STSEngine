/// <reference path="../../Util/RandomGenerator.ts" />

QUnit.module("Core." + STSEngine.AttributeList.name);


QUnit.test("all", function (assert) {
    let attributeList = new STSEngine.AttributeList();
    let keyStrList = getRandomStringArray();
    var valueStrList = getRandomStringArray();
    var valueIntList = getRandomIntArray();

    for (let i = 0; i < keyStrList.length; i++) {
        attributeList.set(keyStrList[i], valueStrList[i]);
    }
    for (let i = 0; i < keyStrList.length; i++) {
        assert.strictEqual(attributeList.has(keyStrList[i]), true);
        assert.strictEqual(attributeList.get(keyStrList[i]), valueStrList[i]);
    }
    for (let i = 0; i < keyStrList.length; i++) {
        attributeList.set(keyStrList[i], valueIntList[i]);
    }
    for (let i = 0; i < keyStrList.length; i++) {
        assert.strictEqual(attributeList.has(keyStrList[i]), true);
        assert.strictEqual(attributeList.get(keyStrList[i]), valueIntList[i]);
    }

    for (let key of keyStrList) {
        attributeList.delete(key);
        assert.strictEqual(attributeList.has(key), false);
    }
});