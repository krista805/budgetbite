//create IIFE that will return an object. Use IIFE so no other code can overwrite our data. For the outside, we do not have access to the inner scope (eg. "x" or "add")
var budgetController = (function(){

    var x = 23;
    // in the colsone: budgetController.x -> undefined

    var add = function(a) {
        return x + a;
    }


    return {
        //add method. this inner function will always has access to variables and parameters of it's outer function, even if the outer function has already returned. This all works because of closures. var x and var add are in the closure, therefore they will not return in the console.
        publicTest: function(b) {
            return add(b);
        }
    }
    // in the console: budgetController.publicTest(5)-> 28

})();


var UIController = (function(){

})();
//() at the end means it's immediatley executed



var controller = (function(budgetCtrl, UICtrl){
    //we will pass other 2 modules as arguments to the controller in order to connect the above controllers

    var z = budgetCtrl.publicTest(5);

    return {
        //adding another function is the only way we can access the "z" variable which is stored in the closure
        anotherPublic: function() {
            console.log(z);
        }

        //console : controller.anotherPublic() -> 28
    }

})(budgetController, UIController);