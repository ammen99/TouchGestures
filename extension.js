const Clutter = imports.gi.Clutter;

const Lang = imports.lang;
const Main = imports.ui.main;
const Signals = imports.signals;
const Shell = imports.gi.Shell;

const KEYBOARD_TYPE='keyboard-type';

const ShowKbdAction = new Lang.Class({
    Name: 'ShowKbdAction',
    Extends : Clutter.TapAction,

    _init: function() {
        this.parent();
        this.set_n_touch_points(3);
        global.display.connect('grab-op-begin', Lang.bind(this, function () {this.cancel(); }));
    },

    vfunc_gesture_prepare: function() {
        if (Main.actionMode != Shell.ActionMode.NORMAL) {
            this.cancel();
            return false;
        }

        return this.get_n_current_points() == 3;
    },

    vfunc_gesture_end: function() {
        if (Main.keyboard._keyboardVisible == false) {
            Main.keyboard.hide();
            Main.keyboard.show(0);
        } else {
            Main.keyboard.hide();
        }
    }
});

function enable() {
    var gesture = new ShowKbdAction();
    global.stage.add_action(gesture);
}

function disable() {
}
