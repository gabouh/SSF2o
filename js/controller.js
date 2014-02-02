/* B3 2013 London - Riks - Html5 & JavaScript Experimentation
 * 118243 Léo Benoist
 * 125656 David Calmel
 * 126359 Alexis Vernot
 * 126752 Germain Chapot
 */

"use strict";

function Controller(input) {
		// A number of typical buttons recognized by Gamepad API and mapped to
		// standard controls. Any extraneous buttons will have larger indexes.
		this.TYPICAL_BUTTON_COUNT = 16;
	
		// A number of typical axes recognized by Gamepad API and mapped to
		// standard controls. Any extraneous buttons will have larger indexes.
		this.TYPICAL_AXIS_COUNT = 4;
		
		// Whether we're requestAnimationFrameing like it's 1999.
	var _ticking = false,

		// The canonical list of attached gamepads, without 'holes' (always
		// starting at [0]) and unified between Firefox and Chrome.
		_gamepads = [],

		// Remembers the connected gamepads at the last check; used in Chrome
		// to figure out when gamepads get connected or disconnected, since no
		// events are fired.
		_prevRawGamepadTypes = [],

		// Previous timestamps for gamepad state; used in Chrome to not bother with
		// analyzing the polled data if nothing changed (timestamp is the same
		// as last time).
		_prevTimestamps = [],
		
		_input = input;
		
		Object.defineProperties(this, {
        ticking:{
            get:function () {
                return _ticking;
            },
            set:function (ticking) {
                _ticking = ticking;
            }
        },
		gamepads:{
            get:function () {
                return _gamepads;
            },
            set:function (gamepads) {
                _gamepads = gamepads;
            }
		},
		prevRawGamepadTypes:{
            get:function () {
                return _prevRawGamepadTypes;
            },
            set:function (prevRawGamepadTypes) {
                _prevRawGamepadTypes = prevRawGamepadTypes;
            }
		},
		prevTimestamps:{
            get:function () {
                return _prevTimestamps;
            },
            set:function (prevTimestamps) {
                _prevTimestamps = prevTimestamps;
            }
		},
		input:{
            get:function () {
                return _input;
            },
            set:function (input) {
                _input = input;
            }
		}
    });
}
 
  /*
   * Initialize support for Gamepad API.
   */
Controller.prototype.init = function() {
    // As of writing, it seems impossible to detect Gamepad API support
    // in Firefox, hence we need to hardcode it in the third clause.
    // (The preceding two clauses are for Chrome.)
    var gamepadSupportAvailable = !!navigator.webkitGetGamepads ||
        !!navigator.webkitGamepads ||
        (navigator.userAgent.indexOf('Firefox/') != -1);

    if (!gamepadSupportAvailable) {
		// It doesn't seem Gamepad API is available - show a message telling
		// the visitor about it.
		alert("BAD BROWSER");
    } else {
		// Firefox supports the connect/disconnect event, so we attach event
		// handlers to those.
		window.addEventListener('MozGamepadConnected',this.onGamepadConnect, false);
		window.addEventListener('MozGamepadDisconnected',this.onGamepadDisconnect, false);

		// Since Chrome only supports polling, we initiate polling loop straight
		// away. For Firefox, we will only do it if we get a connect event.
		if (!!navigator.webkitGamepads || !!navigator.webkitGetGamepads) {
			this.startPolling();
		}
    }
};

  /*
   * React to the gamepad being connected. Today, this will only be executed
   * on Firefox.
   */
Controller.prototype.onGamepadConnect = function(event) {
    // Add the new gamepad on the list of gamepads to look after.
    this.gamepads.push(event.gamepad);

    // Start the polling loop to monitor button changes.
    this.startPolling();
};

  // This will only be executed on Firefox.
Controller.prototype.onGamepadDisconnect = function(event) {
    // Remove the gamepad from the list of gamepads to monitor.
    for (var i in this.gamepads) {
		if (this.gamepads[i].index == event.gamepad.index) {
			this.gamepads.splice(i, 1);
			break;
		}
    }

    // If no gamepads are left, stop the polling loop.
    if (this.gamepads.length == 0) {
		this.stopPolling();
    }
};

  /*
   * Stops a polling loop by setting a flag which will prevent the next
   * requestAnimationFrame() from being scheduled.
   */
Controller.prototype.stopPolling = function() {
	this.ticking = false;
};

Controller.prototype.scheduleNextTick = function() {
    // Only schedule the next frame if we haven't decided to stop via
    // stopPolling() before.
	var self = this;
    if (this.ticking) {
		if (window.requestAnimationFrame) {
			window.requestAnimationFrame(function() { self.tick(); });
		} else if (window.mozRequestAnimationFrame) {
			window.mozRequestAnimationFrame(function() { self.tick(); });
		} else if (window.webkitRequestAnimationFrame) {
			window.webkitRequestAnimationFrame(function() { self.tick(); });
		}
		// Note lack of setTimeout since all the browsers that support
		// Gamepad API are already supporting requestAnimationFrame().
	}
};

