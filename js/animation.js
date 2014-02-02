/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */

"use strict";

function Animation(character) {
	var _character = character,
		_movement = new Movement(),
		_direction;

	Object.defineProperties(this, {
        character:{
            get:function () {
                return _character;
            },
            set:function (character) {
                _character = character;
            }
        },
        movement:{
            get:function () {
                return _movement;
            },
            set:function (movement) {
                _movement = movement;
            }
        },
        direction:{
            get:function () {
                return _direction;
            },
            set:function (direction) {
                _direction = direction;
            }
        }
    });
}

Animation.prototype.wait = function() {
	if(this.character.direction == "right") {
		this.doAnimation(this.movement.waitRight);
	} else {
		this.doAnimation(this.movement.waitLeft);
	}
};

Animation.prototype.moveUpdate = function() {
	if(this.character.moveDirection == "right") {
		this.moveRight();
	} else {
		this.moveLeft();
	}
};

Animation.prototype.moveRight = function() {
	if(this.character.positionX + this.character.characterWidth < window.innerWidth
		&& !this.character.blockedRight) {
		this.character.positionX += 40;
	}
	if(this.character.direction == "right") {
    this.doAnimation(this.movement.walkRight);
	} else {
		this.doAnimation(this.movement.walkLeft);
	}
};

Animation.prototype.moveLeft = function() {
    if(this.character.positionX > 0 && !this.character.blockedLeft) {
        this.character.positionX -= 40;
    }
    if(this.character.direction == "right") {
		this.doAnimation(this.movement.walkRight);
	} else {
		this.doAnimation(this.movement.walkLeft);
	}
};

Animation.prototype.updateJump = function() {
	if(this.character.direction == "right") {
		this.doAnimation(this.movement.jumpRight);
		if(this.character.spriteX <=3) {
			this.character.positionY -= 120;
		} else {
			this.character.positionY += 120;
			if(this.character.spriteX == 6) {
				this.character.isJumping = false;
				this.character.jumpDirection = "none";
				this.character.spriteX = this.movement.waitRight[0];
				this.character.spriteY = this.movement.waitRight[1];
			}
		}
	} else {
		this.doAnimation(this.movement.jumpLeft);
		if(this.character.spriteX <=11) {
			this.character.positionY -= 120;
		} else {
			this.character.positionY += 120;
			if(this.character.spriteX == 14) {
				this.character.isJumping = false;
				this.character.jumpDirection = "none";
				this.character.spriteX = this.movement.waitLeft[0];
				this.character.spriteY = this.movement.waitLeft[1];
			}
		}
	}
	if(this.character.jumpDirection == "right" && this.character.positionX + this.character.characterWidth < window.innerWidth
		&& !this.character.blockedRight) {
		this.character.positionX += 60;
	} else if(this.character.jumpDirection == "left" && this.character.positionX > 0 && !this.character.blockedLeft) {
		this.character.positionX -= 60;
	}
};

Animation.prototype.hookPunchUpdate = function() {
	if(this.character.direction == "right") {
		this.doAnimation(this.movement.hookPunchRight);
		if(this.character.spriteX == 2) {
			this.character.isAttacking = false;
			this.character.spriteX = this.movement.waitRight[0];
			this.character.spriteY = this.movement.waitRight[1];
			this.character.characterWidth = 160;
		}
	} else {
		this.doAnimation(this.movement.hookPunchLeft);
		if(this.character.spriteX == 6) {
			this.character.isAttacking = false;
			this.character.spriteX = this.movement.waitLeft[0];
			this.character.spriteY = this.movement.waitLeft[1];
			this.character.characterWidth = 160;
		}
	}
};

Animation.prototype.assKickedUpdate = function() {
	if(this.character.direction == "right") {
		this.doAnimation(this.movement.hurtRight);
		if(this.character.positionX > 0) {
			this.character.positionX -= 10;
		}
		if(this.character.spriteX == 13) {
			this.character.isHurt = false;
			this.character.spriteX = this.movement.waitRight[0];
			this.character.spriteY = this.movement.waitRight[1];
		}
	} else {
		this.doAnimation(this.movement.hurtLeft);
		if(this.character.positionX + this.character.characterWidth < window.innerWidth) {
			this.character.positionX += 10;
		}
		if(this.character.spriteX == 18) {
			this.character.isHurt = false;
			this.character.spriteX = this.movement.waitLeft[0];
			this.character.spriteY = this.movement.waitLeft[1];
		}
	}
};

Animation.prototype.doAnimation = function(movement) {
	if(this.character.spriteX < movement[0] + movement[2] - 1 && this.character.spriteX >= movement[0]) {
		this.character.spriteX++;
	}
	else {
		this.character.spriteX = movement[0];
        this.character.spriteY = movement[1];
	}
};