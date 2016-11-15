/// <reference path="../../Util/RandomGenerator.ts" />

QUnit.module("Core." + STSEngine.Entity.name);

QUnit.test("all", function (assert) {
    let attributeList = new STSEngine.AttributeListArray();
    let o = new STSEngine.Entity(attributeList);

    let id = getRandomInt(0, 40);
    let objectType = getRandomInt();

    o.setId(id);
    o.setType(objectType);
    assert.strictEqual(o.getId(), id);
    assert.strictEqual(o.getType(), objectType);

    let iterator = o.getIterator();
    assert.strictEqual(iterator.next().done, false);
    assert.strictEqual(iterator.next().done, false);
    assert.strictEqual(iterator.next().done, true);

});