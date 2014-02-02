/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */


"use strict";

function Mask() {
}

Mask.prototype.setImage = function(image, sx, sy, swidth, sheight, width, height) {
    this.width = width;
    this.image = image;
    this.imageData = this.getImageData(image, sx, sy, swidth, sheight, width, height);
    this.pixels = this.getImagePixels(this.imageData);
};

Mask.prototype.getImageData = function(image, sx, sy, swidth, sheight, width, height) {
    var ctx = this.createVirtualCanvas();
    ctx.drawImage(image, sx, sy, swidth, sheight, 0, 0, width, height);
    return ctx.getImageData(0, 0, width, height);
};

Mask.prototype.createVirtualCanvas = function() {
    return document.createElement('canvas').getContext('2d');
};

Mask.prototype.getImagePixels = function(imageData) {
    return imageData.data;
};

Mask.prototype.getColor = function(x, y) {
    var y0 = (y * (this.width * 4)) + (x * 4);
    return "#" + this.pixels[y0 + 0].toString(16) + this.pixels[y0 + 1].toString(16) + this.pixels[y0 + 2].toString(16);
};

Mask.prototype.update = function(image, sx, sy, swidth, sheight, width, height) {
    this.setImage(image, sx, sy, swidth, sheight, width, height);
};

