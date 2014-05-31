//Blackjack: The computer acts as a dealer. They hit on a 'soft 17' (a 17 with an Ace acting as an 11 in hand) but stay on 'hard 17'. 
// If either goes over 21, the game ends and the other player wins. If either player has blackjack, the game ends and that player wins (unless the other player also has blackjack, resulting in a tie). The hand that comes the closest to 21 without exceeding 21 wins the game. A draw results if both players have the same score.
// This can be done in the web or command line.

//as a user, I want to begin with a hand of zero
//i want the computer's hand to begin at zero
	//create a Hand class
	//initialize user and computer hand at the beginning of the game

//as a user, I want to choose hit or stay, and get a new card or not
	//both hands get a choice at the start of each turn (user input for user) 
	//if i choose hit, a card is added

//the computer should also get a new card or not
	//the computer's choice depends on the closeness to a hard or soft 17
	//if the computer chooses hit, a card is added to its hand

//as a user, I want to know whether the compuet or I wins or busts
	//each turn, the total value of the cards is calculated and shown
	//if either player is over 21, the other player wins

//refector ideas:
//DRY up some of the trees -- if the user needs more feedback, abstract into a GameView, or total MVC structure.
//what if it's a push? what if both players stay?
//see only compueter's face up card