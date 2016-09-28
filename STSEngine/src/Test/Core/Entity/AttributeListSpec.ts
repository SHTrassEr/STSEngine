

describe("Core" + STSEngine.AttributeList.name, () => {
    it("set/get", () => {
        var attributeList = new STSEngine.AttributeList();
        attributeList.setAttribute("testKey", "testValue");
        expect(attributeList.getAttribute("testKey")).toEqual("testValue");
    });
});

