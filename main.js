//Kanban board
/*
var table = {
name: 'project',
element: <jQuery element> // for example $('div')
};

var column = {
id: '12j82da20k',
name: 'todo',
element: <jQuery element> // for example $('div')
};

var card = {
id: '2kd8s958ka',
description: 'Create Kanban app',
color: 'green',
element: <jQuery element>
};
*/

$(document).ready(function() {
	// here we will put the code of our application
    function randomString() {
    	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    	var str = '';
    	for (var i = 0; i < 10; i++) {
    	str += chars[Math.floor(Math.random() * chars.length)];
    	}
    return str;
	}
	//create class Column
	function Column(name) {
    	var self = this; // useful for nested functions

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
    	// here is the code for creating the column, which you will find below
    	// creating components of columns
    	var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

		// adding events
		$columnDelete.click(function() {
        	self.removeColumn();
		});
		
		//add a note after clicking on the button:
    	$columnAddCard.click(function() {
        	self.addCard(new Card(prompt("Enter the name of the card")));
		});

		//construction column elements
		$column.append($columnTitle)
        		.append($columnDelete)
        		.append($columnAddCard)
        		.append($columnCardList);
        //return of created column
		return $column;
		}
	}
	
	Column.prototype = {
    	addCard: function(card) {
    	this.$element.children('ul').append(card.$element);
    	},
    	removeColumn: function() {
    	this.$element.remove();
    	}
	};

	function Card(description) {
		var self = this;

    	this.id = randomString();
    	this.description = description;
    	this.$element = createCard();

    	function createCard() {
    	// Implementation of card creation

    	//creating the blocks
    	var $card = $('<li>').addClass('card');
    	var $cardDescription = $('<p>').addClass('card-description').text(self.description);
    	var $cardDelete = $('<button>').addClass('btn-delete').text('x');

    	// binding to click event	
    	$cardDelete.click(function(){
        	self.removeCard();
		});
    	
    	// combing blocks and returning the card
		$card.append($cardDelete)
			.append($cardDescription);
		return $card;
		}
    }
    Card.prototype = {
		removeCard: function() {
		this.$element.remove();
		}
	}
	var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
	};

	function initSortable() {
		$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
		})
		.disableSelection();
 	}

	function initSortable() {
		$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
		})
    	.disableSelection();
	}

	$('.create-column')
		.click(function(){
			var name = prompt('Enter a column name');
			var column = new Column(name);
    		board.addColumn(column);
  		});

	// creating columns
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// adding columns to the board
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// creating cards
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// adding cards to columns
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
})