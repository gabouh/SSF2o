/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */

"use strict";

function Collision() {}

Collision.prototype.update = function(characterOne, characterTwo) {
	characterOne.blockedLeft = false;
	characterOne.blockedRight = false;
	characterTwo.blockedLeft = false;
	characterTwo.blockedRight = false;
	if(characterOne.positionX+characterOne.width > characterTwo.positionX && characterOne.positionX < characterTwo.positionX) {
		characterOne.blockedRight = true;
		characterTwo.blockedLeft = true;
	} else if(characterTwo.positionX+characterTwo.width > characterOne.positionX && characterTwo.positionX < characterOne.positionX) {
		characterOne.blockedLeft = true;
		characterTwo.blockedRight = true;
	}
};