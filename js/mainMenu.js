/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */


"use strict";

function MainMenu() {

}

MainMenu.prototype.getMenuHtmlElement = function() {
    return document.getElementById('launch-solo-game');
};

MainMenu.prototype.update = function() {

};

MainMenu.prototype.hide = function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('background-menu').style.display = 'none';
};