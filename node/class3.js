
function TestClass3(){
};

module.exports  = new TestClass3();

TestClass3.prototype.test3Method = function(arg1){
    console.log("called TestClass3#Test3Method arg1:"+arg1)
};