Controller.prototype.pollStatus = function() {
    // Poll to see if gamepads are connected or disconnected. Necessary
    // only on Chrome.
    this.pollGamepads();

    for (var i in this.gamepads) {
		var gamepad = this.gamepads[i];

		// Don't do anything if the current timestamp is the same as previous
		// one, which means that the state of the gamepad hasn't changed.
		// This is only supported by Chrome right now, so the first check
		// makes sure we're not doing anything if the timestamps are empty
		// or undefined.
		if (gamepad.timestamp && (gamepad.timestamp == this.prevTimestamps[i])) {
			continue;
		}
		this.prevTimestamps[i] = gamepad.timestamp;
		this.updateInput(i);
    }
};

  // This function is called only on Chrome, which does not yet support
  // connection/disconnection events, but requires you to monitor
  // an array for changes.
Controller.prototype.pollGamepads = function() {

    // Get the array of gamepads - the first method (function call)
    // is the most modern one, the second is there for compatibility with
    // slightly older versions of Chrome, but it shouldn't be necessary
    // for long.
    var rawGamepads =
        (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
        navigator.webkitGamepads;

    if (rawGamepads) {
		// We don't want to use rawGamepads coming straight from the browser,
		// since it can have 'holes' (e.g. if you plug two gamepads, and then
		// unplug the first one, the remaining one will be at index [1]).
		this.gamepads = [];

		// We only refresh the display when we detect some gamepads are new
		// or removed; we do it by comparing raw gamepad table entries to
		// "undefined."
		var gamepadsChanged = false;

		for (var i = 0; i < rawGamepads.length; i++) {
			if (typeof rawGamepads[i] != this.prevRawGamepadTypes[i]) {
				gamepadsChanged = true;
				this.prevRawGamepadTypes[i] = typeof rawGamepads[i];
			}

			if (rawGamepads[i]) {
				this.gamepads.push(rawGamepads[i]);
			}
		}
    }
};

Controller.prototype.tick = function() {
	this.pollStatus();
    this.scheduleNextTick();
};

  /*
   * Starts a polling loop to check for gamepad state.
   */
Controller.prototype.startPolling = function() {
    // Don't accidentally start a second loop, man.
    if (!this.ticking) {
		this.ticking = true;
		this.tick();
    }
};

Controller.prototype.updateInput = function(gamepadId) {
    var gamepad = this.gamepads[gamepadId];
	if(gamepadId == 1) {
		console.log("PS3");
	}
	
    // Update all the buttons (and their corresponding labels) on screen.
    this.input.updateButton(gamepad.buttons[0], gamepadId, 'button-1');
    this.input.updateButton(gamepad.buttons[1], gamepadId, 'button-2');
    this.input.updateButton(gamepad.buttons[2], gamepadId, 'button-3');
    this.input.updateButton(gamepad.buttons[3], gamepadId, 'button-4');

    this.input.updateButton(gamepad.buttons[4], gamepadId,
        'button-left-shoulder-top');
    this.input.updateButton(gamepad.buttons[6], gamepadId,
        'button-left-shoulder-bottom');
    this.input.updateButton(gamepad.buttons[5], gamepadId,
        'button-right-shoulder-top');
    this.input.updateButton(gamepad.buttons[7], gamepadId,
        'button-right-shoulder-bottom');

    this.input.updateButton(gamepad.buttons[8], gamepadId, 'button-select');
    this.input.updateButton(gamepad.buttons[9], gamepadId, 'button-start');

    this.input.updateButton(gamepad.buttons[10], gamepadId, 'stick-1');
    this.input.updateButton(gamepad.buttons[11], gamepadId, 'stick-2');

    this.input.updateButton(gamepad.buttons[12], gamepadId, 'button-dpad-top');
    this.input.updateButton(gamepad.buttons[13], gamepadId, 'button-dpad-bottom');
    this.input.updateButton(gamepad.buttons[14], gamepadId, 'button-dpad-left');
    this.input.updateButton(gamepad.buttons[15], gamepadId, 'button-dpad-right');
	
    // Update all the analogue sticks.
    /*this.input.updateAxis(gamepad.axes[0], gamepadId,
        'stick-1-axis-x', 'stick-1', true);
    this.input.updateAxis(gamepad.axes[1], gamepadId,
        'stick-1-axis-y', 'stick-1', false);
    this.input.updateAxis(gamepad.axes[2], gamepadId,
        'stick-2-axis-x', 'stick-2', true);
    this.input.updateAxis(gamepad.axes[3], gamepadId,
        'stick-2-axis-y', 'stick-2', false);

    // Update extraneous buttons.
    var extraButtonId = this.TYPICAL_BUTTON_COUNT;
    while (typeof gamepad.buttons[extraButtonId] != 'undefined') {
      this.input.updateButton(gamepad.buttons[extraButtonId], gamepadId,
          'extra-button-' + extraButtonId);

      extraButtonId++;
    }

    // Update extraneous axes.
    var extraAxisId = this.TYPICAL_AXIS_COUNT;
    while (typeof gamepad.axes[extraAxisId] != 'undefined') {
      this.input.updateAxis(gamepad.axes[extraAxisId], gamepadId,
          'extra-axis-' + extraAxisId);

      extraAxisId++;
    }*/
};