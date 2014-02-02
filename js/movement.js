/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */

/* This class is used to define all movements that a character can do */

"use strict";

function Movement() {
	 
	var	_waitRight = [],
		_waitLeft = [],
		_walkRight = [],
		_walkLeft = [],
        _jumpRight = [],
        _jumpLeft = [],
		_hookPunchRight = [],
        _hookPunchLeft = [],
		_squatRight = [],
		_squatLeft = [],
		_hurtRight = [],
		_hurtLeft = [],
		_squatPunchRight = [],
		_squatPunchLeft = [];
		
	Object.defineProperties(this, {
		waitRight:{
            get:function () {
                return _waitRight;
            },
            set:function (waitRight) {
                _waitRight = waitRight;
            }
        },
		waitLeft:{
            get:function () {
                return _waitLeft;
            },
            set:function (waitLeft) {
                _waitLeft = waitLeft;
            }
        },
        walkRight:{
            get:function () {
                return _walkRight;
            },
            set:function (walkRight) {
                _walkRight = walkRight;
            }
        },
        walkLeft:{
            get:function () {
                return _walkLeft;
            },
            set:function (walkLeft) {
                _walkLeft = walkLeft;
            }
        },
		jumpRight:{
            get:function () {
                return _jumpRight;
            },
            set:function (jumpRight) {
                _jumpRight = jumpRight;
            }
        },
        jumpLeft:{
            get:function () {
                return _jumpLeft;
            },
            set:function (jumpLeft) {
                _jumpLeft = jumpLeft;
            }
        },
		hookPunchRight:{
            get:function () {
                return _hookPunchRight;
            },
            set:function (hookPunchRight) {
                _hookPunchRight = hookPunchRight;
            }
        },
        hookPunchLeft:{
            get:function () {
                return _hookPunchLeft;
            },
            set:function (hookPunchLeft) {
                _hookPunchLeft = hookPunchLeft;
            }
        },
		squatRight:{
            get:function () {
                return _squatRight;
            },
            set:function (squatRight) {
                _squatRight = squatRight;
            }
        },
        squatLeft:{
            get:function () {
                return _squatLeft;
            },
            set:function (squatLeft) {
                _squatLeft = squatLeft;
            }
        },
		hurtRight:{
            get:function () {
                return _hurtRight;
            },
            set:function (hurtRight) {
                _hurtRight = hurtRight;
            }
        },
        hurtLeft:{
            get:function () {
                return _hurtLeft;
            },
            set:function (hurtLeft) {
                _hurtLeft = hurtLeft;
            }
        },
		squatPunchRight:{
            get:function () {
                return _squatPunchRight;
            },
            set:function (squatPunchRight) {
                _squatPunchRight = squatPunchRight;
            }
        },
        squatPunchLeft:{
            get:function () {
                return _squatPunchLeft;
            },
            set:function (squatPunchLeft) {
                _squatPunchLeft = squatPunchLeft;
            }
        }
	});
	var _init = this.initMovement();
};

Movement.prototype.initMovement = function () {
	/* An array has to look like this : [Line,Raw,Number of Sprite(s)] */
	this.waitRight = [0,0,4];
	this.waitLeft = [5,0,4];
	this.walkRight = [10,0,5];
	this.walkLeft = [16,0,5];
    this.jumpRight = [0,1,7];
	this.jumpLeft = [8,1,7];
	this.hookPunchRight = [0,2,3];
	this.hookPunchLeft = [4,2,3];
	this.squatRight = [17,1,1];
	this.squatLeft = [20,1,1];
	this.hurtRight = [10,4,4];
	this.hurtLeft = [15,4,4];
	this.squatPunchRight = [9,3,1];
	this.squatPunchLeft = [13,3,1];
};