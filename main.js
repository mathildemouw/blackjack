function Game ( opts ) {
	this.computer = opts.computer;
	this.user = opts.user;
	this.deck = [];
	this.winner = false;

	this.createDeck = function () {
		var suits = [ "S", "H", "D", "C" ];
		var values = [ "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A" ];
		for ( var i=0; i<suits.length; i++ ) {
			for ( var q=0; q<values.length; q++ ) {
				this.deck.push( suits[ i ] + values[ q ] )
			};
		};
	};
}
Game.prototype = {
	deal: function () {
		this.createDeck();
		this.hitPlayer( this.user );
		this.hitPlayer( this.computer );
		this.hitPlayer( this.user );
		this.hitPlayer( this.computer );
		this.takeTurn();
	},
	takeTurn: function() {
			this.checkScore();
		if (this.winner){
			return alert( "See you next time!" );
		}else if (this.winner === false){
			this.ask();
			this.takeTurn();
		};
	},
	ask: function () {
		var response = prompt( "Would you like to stay or hit?" );
		if ( response[ 0 ].toLowerCase() === "h" ){
			this.hitPlayer( this.user );
			this.user.last_response = "h"
		}else{
			this.user.last_response = "s"
		};
		if ( this.computer.score < 17 ){
			this.hitPlayer( this.computer );
			this.computer.last_response = "h"
		}else{
			this.computer.last_response = "s"
		}; 
	},
	hitPlayer: function ( player ) {
		var newCardIndex = ( Math.floor( Math.random()*(this.deck.length) ) );
		var newCard = this.deck.splice( newCardIndex, 1 )[ 0 ];
		player.hand.push( newCard );
	},
	checkScore: function () {
		this.user.score = this.calcScore( this.user );
		this.computer.score = this.calcScore( this.computer );
		if ( ( this.computer.score === 21 ) || ( this.user.score > 21 ) ){
			this.winner = this.computer;
			this.showResult( "YOU LOSE.") 
			this.showScores();
		}else if ( ( this.user.score === 21 ) || ( this.computer.score > 21 ) ){
			this.winner = this.user;
			this.showResult( "YOU WIN!")
			 this.showScores() ;
		}else if( (( this.user.last_response === "s" ) && ( this.computer.last_response === "s" )) ){
			this.evaluateStay( this.user, this.computer );
		}else{
			this.showScores();
		}
	},
	calcScore: function ( player ) {
		var score = 0;
		var faces = /[TJQKA]/
		for ( var i=0; i<player.hand.length; i++ ) {
			if ( player.hand[ i ].match( faces ) ){
				var face = player.hand[ i ][ 1 ]
				var faceValue = this.getFaceCardValue( player.score, face )
				score += faceValue
			}else{
				score += parseInt(player.hand[ i ][ 1 ])
			}
		};
		return score
	},
	getFaceCardValue: function ( score, face ) {
		var faces = /[TJQK]/
		if ( face.match( faces ) ){
			return 10
		}else{
			if ( ( score + 11 ) > 21){
				return 1
			}else{
				return 11
			}
		}
	},
	evaluateStay: function ( user, computer ) {
		if ( user.score === computer.score ){
			this.winner = "push";
			this.showResult( "Push! No one wins.");
			this.showScores();
		}else if( user.score > computer.score ){
			this.winner = this.user;
			this.showResult( "YOU WIN!!!" );
			 this.showScores();
		}else{
			this.winner = this.computer;
			this.showResult( "YOU LOSE.")
			 this.showScores();
		}
	},
	showResult: function ( result ) {
		document.getElementById( 'result' ).innerHTML = result;
	},
	showScores: function () {
		document.getElementById( 'current-score' ).innerHTML = ("Your hand:<br>" + this.user.hand 
			+ "<br>Your score:<br>" + this.user.score 
			+ "<br>Computer's latest card:<br>" + this.computer.hand[this.computer.hand.length-1] 
			+ "<br>Computer's score:<br>" + this.computer.score );
	},
}
function Player () {
	this.hand = [];
	this.score = 0;
	this.last_response = "";
}
//////////game///////////
theMachine = new Player;
you = new Player;
blackJack = new Game({computer: theMachine, user: you});
blackJack.deal();