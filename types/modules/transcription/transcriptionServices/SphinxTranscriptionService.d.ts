export = SphinxService;
declare class SphinxService {
    /**
     * Overrides the sendRequest method from AbstractTranscriptionService
     * it will send the audio stream the a Sphinx4 server to get the transcription
     *
     * @param audioFileBlob the recorder audio stream an a single Blob
     * @param callback the callback function retrieving the server response
     */
    sendRequest(audioFileBlob: any, callback: any): void;
    /**
     * Overrides the formatResponse method from AbstractTranscriptionService
     * It will parse the answer from the server in the expected format
     *
     * @param response the JSON body retrieved from the Sphinx4 server
     */
    formatResponse(response: any): any[];
    /**
     * checks wether the reply is empty, or doesn't contain a correct JSON object
     * @param response the server response
     * @return {boolean} whether the response is valid
     */
    verify(response: any): boolean;
}
