import { registerPlugin } from '@capacitor/core';

import type { EchoPlugin } from './definitions';

const Echo = registerPlugin<EchoPlugin>('Echo', {
  web: () => import('./web').then(m => new m.EchoWeb()),
});

export * from './definitions';
export { Echo };
