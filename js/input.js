/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */

"use strict";

function Input(characterOne, characterTwo) {
    this.characterOne = characterOne;
    this.characterTwo = characterTwo;
	var _controller = new Controller(this);
	Object.defineProperties(this, {
		controller:{
            get:function () {
                return _controller;
            },
            set:function (controller) {
                _controller = controller;
            }
		}
    });
    this.eval();
};

Input.prototype.eval = function() {
    this.controller.init();
	//this.keyListener();
};
/*
Input.prototype.keyListener = function() {
    var self = this;
    this.KeyboardController({
		// LEFT
		37: function() {
				var character = self.characterOne;
				if(!character.isJumping && !character.isSquatting && !character.isHurt) {
					if(!character.isMoving) {
						character.spriteX = character.movement.walkLeft[0];
						character.spriteY = character.movement.walkLeft[1];
					}
					character.isMoving = true;
					character.moveDirection = "left";
					character.animation.moveLeft();
				}
			},
		// UP
		38: function() {
				var character = self.characterOne;
				if(!character.isJumping && !character.isSquatting && !character.isHurt) {
					character.isJumping = true;
					character.jumpDirection = character.moveDirection;
					if(character.direction == "right") {
						character.spriteX = character.movement.jumpRight[0];
						character.spriteY = character.movement.jumpRight[1];
					} else {
						character.spriteX = character.movement.jumpLeft[0];
						character.spriteY = character.movement.jumpLeft[1];
					}
				}
			},
		// RIGHT
		39: function() {
				var character = self.characterOne;
				if(!character.isJumping && !character.isSquatting && !character.isHurt) {
					if(!character.isMoving) {
						character.spriteX = character.movement.walkRight[0];
						character.spriteY = character.movement.walkRight[1];
					}
					character.isMoving = true;
					character.moveDirection = "right";
					character.animation.moveRight(); 
				}
			},
		// DOWN
		40: function() { 
				var character = self.characterOne;
				if(!character.isJumping && !character.isAttacking && !character.isMoving && !character.isHurt) {
					character.isSquatting = true;
					if(character.direction == "right") {
						character.spriteX = character.movement.squatRight[0];
						character.spriteY = character.movement.squatRight[1];
					} else {
						character.spriteX = character.movement.squatLeft[0];
						character.spriteY = character.movement.squatLeft[1];
					}
				}
			},
		// ENTER		
		13: function() {
				var character = self.characterOne;
				if(!character.isJumping && !character.isAttacking && !character.isMoving && !character.isHurt) {
					character.isAttacking = true;
					if(character.direction == "right") {
						character.spriteX = character.movement.hookPunchRight[0];
						character.spriteY = character.movement.hookPunchRight[1];
					} else {
						character.spriteX = character.movement.hookPunchLeft[0];
						character.spriteY = character.movement.hookPunchLeft[1];
					}
					character.characterWidth = 200;
				}
			}
	}, 120);
};

Input.prototype.KeyboardController = function(keys, repeat) {
    var timers= {};
	var character = this.characterOne;
    document.onkeydown = function(event) {
        var key= (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key]= null;
            keys[key]();
            if (repeat!==0)
                timers[key]= setInterval(keys[key], repeat);
        }
        return false;
    };
    document.onkeyup= function(event) {
        var key= (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key]!==null) {
                clearInterval(timers[key]);
				switch (key) {
					// LEFT
					case 37 :
						if(character.isMoving && !character.isJumping && !character.isAttacking) {
							character.spriteX = character.movement.waitLeft[0];
							character.spriteY = character.movement.waitLeft[1];
						}
						character.isMoving = false;
						character.moveDirection = "none";
						if(!character.isJumping) {
							character.animation.wait();
						}
                    break;
					// UP
					case 38 :
                    break;
					// RIGHT
					case 39 :
						if(character.isMoving && !character.isJumping && !character.isAttacking) {
							character.spriteX = character.movement.waitRight[0];
							character.spriteY = character.movement.waitRight[1];
						}
						character.isMoving = false;
						character.moveDirection = "none";
						if(!character.isJumping) {
							character.animation.wait();
						}
                    break;
					// DOWN
					case 40 :
						if(character.isSquatting && !character.isJumping && !character.isAttacking) {
							character.isSquatting = false;
							if(character.direction == "right") {
								character.spriteX = character.movement.waitRight[0];
								character.spriteY = character.movement.waitRight[1];
							} else {
								character.spriteX = character.movement.waitRight[0];
								character.spriteY = character.movement.waitRight[1];
							}
						}
                    break;
				}
			}
            delete timers[key];
        }
    };
    window.onblur= function() {
        for (key in timers)
            if (timers[key]!==null)
                clearInterval(timers[key]);
        timers= {};
    };
};
*/
Input.prototype.updateButton = function(value, gamepadId, id) {
	var character = (gamepadId == 0) ? this.characterOne : this.characterTwo;
	switch(id) {
		case 'button-dpad-top':
			if(value != 0) {
				if(!character.isJumping && !character.isSquatting && !character.isHurt && !character.isAttacking) {
					character.isJumping = true;
					character.isMoving = false;
					character.jumpDirection = character.moveDirection;
					if(character.direction == "right") {
						character.spriteX = character.movement.jumpRight[0];
						character.spriteY = character.movement.jumpRight[1];
					} else {
						character.spriteX = character.movement.jumpLeft[0];
						character.spriteY = character.movement.jumpLeft[1];
					}
				}
			}
		break;
		
		case 'button-dpad-left':
			if(value != 0) {
				if(!character.isJumping && !character.isSquatting && !character.isHurt && !character.isAttacking) {
					if(!character.isMoving) {
						character.spriteX = character.movement.walkLeft[0];
						character.spriteY = character.movement.walkLeft[1];
					}
					character.isMoving = true;
					character.moveDirection = "left";
				}
			} else if(character.moveDirection == "left"){
				if(character.isMoving && !character.isJumping && !character.isAttacking) {
					character.spriteX = character.movement.waitLeft[0];
					character.spriteY = character.movement.waitLeft[1];
				}
				character.isMoving = false;
				character.moveDirection = "none";
				if(!character.isJumping) {
					character.animation.wait();
				}
			}
		break;
		
		case 'button-dpad-right':
			if(value != 0) {
				if(!character.isJumping && !character.isSquatting && !character.isHurt &&!character.isAttacking) {
					if(!character.isMoving) {
						character.spriteX = character.movement.walkRight[0];
						character.spriteY = character.movement.walkRight[1];
					}
					character.isMoving = true;
					character.moveDirection = "right";
				}
			} else if(character.moveDirection == "right") {
				if(character.isMoving && !character.isJumping && !character.isAttacking) {
					character.spriteX = character.movement.waitRight[0];
					character.spriteY = character.movement.waitRight[1];
				}
				character.isMoving = false;
				character.moveDirection = "none";
				if(!character.isJumping) {
					character.animation.wait();
				}
			}
		break;
		
		case 'button-dpad-bottom':
			if(value != 0) {
				if(!character.isJumping && !character.isAttacking && !character.isMoving && !character.isHurt) {
					character.isSquatting = true;
					character.characterHeight = 125;
					if(character.direction == "right") {
						character.spriteX = character.movement.squatRight[0];
						character.spriteY = character.movement.squatRight[1];
					} else {
						character.spriteX = character.movement.squatLeft[0];
						character.spriteY = character.movement.squatLeft[1];
					}
				}
			} else {
				if(character.isSquatting && !character.isJumping && !character.isAttacking) {
					character.isSquatting = false;
					character.characterHeight = 250;
					if(character.direction == "right") {
						character.spriteX = character.movement.waitRight[0];
						character.spriteY = character.movement.waitRight[1];
					} else {
						character.spriteX = character.movement.waitRight[0];
						character.spriteY = character.movement.waitRight[1];
					}
				}
			}
		break;
		
		case 'button-1':
			if(value != 0) {
				if(!character.isJumping && !character.isAttacking && !character.isHurt) {
					character.isAttacking = true;
					if(character.isMoving) {
						character.isMoving = false;
						character.moveDirection = "none";
					}
					if(character.isSquatting) {
						if(character.direction == "right") {
							character.spriteX = character.movement.squatPunchRight[0];
							character.spriteY = character.movement.squatPunchRight[1];
						} else {
							character.spriteX = character.movement.squatPunchLeft[0];
							character.spriteY = character.movement.squatPunchLeft[1];
						}
						character.characterWidth = 200;
					} else {
						if(character.direction == "right") {
							character.spriteX = character.movement.hookPunchRight[0];
							character.spriteY = character.movement.hookPunchRight[1];
						} else {
							character.spriteX = character.movement.hookPunchLeft[0];
							character.spriteY = character.movement.hookPunchLeft[1];
						}
						character.characterWidth = 200;
					}
				}
			}
		break;
	}
};