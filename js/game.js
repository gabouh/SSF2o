(function() {

    "use strict";

    var CANVAS_WIDTH = window.innerWidth;     //px
    var CANVAS_HEIGHT = window.innerHeight;   //px
    var GAME_WIDTH = CANVAS_WIDTH; //px
    var GAME_HEIGHT = 530;         //px

    function Game() {
        var menu = new MainMenu(),
                self = this;

        self.initCanvas();

        menu.getMenuHtmlElement().onclick = function() {
            menu.hide();

            self.initGame();
        };
    }
	
	/*Game.prototype.loadInit = function(i) {
		var imgReq = new XMLHttpRequest(), self = this;
		if(typeof(i)==='undefined') i = 0;
		if(i < this.images.length)
		{
			imgReq.open("GET", this.images[i], true);
			imgReq.responseType = "arraybuffer";
			imgReq.onload = function (oEvent) {
				var arrayBuffer = imgReq.response;
				if (arrayBuffer) {
					var byteArray = new Uint8Array(arrayBuffer);
					self.imagesBuffer[i] = byteArray;
					for(var j=0;j<self.imagesBuffer[i].byteLength;j++) {
						self.totalImageSize += self.imagesBuffer[i][j];
					}
					self.loadInit(i + 1);
				}
			};
			imgReq.send();
		} else {
			this.index = 0;
			this.imgIndex = 0;
			this.loadingAction = setInterval(function() {
				if(self.index < self.imagesBuffer[self.imgIndex].byteLength) {
					self.updateLoading(self.imgIndex,self.index);
					self.index++;
				}
			}, 100);
			this.loadImage();
		}
    };*/

    Game.prototype.initCanvas = function() {
        var canvas = document.getElementById("riksCanvas");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        this.ctx = canvas.getContext('2d');
        this.ctx.font = "50pt Times";
    };

    Game.prototype.initGame = function() {
        this.characterOne = new Character('Ken', 0.7);
        this.characterTwo = new Character('Ken', 0.7);
        this.characterOne.positionX = 400;
        this.characterTwo.positionX = 800;
        this.stage = new Stage('test');
		this.collision = new Collision();
        new Input(this.characterOne, this.characterTwo);
        this.images = [
			"./img/sprites/" + this.characterOne.name + ".png",
			"./img/sprites/" + this.characterTwo.name + ".png",
			"./img/backgrounds/" + this.stage.name + ".jpg",
			"./img/foregrounds/" + this.stage.name + ".jpg"
		];
		//this.imagesBuffer = [];
        this.percentageBar = 0;
        //this.totalImageSize = 0;
		//this.totalLoaded = 0;
		var self = this;
		this.loadingScreen = setInterval(function() {
			self.displayLoadingScreen();
			if(self.percentageBar == 100) {
				self.launch();
			}
		},50);
		//this.loadInit();
		this.loadImage();
    };

    Game.prototype.update = function() {
		//this.collision.update(this.characterOne, this.characterTwo);
		if(this.characterOne.life > 0 && this.characterTwo.life > 0) {
			this.characterOne.update();
			this.characterTwo.update();
			this.stage.update(this.characterOne, this.characterTwo);
		}
    };

    Game.prototype.draw = function() {
		if(this.characterOne.life > 0 && this.characterTwo.life > 0) {
			this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
			this.characterOne.draw(this.ctx);
			this.characterTwo.draw(this.ctx);
			this.stage.draw(this.ctx,this.characterOne,this.characterTwo);
		} else if(this.characterOne.life <= 0) {
			this.displayEndScreen("Player 2");
		} else if(this.characterTwo.life <= 0) {
			this.displayEndScreen("Player 1");
		}
    };

    Game.prototype.launch = function() {
		clearInterval(this.loadingScreen);
		clearInterval(this.loadingAction);
        var self = this;
        setInterval(function() {
            self.update();
        }, 150);

        setInterval(function() {
            self.draw();
        }, 30);
        this.stage.display();
        var canvas = document.getElementById("riksCanvas");
        canvas.style.zIndex = "100";
    };
	
	/*Game.prototype.updateLoading = function(j) {
		var bufferAdded = 0;
		if(this.currentImageBuffer[j] > 0) {
			bufferAdded += this.currentImageBuffer[j];
		}
		this.totalLoaded += bufferAdded;
		this.percentageBar = this.totalLoaded*100/this.totalImageSize;
	};*/

    Game.prototype.loadImage = function(i) {
        var img = new Image(), self = this;
		if(typeof(i)==='undefined') i = 0;
        if (i < this.images.length) {
            img.onload = function() {
				//self.currentImageBuffer = self.imagesBuffer[i+1];
				//self.imgIndex = i+1;
				//self.index = 0;
                self.loadImage(i+1);
				self.percentageBar += 100/self.images.length;
            };
            img.src = this.images[i];
        }
    };
	
	Game.prototype.displayLoadingScreen = function() {
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
		this.ctx.fillStyle = 'white';
        this.ctx.fillText("Loading... " + truncate(this.percentageBar) + " %", CANVAS_WIDTH / 2 - 230, CANVAS_HEIGHT / 2);
	};

	Game.prototype.displayEndScreen = function(winner) {
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
		this.ctx.fillStyle = 'white';
        this.ctx.fillText(winner + " WINS !", CANVAS_WIDTH / 2 - 230, CANVAS_HEIGHT / 2);
	};
	
	window.onscroll = function() { window.scrollTo(0,0); };
	
    window.onload = function() {
        new Game();
    };

    function truncate(n) {
        return Math[n > 0 ? "floor" : "ceil"](n);
    }

})();