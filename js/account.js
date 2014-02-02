/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */

"use strict";

function Account() {
    var _pseudo,
        _email,
        _password,
        _birthdate,
        _nbrVictories = 0,
        _nbrLoose = 0,
        _rank = 500,
        _banned = false;

    Object.defineProperties(this, {
        pseudo:{
            get:function () {
                return _pseudo;
            },
            set:function (pseudo) {
                _pseudo = pseudo;
            }
        },
        email:{
            get:function () {
                return _email;
            },
            set:function (email) {
                _email = email;
            }
        },
        password:{
            get:function () {
                return _password;
            },
            set:function (password) {
                _password = password;
            }
        },
        birthdate:{
            get:function () {
                return _birthdate;
            },
            set:function (birthdate) {
                _birthdate = birthdate;
            }
        },
        nbrVictories:{
            get:function () {
                return _nbrVictories;
            },
            set:function (nbrVictories) {
                _nbrVictories = nbrVictories;
            }
        },
        nbrLoose:{
            get:function () {
                return _nbrLoose;
            },
            set:function (nbrLoose) {
                _nbrLoose = nbrLoose;
            }
        },
        rank:{
            get:function () {
                return _rank;
            },
            set:function (rank) {
                _rank = rank;
            }
        },
        banned:{
            get:function () {
                return _banned;
            },
            set:function (banned) {
                _banned = banned;
            }
        }
    });
}

Account.prototype.update = function () {

};

