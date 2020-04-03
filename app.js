// Budget Controller
var budgetController = (function() {



	// return {
	// 	//add method. this inner function will always has access to variables and parameters of it's outer function, even if the outer function has already returned. This all works because of closures. var x and var add are in the closure, therefore they will not return in the console.

	// };
	// in the console: budgetController.publicTest(5)-> 28

})();




// UI Controller
var UIController = (function() {

	//create an object to store strings. Used to keep strings in one location should you decids to change the class names down the road. Cleaner option
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	};

	return {
		//need to get values from the type (+ / -), description and value fields
		getinput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			};
		},

		getDOMstrings: function() {
			return DOMstrings;
		}
	};

})();
//() at the end means it's immediatley executed





//Global App Controller
var controller = (function(budgetCtrl, UICtrl) {
	//place all event listeners in here
	var setupEventListeners = function(){
		var DOM = UICtrl.getDOMstrings();

		//we will pass other 2 modules as arguments to the controller in order to connect the above controllers
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		//Set up key press event (in addition to a button click)
		document.addEventListener('keypress', function(event) {
			// console.log(event);
			//use 'which' for old browser compatibility
			if (event.keycode === 13 || event.which == 13) {
				// console.log('Enter was pressed');
				//call ctrlAddItem function
				ctrlAddItem();
			}
		});
	};


	var ctrlAddItem = function() {
		//1. Get the field input data
		var input = UIController.getinput();
		console.log(input);

		//2. Add the item to the budget controller


		//3. Add the new items to the UI

		//4. Calculate the budget

		//5. Display the budget on the UI
		// console.log('It works.');
	};

	return {
		init: function() {
			console.log('Application has started');
			setupEventListeners();
		}
	}

})(budgetController, UIController);

controller.init();