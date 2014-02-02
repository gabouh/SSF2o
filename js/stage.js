/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */
 
"use strict";

function Stage(name) 
{
	var _name = name,
		_foreground = new Image(),
		_background = new Image;
		
	Object.defineProperties(this, {
        name:{
            get:function () {
                return _name;
            },
            set:function (name) {
                _name = name;
            }
        },
		foreground:{
            get:function () {
                return _foreground;
            },
            set:function (foreground) {
                _foreground = foreground;
            }
		},
		background:{
            get:function () {
                return _background;
            },
            set:function (background) {
                _background = background;
            }
		}
    });
	this.foreground.src = "./img/foregrounds/"+this.name+".jpg";
	this.background.src = "./img/backgrounds/"+this.name+".jpg";
}

Stage.prototype.display = function() {

	this.background.width = window.innerWidth*2;
	this.background.height = window.innerHeight;
	this.background.style.position = "absolute";
	this.background.style.top = "0px";
	this.background.style.left = (-(window.innerWidth/2)).toString() + "px";
	this.background.style.zIndex = "-2";

	this.foreground.width = window.innerWidth*2;
	this.foreground.height = window.innerHeight/6;
	this.foreground.style.position = "absolute";
	this.foreground.style.top = (window.innerHeight*5/6).toString() + "px";
	this.foreground.style.left = (-(window.innerWidth/2)).toString() + "px";
	this.foreground.style.zIndex = "-1";

	document.body.appendChild(this.background);
	document.body.appendChild(this.foreground);
};

Stage.prototype.draw = function(context, charaOne, charaTwo) {
	context.fillStyle = "red";
	context.fillRect(50,50,550,50);
	context.fillRect(700,50,550,50);
	context.fillStyle = "yellow";
	context.fillRect(50+(550-550*(charaOne.life/100)),50,550*(charaOne.life/100),50);
	context.fillRect(700,50,550*(charaTwo.life/100),50);
	context.strokeStyle = "black";
	context.strokeRect(50,50,550,50);
	context.strokeRect(700,50,550,50);
};

Stage.prototype.update = function(charaLeft, charaRight) {
	// We assure that the first character is the left one
	if(charaLeft.positionX > charaRight.positionX) {
		// If not
		this.update(charaRight,charaLeft);
	} else {
		if(charaLeft.direction != "right") {
			charaLeft.changeDirection();
		}
		if(charaRight.direction != "left") {
			charaRight.changeDirection();
		}
		this.collisionTest(charaLeft,charaRight);
		var margin = 60, // Margin needed between a character and the screen
			screenWidth = window.innerWidth, // Width of the canvas displayed
			foregroundPosX = this.foreground.offsetLeft, 
			backgroundPosX = this.background.offsetLeft;
			
		if(charaLeft.positionX <= margin && // The left character is moving close to the left border of the screen
		charaRight.positionX + charaRight.characterWidth + margin + 10 < screenWidth && // Checking if the right one isn't blocking the other side
		foregroundPosX < -(margin)) { // The left border of the foreground has to be at a little distance from the left border of the canvas
			//Scroll Left
			foregroundPosX += 30;
			backgroundPosX += 6;
			charaRight.positionX += 30;
			charaLeft.positionX += 30;
		}
		else if(charaRight.positionX + charaRight.characterWidth + margin >= screenWidth && // The right character is moving close to the right border
		charaLeft.positionX > margin + 10 && // While the left character is not blocking the other border
		foregroundPosX - margin > -(screenWidth)) { // The right of the foreground has to be a margin away from the right of the canvas
			//Scroll Right
			foregroundPosX -= 30;
			backgroundPosX -= 6;
			charaLeft.positionX -= 30;
			charaRight.positionX -= 30;
		}
		this.foreground.style.left = (foregroundPosX).toString() + "px";
		this.background.style.left = (backgroundPosX).toString() + "px";
	}
};

Stage.prototype.collisionTest = function(charaLeft, charaRight) {
	if(charaLeft.positionX + charaLeft.characterWidth > charaRight.positionX &&
	   charaLeft.positionY + charaLeft.characterHeight/2 > charaRight.positionY &&
	   charaLeft.positionY - charaLeft.characterHeight/2 < charaRight.positionY) {
		charaLeft.blockedRight = true;
		charaRight.blockedLeft = true;
		if(charaLeft.positionX + charaLeft.characterWidth - 10 > charaRight.positionX) {
			charaLeft.positionX -= 5;
			charaRight.positionX += 5;
		}
	} else {
		charaLeft.blockedRight = false;
		charaLeft.blockedLeft = false;
		charaRight.blockedRight = false;
		charaRight.blockedLeft = false;
	}
	if(charaLeft.positionX + charaLeft.characterWidth + 30 > charaRight.positionX) {
		if(charaLeft.isAttacking) {
			if(charaLeft.isSquatting) {
				charaLeft.isAttacking = false;
				charaLeft.characterWidth = 150;
				charaLeft.spriteX = charaLeft.movement.squatRight[0];
				charaLeft.spriteY = charaLeft.movement.squatRight[1];
			} 
			if(charaLeft.isSquatting || !charaRight.isSquatting) {
				charaRight.isHurt = true;
				charaRight.spriteX = charaRight.movement.hurtLeft[0];
				charaRight.spriteY = charaRight.movement.hurtLeft[1];
				charaRight.life -= 10;
			}
		} else if(charaRight.isAttacking) {
			if(charaRight.isSquatting) {
				charaRight.isAttacking = false;
				charaRight.characterWidth = 150;
				charaRight.spriteX = charaRight.movement.squatLeft[0];
				charaRight.spriteY = charaRight.movement.squatLeft[1];
			}
			if(charaRight.isSquatting || !charaLeft.isSquatting) {
				charaLeft.isHurt = true;
				charaLeft.spriteX = charaRight.movement.hurtRight[0];
				charaLeft.spriteY = charaRight.movement.hurtRight[1];
				charaLeft.life -= 10;
			}
		}
	}
};