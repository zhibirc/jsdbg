(function (root, undefined) {
    'use strict';

    /** Available names for module name. */
    var fit_names = ['DBG', 'DEBUG', 'DEBUGGER'],
        has_own = Object.prototype.hasOwnProperty,
        con = root.console,
        is_console_defined = typeof con !== 'undefined',
        base_control_flags = {
            activity: 1,
            logging: 0,
            remote: 0
        },
        dbg_control,
        fit_props,
        support;

    fit_names.some(function (elem) {
        if (root[elem] === undefined) {
            Object.defineProperty(root, elem, {
                value: {}
            });
            dbg_control = root[elem];
            dbg_control.NAME = elem;
            return true;
        }
    });

    // TODO: this is a stand-alone part of program, documentation and nothing else. Make it easy to understand and complete for effective usage.
    support = {
        errors: {
            wrong_flag: 'Flags may be 1 or 0 only, any other values are wrong! For details please refer to the documentation (' + dbg_control.NAME + '.HELP).'
        },
        intro: {
            0: '\u25C0 Introduction to JSDBG \u25B6\n\nNow your debug tool is available under the "' + dbg_control.NAME,
            1: '" name. Naturally, as the built-in console it has a lot of methods and some properties, full list of which and information about common usage are always available by typing\n\n',
            2: '> ' + dbg_control.NAME + '.HELP',
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
                    Object.defineProperty(dbg_control, m, {
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

    dbg_control.setState = function (activity, logging, remote) {
        if (activity === 1) {
            base_control_flags.activity = 1;
        } else if (activity === 0) {
            base_control_flags.activity = 0;
        } else {
            throw new Error(support.errors.wrong_flag);
        }
    };

    dbg_control.VERSION = '1.0';
    dbg_control.HELP = support.help;
    dbg_control.STATE = support.state;

    Object.freeze(dbg_control);
}(window));