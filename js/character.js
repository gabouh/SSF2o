/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */

"use strict";

function Character(name, ratio, animation) {
    var _name = name,
		_img = new Image(),
        _spriteX = 0,
        _spriteY = 0,
        _isMoving = false,
		_isJumping = false,
		_isAttacking = false,
		_isSquatting = false,
		_isHurt = false,
		_direction = "right",
		_moveDirection = "none",
		_jumpDirection = "none",
		_blockedLeft = false,
		_blockedRight = false,
        _life = 100,
        _weight = 60,
        _widthSprite = 770,
        _heightSprite = 671,
        _totalDisplayedHeight = parseFloat((9*window.innerHeight)/10 * ratio),
        _totalDisplayedWidth = _totalDisplayedHeight * (_widthSprite/_heightSprite),
		_characterWidth = 150,
		_characterHeight = 250,
        _positionX = 0, //Initial position
        _positionY = (9*window.innerHeight)/10 - _totalDisplayedHeight, //Initial position
        _movement = new Movement(),
        _movementDone = true,
        _combo,
        _handicap,
        _animation = animation;

    Object.defineProperties(this, {
        name:{
            get:function () {
                return _name;
            },
            set:function (name) {
                _name = name;
            }
        },
		img:{
            get:function () {
                return _img;
            },
            set:function (img) {
                _img = img;
            }
        },
        sprite:{
            get:function () {
                return _sprite;
            },
            set:function (sprite) {
                _sprite = sprite;
            }
        },
        positionX:{
            get:function () {
                return _positionX;
            },
            set:function (positionX) {
                _positionX = positionX;
            }
        },
        positionY:{
            get:function () {
                return _positionY;
            },
            set:function (positionY) {
                _positionY = positionY;
            }
        },
        spriteX:{
            get:function () {
                return _spriteX;
            },
            set:function (spriteX) {
                _spriteX = spriteX;
            }
        },
        spriteY:{
            get:function () {
                return _spriteY;
            },
            set:function (spriteY) {
                _spriteY = spriteY;
            }
        },
        stage:{
            get:function () {
                return _stage;
            }
        },
        isMoving:{
            get:function () {
                return _isMoving;
            },
            set:function (isMoving) {
                _isMoving = isMoving;
            }
        },
		isJumping:{
            get:function () {
                return _isJumping;
            },
            set:function (isJumping) {
                _isJumping = isJumping;
            }
        },
		isAttacking:{
            get:function () {
                return _isAttacking;
            },
            set:function (isAttacking) {
                _isAttacking = isAttacking;
            }
        },
		isSquatting:{
            get:function () {
                return _isSquatting;
            },
            set:function (isSquatting) {
                _isSquatting = isSquatting;
            }
        },
		isHurt:{
            get:function () {
                return _isHurt;
            },
            set:function (isHurt) {
                _isHurt = isHurt;
            }
        },
		direction:{
            get:function () {
                return _direction;
            },
            set:function (direction) {
                _direction = direction;
            }
        },
		moveDirection:{
            get:function () {
                return _moveDirection;
            },
            set:function (moveDirection) {
                _moveDirection = moveDirection;
            }
        },
		jumpDirection:{
            get:function () {
                return _jumpDirection;
            },
            set:function (jumpDirection) {
                _jumpDirection = jumpDirection;
            }
        },
		blockedLeft:{
            get:function () {
                return _blockedLeft;
            },
            set:function (blockedLeft) {
                _blockedLeft = blockedLeft;
            }
        },
		blockedRight:{
            get:function () {
                return _blockedRight;
            },
            set:function (blockedRight) {
                _blockedRight = blockedRight;
            }
        },
        life:{
            get:function () {
                return _life;
            },
            set:function (life) {
                _life = life;
            }
        },
        weight:{
            get:function () {
                return _weight;
            },
            set:function (weight) {
                _weight = weight;
            }
        },
        heightSprite:{
            get:function () {
                return _heightSprite;
            },
            set:function (heightSprite) {
                _heightSprite = heightSprite;
            }
        },
        widthSprite:{
            get:function () {
                return _widthSprite;
            },
            set:function (widthSprite) {
                _widthSprite = widthSprite;
            }
        },
        totalDisplayedHeight:{
            get:function () {
                return _totalDisplayedHeight;
            },
            set:function (totalDisplayedHeight) {
                _totalDisplayedHeight = totalDisplayedHeight;
            }
        },
        totalDisplayedWidth:{
            get:function () {
                return _totalDisplayedWidth;
            },
            set:function (totalDisplayedWidth) {
                _totalDisplayedWidth = totalDisplayedWidth;
            }
        },
		characterHeight:{
            get:function () {
                return _characterHeight;
            },
            set:function (characterHeight) {
                _characterHeight = characterHeight;
            }
        },
        characterWidth:{
            get:function () {
                return _characterWidth;
            },
            set:function (characterWidth) {
                _characterWidth = characterWidth;
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
        movementDone:{
            get:function () {
                return _movementDone;
            },
            set:function (movementDone) {
                _movementDone = movementDone;
            }
        },
        combo:{
            get:function () {
                return _combo;
            },
            set:function (combo) {
                _combo = combo;
            }
        },
        handicap:{
            get:function () {
                return _handicap;
            },
            set:function (handicap) {
                _handicap = handicap;
            }
        },
        animation:{
            get:function () {
                return _animation;
            },
            set:function (animation) {
                _animation = animation;
            }
        }
    });
	this.img.src = "./img/sprites/"+this.name+".png";
    this.initAnimation();
}

Character.prototype.initAnimation = function() {
    this.animation = new Animation(this);
};

Character.prototype.update = function() {
    if(!this.isMoving && !this.isJumping && !this.isAttacking && !this.isSquatting &&!this.isHurt) {
		this.animation.wait();
    } else if(this.isMoving) {
		this.animation.moveUpdate();
	} else if (this.isJumping) {
		this.animation.updateJump();
	} else if (this.isAttacking) {
		this.animation.hookPunchUpdate();
	} else if(this.isHurt) {
		this.animation.assKickedUpdate();
	}
};

Character.prototype.draw = function(context) {
	var imagePositionX = this.positionX - 170,
		imagePositionY = this.positionY;
	context.drawImage(this.img, this.widthSprite * this.spriteX, this.heightSprite * this.spriteY, 
	this.widthSprite, this.heightSprite, imagePositionX, imagePositionY, this.totalDisplayedWidth, this.totalDisplayedHeight);
	//context.strokeStyle = "red";
	//context.strokeRect(this.positionX, this.positionY + 130, this.characterWidth, this.characterHeight);
};

Character.prototype.changeDirection = function() {
	if(this.direction == "right") {
		this.direction = "left";
		if(this.isJumping) {
			this.spriteX+=8;
		}
	} else {
		this.direction = "right";
		if(this.isJumping) {
			this.spriteX-=8;
		}
	}
};