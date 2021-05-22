import { WebPlugin } from '@capacitor/core';
import type { EchoPlugin } from './definitions';
export declare class EchoWeb extends WebPlugin implements EchoPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
