// Budget Controller
var budgetController = (function() {

	//creating custom data types for expense and income. Doing it this way because there may be alot of expenses and income
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	
	var data = {
		allItems: {
			exp: [],
			inc: []
		},

		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function(type, des, val) {
			var newItem, ID;

			//[1 2 4 6 8], next ID = 9
			//ID = last ID + 1

			// create new ID
			if (data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			//create new item based on 'inc' or 'exp' type
			if (type === 'exp'){
				//add a new expense
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc'){
				newItem = new Income(ID, des, val);
			}

			//this 'type' comes from above function(type, des, val). Push it into our data structure
			data.allItems[type].push(newItem);

			//Return the new element
			return newItem;
		},

		testing: function() {
			console.log(data);
		}
		//console -> budgetController.testing()
	};


})();


// UI Controller
var UIController = (function() {

	//create an object to store strings. Used to keep strings in one location should you decids to change the class names down the road. Cleaner option
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer : '.income__list',
		expensesContainer : '.expenses__list'
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

		addListItem: function(obj, type) {
			var html, newHtml, element;

			// Create HTML string with some placeholder text
			if(type === 'inc'){
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;

				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// Replace Placeholder text with some actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

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
		var input, newItem;
		//1. Get the field input data
		input = UIController.getinput();
		console.log(input);

		//2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		//3. Add the new items to the UI
		UICtrl.addListItem(newItem, input.type);

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