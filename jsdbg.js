/**
 * JSDBG, just another console wrapper with detailed tutorial and the same usage as the native one.
 * But in addition to habitual behaviour and syntax it has some useful and even powerful possibilities.
 * All of the them are describe in built-in documentation, so you can type ___.HELP in any time and read it.
 *
 * @author zhibirc
 * @param {object} root - Global object.
 * @returns {undefined} IIFE instantiate a new property in the global object and returns nothing.
 */
(function (root) {
    'use strict';

    /** Here we are. */
    var con = root.console,
        has_own = Object.prototype.hasOwnProperty,
        is_console_defined = typeof con !== 'undefined',
        base_control_flags = {
            activity: 1,
            logging: 0,
            remote: 0
        },
        ___reference,
        fit_props,
        support;

    if (typeof root.___ === 'undefined') {
        Object.defineProperty(root, '___', {
            value: {}
        });
        ___reference = root.___;
    }

    ___reference.NAME = '___';

    /**
     * @todo This is a stand-alone part of the program, documentation and nothing else. Make it easy to understand and complete for effective usage.
     */
    support = {
        errors: {
            wrong_flag: 'Flags may be 1 or 0 only, any other values are wrong! For details please refer to the documentation (' + ___reference.NAME + '.HELP).'
        },
        intro: {
            0: '\u25C0 Introduction to JSDBG \u25B6\n\nNow your debug tool is available under the "' + ___reference.NAME,
            1: '" name. Naturally, as the built-in console it has a lot of methods and some properties, full list of which and information about common usage are always available by typing\n\n',
            2: '> ' + ___reference.NAME + '.HELP',
            3: '\n\nInformation about methods is identical to standard native console ones. But keep in mind that there are additional functionality and possibilities, so read documentation.'
        },
        state: {
            header: '\u25C0 JSDBG state report \u25B6\n\n',
            body: {
                0: 'Debugger ' + (base_control_flags.activity ? 'ENABLED (1)' : 'DISABLED (0)') + '.\n',
                1: 'Logging ' + (base_control_flags.logging ? 'ENABLED (1)' : 'DISABLED (0)') + '.\n',
                2: 'Remote control ' + (base_control_flags.remote ? 'ENABLED (1)' : 'DISABLED (0)') + '.\n'
            }
        },
        help: {
            header: '\u25C0 JSDBG HELP \u25B6'
        }
    };

    is_console_defined && typeof con.log === 'function' && con.log(support.intro[0] + support.intro[1] + support.intro[2] + support.intro[3]);

    /** Verify each method in the native console and add all methods to the custom one. */
    if (is_console_defined) {
        // Here are properties supported by all major browsers nowadays, other are browser specific and redundant here.
        fit_props = ['log', 'warn', 'error', 'info', 'dir', 'time', 'timeEnd', 'assert', 'debug', 'count', 'group', 'groupEnd', 'groupCollapsed', 'trace'];
        for (var method in con) {
            (function (m) {
                if (con[m] && ~fit_props.indexOf(m)) {
                    Object.defineProperty(___reference, m, {
                        value: function () {
                            if (base_control_flags.activity === 1) {
                                con[m].apply(con, arguments);
                            } else {
                                return void(0);
                            }
                        }
                    });
                }
            }(method));
        }
    }

    ___reference.setState = function (activity, logging, remote) {
        if (activity === 1) {
            base_control_flags.activity = 1;
        } else if (activity === 0) {
            base_control_flags.activity = 0;
        } else {
            throw new Error(support.errors.wrong_flag);
        }
    };

    ___reference.VERSION = '1.0';
    ___reference.HELP = support.help;
    ___reference.STATE = support.state.header + Object.keys(support.state.body).reduce(function (init, el) { return init += support.state.body[el]; }, '');

    Object.freeze(___reference);
}(window));