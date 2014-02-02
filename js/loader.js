/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */
 
"use strict";

function Loader(images) 
{
	var _images = images,
		_imagesBuffer = [],
		_currentImageBuffer,
		_currentIndex = 0,
		_percentage = 0,
		_totalImagesSize = 0,
		_totalLoaded = 0;
		
	Object.defineProperties(this, {
        images:{
            get:function () {
                return _images;
            },
            set:function (images) {
                _images = images;
            }
        },
		imagesBuffer:{
            get:function () {
                return _imagesBuffer;
            },
            set:function (imagesBuffer) {
                _imagesBuffer = imagesBuffer;
            }
		},
		currentImageBuffer:{
            get:function () {
                return _currentImageBuffer;
            },
            set:function (currentImageBuffer) {
                _currentImageBuffer = currentImageBuffer;
            }
		},
		currentIndex:{
            get:function () {
                return _currentIndex;
            },
            set:function (currentIndex) {
                _currentIndex = currentIndex;
            }
        },
		percentage:{
            get:function () {
                return _percentage;
            },
            set:function (percentage) {
                _percentage = percentage;
            }
		},
		totalImagesSize:{
            get:function () {
                return _totalImagesSize;
            },
            set:function (totalImagesSize) {
                _totalImagesSize = totalImagesSize;
            }
		},
		totalLoaded:{
            get:function () {
                return _totalLoaded;
            },
            set:function (totalLoaded) {
                _totalLoaded = totalLoaded;
            }
		}
    });
}

Loader.prototype.loadInit = function(i) {
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
				self.loadInit(i+1);
			}
		};
		imgReq.send();
	} else {
		this.loadingAction = setInterval(function() {
			if(self.currentIndex < self.currentImageBuffer.byteLength) {
				self.updateLoading();
			}
		}, 1000);
		this.loadImage();
	}
};

Loader.prototype.updateLoading = function() {
	var bufferAdded = 0;
	if(this.currentImageBuffer[this.currentIndex] > 0) {
		bufferAdded += this.currentImageBuffer[this.currentIndex];
	}
	this.totalLoaded += bufferAdded;
	this.percentageBar = this.totalLoaded*100/this.totalImageSize;
	this.currentIndex++;
};

Loader.prototype.nextImage = function(i) {
	this.currentImageBuffer = this.imagesBuffer[i];
	this.currentIndex = 0;
};

Loader.prototype.loadImage = function(i) {
    var img = new Image(), self = this;
	if(typeof(i)==='undefined') i = 0;
    if (i < this.images.length) {
        img.onload = function() {
			self.nextImage(i);
            self.loadImage(i+1);
        };
		img.src = this.images[i];
    } else {
		clearInterval(this.loadingAction);
	}
};