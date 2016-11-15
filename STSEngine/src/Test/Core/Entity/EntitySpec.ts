/// <reference path="../../Util/RandomGenerator.ts" />

QUnit.module("Core." + STSEngine.Entity.name);

QUnit.test("all", function (assert) {
    let attributeList = new STSEngine.AttributeList();
    let o = new STSEngine.Entity(attributeList);

    let id = getRandomInt();
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