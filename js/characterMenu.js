/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */
"use strict";

function CharacterMenu(characters) {
    var _time = 60; // Second

    Object.defineProperties(this, {
        time:{
            get:function () {
                return _time;
            },
            set:function (time) {
                _time = time;
            }
        }
    });
}

CharacterMenu.prototype.update = function () {

};

CharacterMenu.prototype.draw = function (context) {

};
