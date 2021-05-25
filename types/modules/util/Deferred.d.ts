/**
 * Promise-like object which can be passed around for resolving it later. It
 * implements the "thenable" interface, so it can be used wherever a Promise
 * could be used.
 *
 * In addition a "reject on timeout" functionality is provided.
 */
export default class Deferred {
    promise: Promise<any>;
    resolve: (...args: any[]) => void;
    reject: (...args: any[]) => void;
    then: <TResult1 = any, TResult2 = never>(onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
    catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<any>;
    /**
     * Clears the reject timeout.
     */
    clearRejectTimeout(): void;
    /**
     * Rejects the promise after the given timeout.
     */
    setRejectTimeout(ms: any): void;
    _timeout: number | undefined;
}
