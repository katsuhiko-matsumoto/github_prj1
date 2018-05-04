
function TestClass2(){
};

module.exports  = new TestClass2();

TestClass2.prototype.test2Method = function(arg1){
    console.log("called TestClass2#Test2Method arg1:"+arg1)
};
