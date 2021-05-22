var capacitorEcho = (function (exports, core) {
    'use strict';

    const Echo = core.registerPlugin('Echo', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.EchoWeb()),
    });

    class EchoWeb extends core.WebPlugin {
        async echo(options) {
            console.log('ECHO', options);
            return options;
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        EchoWeb: EchoWeb
    });

    exports.Echo = Echo;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, capacitorExports));
//# sourceMappingURL=plugin.js.map
