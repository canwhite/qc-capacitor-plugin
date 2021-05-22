import { registerPlugin } from '@capacitor/core';
const Echo = registerPlugin('Echo', {
    web: () => import('./web').then(m => new m.EchoWeb()),
});
export * from './definitions';
export { Echo };
//# sourceMappingURL=index.js.map