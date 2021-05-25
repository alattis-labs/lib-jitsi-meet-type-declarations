declare const minimize: boolean;
export const devtool: string;
export const mode: string;
export namespace module {
    const rules: ({
        loader: string;
        options: {
            flags: string;
            replace: any;
            search: string;
            presets?: undefined;
            plugins?: undefined;
        };
        test: string;
        exclude?: undefined;
    } | {
        exclude: RegExp[];
        loader: string;
        options: {
            presets: (string | (string | {
                modules: boolean;
                targets: {
                    chrome: number;
                    electron: number;
                    firefox: number;
                    safari: number;
                };
            })[])[];
            plugins: string[];
            flags?: undefined;
            replace?: undefined;
            search?: undefined;
        };
        test: RegExp;
    })[];
}
export namespace node {
    const __filename: boolean;
}
export namespace optimization {
    export { minimize as concatenateModules };
}
export namespace output {
    const filename: string;
    const path: any;
    const sourceMapFilename: string;
}
export namespace performance {
    const hints: string | boolean;
    const maxAssetSize: number;
    const maxEntrypointSize: number;
}
export const plugins: any[];
export {};
