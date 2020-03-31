// Budget Controller
var budgetController = (function(){



    return {
        //add method. this inner function will always has access to variables and parameters of it's outer function, even if the outer function has already returned. This all works because of closures. var x and var add are in the closure, therefore they will not return in the console.

    }
    // in the console: budgetController.publicTest(5)-> 28

})();





// UI Controller
var UIController = (function(){

})();
//() at the end means it's immediatley executed





//Global App Controller
var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = function() {
        //1. Get the field input data

        //2. Add the item to the budget controller


        //3. Add the new items to the UI

        //4. Calculate the budget

        //5. Display the budget on the UI
        console.log('It works.');
    }

    //we will pass other 2 modules as arguments to the controller in order to connect the above controllers
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    //Set up key press event (in addition to a button click)
    document.addEventListener('keypress', function(event) {
        // console.log(event);
        //use 'which' for old browser compatibility
        if(event.keycode === 13 || event.which == 13) {
            // console.log('Enter was pressed');
            //call ctrlAddItem function
            ctrlAddItem();
        }
    })

})(budgetController, UIController);

