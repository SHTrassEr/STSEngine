/// <reference path="../../Util/RandomGenerator.ts" />

QUnit.module("Core." + STSEngine.ObjectImpl.name);

QUnit.test("all", function (assert) {
    let attributeList = new STSEngine.AttributeList();
    let o = new STSEngine.ObjectImpl(attributeList);

    let id = getRandomInt();
    let objectType = getRandomInt();

    o.setId(id);
    o.setObjectType(objectType);
    assert.strictEqual(o.getId(), id);
    assert.strictEqual(o.getObjectType(), objectType);

    let iterator = o.getIterator();
    assert.strictEqual(iterator.next().done, false);
    assert.strictEqual(iterator.next().done, false);
    assert.strictEqual(iterator.next().done, true);

});