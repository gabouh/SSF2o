/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */


"use strict";

function Npc() {
    Character.apply(this);
}

Npc.prototype = Object.create(Character.prototype);

Npc.prototype.update = function () {

};

