
function TestClass(){
};

module.exports  = new TestClass();

TestClass.prototype.testMethod = function(arg1){
    console.log("called TestClass#TestMethod arg1:"+arg1)
};
