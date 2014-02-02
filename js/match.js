/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */

"use strict";

function Match(characterOne, characterTwo) {
    var _characterOne = characterOne,
        _characterTwo = characterTwo,
        _nbrRound = 3,
        _time = 99, //Second
        _winner;

    Object.defineProperties(this, {
        characterOne:{
            get:function () {
                return _characterOne;
            },
            set:function (characterOne) {
                _characterOne = characterOne;
            }
        },
        characterTwo:{
            get:function () {
                return _characterTwo;
            },
            set:function (characterTwo) {
                _characterTwo = characterTwo;
            }
        },
        stage:{
            get:function () {
                return _characterOne.stage;
            }
        },
        nbrRound:{
            get:function () {
                return _nbrRound;
            },
            set:function (nbrRound) {
                _nbrRound = nbrRound;
            }
        },
        time:{
            get:function () {
                return _time;
            },
            set:function (time) {
                _time = time;
            }
        },
        winner:{
            get:function () {
                return _winner;
            },
            set:function (winner) {
                _winner = winner;
            }
        }
    });
}

Match.prototype.update = function () {

};

