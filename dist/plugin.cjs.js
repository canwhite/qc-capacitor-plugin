'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

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
//# sourceMappingURL=plugin.cjs.js.map
