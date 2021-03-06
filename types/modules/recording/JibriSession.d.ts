/**
 * Represents a recording session.
 */
export default class JibriSession {
    /**
     * Initializes a new JibriSession instance.
     *
     * @constructor
     */
    constructor(options?: {});
    _connection: any;
    _mode: any;
    /**
     * Returns the error related to the session instance, if any.
     *
     * @returns {string|undefined}
     */
    getError(): string | undefined;
    /**
     * Returns the session ID of the session instance.
     *
     * @returns {string|undefined}
     */
    getID(): string | undefined;
    /**
     * Returns the initiator of the session instance.
     *
     * @returns {JitsiParticipant|undefined} The participant that started the session.
     */
    getInitiator(): any | undefined;
    /**
     * Returns the streaming URL of the session.
     *
     * @returns {string|undefined}
     */
    getLiveStreamViewURL(): string | undefined;
    /**
     * Returns the current status of the session.
     *
     * @returns {string|undefined}
     */
    getStatus(): string | undefined;
    /**
     * Returns the jid of the participant that stopped the session.
     *
     * @returns {JitsiParticipant|undefined} The participant that stopped the session.
     */
    getTerminator(): any | undefined;
    /**
     * Returns the current recording mode of the session, such as "file".
     *
     * @returns {string}
     */
    getMode(): string;
    /**
     * Sets the last known error message related to the session.
     *
     * @param {string} error - The error string explaining why the session
     * entered an error state.
     * @returns {void}
     */
    setError(error: string): void;
    _error: string | undefined;
    /**
     * Sets the last live stream URL for the session instance. Usually this is
     * a YouTube URL and usually this is only set for "stream" sessions.
     *
     * @param {string} url - The live stream URL associated with the session.
     * @returns {void}
     */
    setLiveStreamViewURL(url: string): void;
    _liveStreamViewURL: string | undefined;
    /**
     * Sets the last known status for this recording session.
     *
     * @param {string} status - The new status to set.
     * @returns {void}
     */
    setStatus(status: string): void;
    _status: string | undefined;
    /**
     * Sets the creator's jid of the session.
     * @param {JitsiParticipant} participant - The creator of the session.
     */
    setInitiator(participant: any): void;
    _initiator: any;
    /**
     * Sets the jid of the participant that stopped the session.
     * @param {JitsiParticipant} participant  - The participant's jid,
     * that stopped the session.
     */
    setTerminator(participant: any): void;
    _terminator: any;
    /**
     * Sends a message to start the actual recording.
     *
     * @param {Object} options - Additional arguments for starting the
     * recording.
     * @param {string} [options.appData] - Data specific to the app/service that
     * the result file will be uploaded.
     * @param {string} [options.broadcastId] - The broadcast ID of an
     * associated YouTube stream, used for knowing the URL from which the stream
     * can be viewed.
     * @param {string} options.focusMucJid - The JID of the focus participant
     * that controls recording.
     * @param {streamId} options.streamId - Necessary for live streaming, this
     * is the stream key needed to start a live streaming session with the
     * streaming service provider.
     * @returns Promise
     */
    start({ appData, broadcastId, focusMucJid, streamId }: {
        appData?: string | undefined;
        broadcastId?: string | undefined;
        focusMucJid: string;
        streamId: any;
    }): Promise<any>;
    /**
     * Sends a message to actually stop the recording session.
     *
     * @param {Object} options - Additional arguments for stopping the
     * recording.
     * @param {Object} options.focusMucJid - The JID of the focus participant
     * that controls recording.
     * @returns Promise
     */
    stop({ focusMucJid }: {
        focusMucJid: Object;
    }): Promise<any>;
    /**
     * Generates the message to change the status of the recording session.
     *
     * @param {string} status - The new status to which the recording session
     * should transition.
     * @param {string} [options.appData] - Data specific to the app/service that
     * the result file will be uploaded.
     * @param {string} [options.broadcastId] - The broadcast ID of an
     * associated YouTube stream, used for knowing the URL from which the stream
     * can be viewed.
     * @param {string} options.focusMucJid - The JID of the focus participant
     * that controls recording.
     * @param {streamId} options.streamId - Necessary for live streaming, this
     * is the stream key needed to start a live streaming session with the
     * streaming service provider.
     * @returns Object - The XMPP IQ message.
     */
    _createIQ({ action, appData, broadcastId, focusMucJid, streamId }: string): any;
    /**
     * Handles the error from an iq and stores the error.
     *
     * @param {Node} errorIq - The error response from an Iq.
     * @private
     * @returns {void}
     */
    private _setErrorFromIq;
    /**
     * Sets the known session ID for this recording session.
     *
     * @param {string} sessionID
     * @private
     * @returns {void}
     */
    private _setSessionID;
    _sessionID: string | undefined;
}
