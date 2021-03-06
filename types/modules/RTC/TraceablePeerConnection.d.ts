/**
 * Creates new instance of 'TraceablePeerConnection'.
 *
 * @param {RTC} rtc the instance of <tt>RTC</tt> service
 * @param {number} id the peer connection id assigned by the parent RTC module.
 * @param {SignalingLayer} signalingLayer the signaling layer instance
 * @param {object} iceConfig WebRTC 'PeerConnection' ICE config
 * @param {object} constraints WebRTC 'PeerConnection' constraints
 * @param {boolean} isP2P indicates whether or not the new instance will be used
 * in a peer to peer connection
 * @param {object} options <tt>TracablePeerConnection</tt> config options.
 * @param {boolean} options.disableSimulcast if set to 'true' will disable
 * the simulcast.
 * @param {boolean} options.disableRtx if set to 'true' will disable the RTX
 * @param {boolean} options.capScreenshareBitrate if set to 'true' simulcast will
 * be disabled for screenshare and a max bitrate of 500Kbps will applied on the
 * stream.
 * @param {string} options.disabledCodec the mime type of the code that should
 * not be negotiated on the peerconnection.
 * @param {boolean} options.disableH264 If set to 'true' H264 will be
 *      disabled by removing it from the SDP (deprecated)
 * @param {boolean} options.preferH264 if set to 'true' H264 will be preferred
 * over other video codecs. (deprecated)
 * @param {string} options.preferredCodec the mime type of the codec that needs
 * to be made the preferred codec for the connection.
 * @param {boolean} options.startSilent If set to 'true' no audio will be sent or received.
 *
 * FIXME: initially the purpose of TraceablePeerConnection was to be able to
 * debug the peer connection. Since many other responsibilities have been added
 * it would make sense to extract a separate class from it and come up with
 * a more suitable name.
 *
 * @constructor
 */
export default function TraceablePeerConnection(rtc: RTC, id: number, signalingLayer: any, iceConfig: object, constraints: object, isP2P: boolean, options: {
    disableSimulcast: boolean;
    disableRtx: boolean;
    capScreenshareBitrate: boolean;
    disabledCodec: string;
    disableH264: boolean;
    preferH264: boolean;
    preferredCodec: string;
    startSilent: boolean;
}): void;
export default class TraceablePeerConnection {
    /**
     * Creates new instance of 'TraceablePeerConnection'.
     *
     * @param {RTC} rtc the instance of <tt>RTC</tt> service
     * @param {number} id the peer connection id assigned by the parent RTC module.
     * @param {SignalingLayer} signalingLayer the signaling layer instance
     * @param {object} iceConfig WebRTC 'PeerConnection' ICE config
     * @param {object} constraints WebRTC 'PeerConnection' constraints
     * @param {boolean} isP2P indicates whether or not the new instance will be used
     * in a peer to peer connection
     * @param {object} options <tt>TracablePeerConnection</tt> config options.
     * @param {boolean} options.disableSimulcast if set to 'true' will disable
     * the simulcast.
     * @param {boolean} options.disableRtx if set to 'true' will disable the RTX
     * @param {boolean} options.capScreenshareBitrate if set to 'true' simulcast will
     * be disabled for screenshare and a max bitrate of 500Kbps will applied on the
     * stream.
     * @param {string} options.disabledCodec the mime type of the code that should
     * not be negotiated on the peerconnection.
     * @param {boolean} options.disableH264 If set to 'true' H264 will be
     *      disabled by removing it from the SDP (deprecated)
     * @param {boolean} options.preferH264 if set to 'true' H264 will be preferred
     * over other video codecs. (deprecated)
     * @param {string} options.preferredCodec the mime type of the codec that needs
     * to be made the preferred codec for the connection.
     * @param {boolean} options.startSilent If set to 'true' no audio will be sent or received.
     *
     * FIXME: initially the purpose of TraceablePeerConnection was to be able to
     * debug the peer connection. Since many other responsibilities have been added
     * it would make sense to extract a separate class from it and come up with
     * a more suitable name.
     *
     * @constructor
     */
    constructor(rtc: RTC, id: number, signalingLayer: any, iceConfig: object, constraints: object, isP2P: boolean, options: {
        disableSimulcast: boolean;
        disableRtx: boolean;
        capScreenshareBitrate: boolean;
        disabledCodec: string;
        disableH264: boolean;
        preferH264: boolean;
        preferredCodec: string;
        startSilent: boolean;
    });
    /**
     * Indicates whether or not this peer connection instance is actively
     * sending/receiving audio media. When set to <tt>false</tt> the SDP audio
     * media direction will be adjusted to 'inactive' in order to suspend
     * the transmission.
     * @type {boolean}
     * @private
     */
    private audioTransferActive;
    /**
     * The DTMF sender instance used to send DTMF tones.
     *
     * @type {RTCDTMFSender|undefined}
     * @private
     */
    private _dtmfSender;
    /**
     * @typedef {Object} TouchToneRequest
     * @property {string} tones - The DTMF tones string as defined by
     * {@code RTCDTMFSender.insertDTMF}, 'tones' argument.
     * @property {number} duration - The amount of time in milliseconds that
     * each DTMF should last.
     * @property {string} interToneGap - The length of time in miliseconds to
     * wait between tones.
     */
    /**
     * TouchToneRequests which are waiting to be played. This queue is filled
     * if there are touch tones currently being played.
     *
     * @type {Array<TouchToneRequest>}
     * @private
     */
    private _dtmfTonesQueue;
    /**
     * Indicates whether or not this peer connection instance is actively
     * sending/receiving video media. When set to <tt>false</tt> the SDP video
     * media direction will be adjusted to 'inactive' in order to suspend
     * the transmission.
     * @type {boolean}
     * @private
     */
    private videoTransferActive;
    /**
     * The parent instance of RTC service which created this
     * <tt>TracablePeerConnection</tt>.
     * @type {RTC}
     */
    rtc: RTC;
    /**
     * The peer connection identifier assigned by the RTC module.
     * @type {number}
     */
    id: number;
    /**
     * Indicates whether or not this instance is used in a peer to peer
     * connection.
     * @type {boolean}
     */
    isP2P: boolean;
    /**
     * The map holds remote tracks associated with this peer connection.
     * It maps user's JID to media type and remote track
     * (one track per media type per user's JID).
     * @type {Map<string, Map<MediaType, JitsiRemoteTrack>>}
     */
    remoteTracks: Map<string, Map<typeof MediaType, JitsiRemoteTrack>>;
    /**
     * A map which stores local tracks mapped by {@link JitsiLocalTrack.rtcId}
     * @type {Map<number, JitsiLocalTrack>}
     */
    localTracks: Map<number, any>;
    /**
     * Keeps tracks of the WebRTC <tt>MediaStream</tt>s that have been added to
     * the underlying WebRTC PeerConnection.
     * @type {Array}
     * @private
     */
    private _addedStreams;
    /**
     * @typedef {Object} TPCGroupInfo
     * @property {string} semantics the SSRC groups semantics
     * @property {Array<number>} ssrcs group's SSRCs in order where the first
     * one is group's primary SSRC, the second one is secondary (RTX) and so
     * on...
     */
    /**
     * @typedef {Object} TPCSSRCInfo
     * @property {Array<number>} ssrcs an array which holds all track's SSRCs
     * @property {Array<TPCGroupInfo>} groups an array stores all track's SSRC
     * groups
     */
    /**
     * Holds the info about local track's SSRCs mapped per their
     * {@link JitsiLocalTrack.rtcId}
     * @type {Map<number, TPCSSRCInfo>}
     */
    localSSRCs: Map<number, {
        /**
         * an array which holds all track's SSRCs
         */
        ssrcs: Array<number>;
        /**
         * an array stores all track's SSRC
         * groups
         */
        groups: {
            /**
             * the SSRC groups semantics
             */
            semantics: string;
            /**
             * group's SSRCs in order where the first
             * one is group's primary SSRC, the second one is secondary (RTX) and so
             * on...
             */
            ssrcs: Array<number>;
        }[];
    }>;
    /**
     * The local ICE username fragment for this session.
     */
    localUfrag: any;
    /**
     * The remote ICE username fragment for this session.
     */
    remoteUfrag: any;
    /**
     * The signaling layer which operates this peer connection.
     * @type {SignalingLayer}
     */
    signalingLayer: any;
    _peerVideoTypeChanged: any;
    _peerMutedChanged: any;
    options: {
        disableSimulcast: boolean;
        disableRtx: boolean;
        capScreenshareBitrate: boolean;
        disabledCodec: string;
        disableH264: boolean;
        preferH264: boolean;
        preferredCodec: string;
        startSilent: boolean;
    };
    peerconnection: RTCPeerConnection;
    videoBitrates: any;
    tpcUtils: TPCUtils;
    updateLog: any[];
    stats: {};
    statsinterval: number | null;
    /**
     * @type {number} The max number of stats to keep in this.stats. Limit to
     * 300 values, i.e. 5 minutes; set to 0 to disable
     */
    maxstats: number;
    interop: any;
    simulcast: any;
    sdpConsistency: SdpConsistency;
    /**
     * Munges local SDP provided to the Jingle Session in order to prevent from
     * sending SSRC updates on attach/detach and mute/unmute (for video).
     * @type {LocalSdpMunger}
     */
    localSdpMunger: LocalSdpMunger;
    /**
     * TracablePeerConnection uses RTC's eventEmitter
     * @type {EventEmitter}
     */
    eventEmitter: any;
    rtxModifier: RtxModifier;
    /**
     * The height constraint applied on the video sender.
     */
    senderVideoMaxHeight: any;
    trace: (what: any, info: any) => void;
    onicecandidate: any;
    onsignalingstatechange: any;
    oniceconnectionstatechange: any;
    onnegotiationneeded: any;
    ondatachannel: any;
    private _processStat;
    /**
     * Forwards the {@link peerconnection.iceConnectionState} state except that it
     * will convert "completed" into "connected" where both mean that the ICE has
     * succeeded and is up and running. We never see "completed" state for
     * the JVB connection, but it started appearing for the P2P one. This method
     * allows to adapt old logic to this new situation.
     * @return {string}
     */
    getConnectionState(): string;
    private _getDesiredMediaDirection;
    /**
     * Returns the list of RTCRtpReceivers created for the source of the given media type associated with
     * the set of remote endpoints specified.
     * @param {Array<string>} endpoints list of the endpoints
     * @param {string} mediaType 'audio' or 'video'
     * @returns {Array<RTCRtpReceiver>} list of receivers created by the peerconnection.
     */
    _getReceiversByEndpointIds(endpoints: Array<string>, mediaType: string): Array<RTCRtpReceiver>;
    /**
     * Tells whether or not this TPC instance is using Simulcast.
     * @return {boolean} <tt>true</tt> if simulcast is enabled and active or
     * <tt>false</tt> if it's turned off.
     */
    isSimulcastOn(): boolean;
    /**
     * Obtains audio levels of the remote audio tracks by getting the source information on the RTCRtpReceivers.
     * The information relevant to the ssrc is updated each time a RTP packet constaining the ssrc is received.
     * @param {Array<string>} speakerList list of endpoint ids for which audio levels are to be gathered.
     * @returns {Object} containing ssrc and audio level information as a key-value pair.
     */
    getAudioLevels(speakerList?: Array<string>): Object;
    /**
     * Obtains local tracks for given {@link MediaType}. If the <tt>mediaType</tt>
     * argument is omitted the list of all local tracks will be returned.
     * @param {MediaType} [mediaType]
     * @return {Array<JitsiLocalTrack>}
     */
    getLocalTracks(mediaType?: typeof MediaType | undefined): Array<any>;
    /**
     * Retrieves the local video track.
     *
     * @returns {JitsiLocalTrack|undefined} - local video track.
     */
    getLocalVideoTrack(): any | undefined;
    /**
     * Checks whether or not this {@link TraceablePeerConnection} instance contains
     * any local tracks for given <tt>mediaType</tt>.
     * @param {MediaType} mediaType
     * @return {boolean}
     */
    hasAnyTracksOfType(mediaType: typeof MediaType): boolean;
    /**
     * Obtains all remote tracks currently known to this PeerConnection instance.
     * @param {string} [endpointId] the track owner's identifier (MUC nickname)
     * @param {MediaType} [mediaType] the remote tracks will be filtered
     * by their media type if this argument is specified.
     * @return {Array<JitsiRemoteTrack>}
     */
    getRemoteTracks(endpointId?: string | undefined, mediaType?: typeof MediaType | undefined): Array<JitsiRemoteTrack>;
    /**
     * Parses the remote description and returns the sdp lines of the sources associated with a remote participant.
     *
     * @param {string} id Endpoint id of the remote participant.
     * @returns {Array<string>} The sdp lines that have the ssrc information.
     */
    getRemoteSourceInfoByParticipant(id: string): Array<string>;
    /**
     * Returns the target bitrates configured for the local video source.
     *
     * @returns {Object}
     */
    getTargetVideoBitrates(): Object;
    /**
     * Tries to find {@link JitsiTrack} for given SSRC number. It will search both
     * local and remote tracks bound to this instance.
     * @param {number} ssrc
     * @return {JitsiTrack|null}
     */
    getTrackBySSRC(ssrc: number): any | null;
    /**
     * Tries to find SSRC number for given {@link JitsiTrack} id. It will search
     * both local and remote tracks bound to this instance.
     * @param {string} id
     * @return {number|null}
     */
    getSsrcByTrackId(id: string): number | null;
    /**
     * Called when new remote MediaStream is added to the PeerConnection.
     * @param {MediaStream} stream the WebRTC MediaStream for remote participant
     */
    _remoteStreamAdded(stream: MediaStream): void;
    /**
     * Called on "track added" and "stream added" PeerConnection events (because we
     * handle streams on per track basis). Finds the owner and the SSRC for
     * the track and passes that to ChatRoom for further processing.
     * @param {MediaStream} stream the WebRTC MediaStream instance which is
     * the parent of the track
     * @param {MediaStreamTrack} track the WebRTC MediaStreamTrack added for remote
     * participant.
     * @param {RTCRtpTransceiver} transceiver the WebRTC transceiver that is created
     * for the remote participant in unified plan.
     */
    _remoteTrackAdded(stream: MediaStream, track: MediaStreamTrack, transceiver?: RTCRtpTransceiver): void;
    /**
     * Initializes a new JitsiRemoteTrack instance with the data provided by
     * the signaling layer and SDP.
     *
     * @param {string} ownerEndpointId the owner's endpoint ID (MUC nickname)
     * @param {MediaStream} stream the WebRTC stream instance
     * @param {MediaStreamTrack} track the WebRTC track instance
     * @param {MediaType} mediaType the track's type of the media
     * @param {VideoType} [videoType] the track's type of the video (if applicable)
     * @param {number} ssrc the track's main SSRC number
     * @param {boolean} muted the initial muted status
     */
    _createRemoteTrack(ownerEndpointId: string, stream: MediaStream, track: MediaStreamTrack, mediaType: typeof MediaType, videoType?: {
        CAMERA: string;
        DESKTOP: string;
        NONE: string;
    } | undefined, ssrc: number, muted: boolean): void;
    /**
     * Handles remote stream removal.
     * @param stream the WebRTC MediaStream object which is being removed from the
     * PeerConnection
     */
    _remoteStreamRemoved(stream: any): void;
    /**
     * Handles remote media track removal.
     * @param {MediaStream} stream WebRTC MediaStream instance which is the parent
     * of the track.
     * @param {MediaStreamTrack} track the WebRTC MediaStreamTrack which has been
     * removed from the PeerConnection.
     */
    _remoteTrackRemoved(stream: MediaStream, track: MediaStreamTrack): void;
    private _getRemoteTrackById;
    /**
     * Removes all JitsiRemoteTracks associated with given MUC nickname
     * (resource part of the JID). Returns array of removed tracks.
     *
     * @param {string} owner - The resource part of the MUC JID.
     * @returns {JitsiRemoteTrack[]}
     */
    removeRemoteTracks(owner: string): JitsiRemoteTrack[];
    /**
     * Removes and disposes given <tt>JitsiRemoteTrack</tt> instance. Emits
     * {@link RTCEvents.REMOTE_TRACK_REMOVED}.
     * @param {JitsiRemoteTrack} toBeRemoved
     */
    _removeRemoteTrack(toBeRemoved: JitsiRemoteTrack): void;
    /**
     * Removes and disposes <tt>JitsiRemoteTrack</tt> identified by given stream and
     * track ids.
     *
     * @param {string} streamId the media stream id as defined by the WebRTC
     * @param {string} trackId the media track id as defined by the WebRTC
     * @returns {JitsiRemoteTrack|undefined} the track which has been removed or
     * <tt>undefined</tt> if no track matching given stream and track ids was
     * found.
     */
    _removeRemoteTrackById(streamId: string, trackId: string): JitsiRemoteTrack | undefined;
    /**
     *
     * @param {JitsiLocalTrack} localTrack
     */
    getLocalSSRC(localTrack: any): number | undefined;
    /**
     * When doing unified plan simulcast, we'll have a set of ssrcs with the
     * same msid but no ssrc-group, since unified plan signals the simulcast
     * group via the a=simulcast line.  Unfortunately, Jicofo will complain
     * if it sees ssrcs with matching msids but no ssrc-group, so we'll inject
     * an ssrc-group line to make Jicofo happy.
     * @param desc A session description object (with 'type' and 'sdp' fields)
     * @return A session description object with its sdp field modified to
     * contain an inject ssrc-group for simulcast
     */
    _injectSsrcGroupForUnifiedSimulcast(desc: any): any;
    _getSSRC(rtcId: any): {
        /**
         * an array which holds all track's SSRCs
         */
        ssrcs: Array<number>;
        /**
         * an array stores all track's SSRC
         * groups
         */
        groups: {
            /**
             * the SSRC groups semantics
             */
            semantics: string;
            /**
             * group's SSRCs in order where the first
             * one is group's primary SSRC, the second one is secondary (RTX) and so
             * on...
             */
            ssrcs: Array<number>;
        }[];
    } | undefined;
    /**
     * Checks if screensharing is in progress.
     *
     * @returns {boolean}  Returns true if a desktop track has been added to the
     * peerconnection, false otherwise.
     */
    _isSharingScreen(): boolean;
    /**
     * Munges the order of the codecs in the SDP passed based on the preference
     * set through config.js settings. All instances of the specified codec are
     * moved up to the top of the list when it is preferred. The specified codec
     * is deleted from the list if the configuration specifies that the codec be
     * disabled.
     * @param {RTCSessionDescription} description that needs to be munged.
     * @returns {RTCSessionDescription} the munged description.
     */
    _mungeCodecOrder(description: RTCSessionDescription): RTCSessionDescription;
    /**
     * Checks if given track belongs to this peerconnection instance.
     *
     * @param {JitsiLocalTrack|JitsiRemoteTrack} track - The track to be checked.
     * @returns {boolean}
     */
    containsTrack(track: any | JitsiRemoteTrack): boolean;
    /**
     * Add {@link JitsiLocalTrack} to this TPC.
     * @param {JitsiLocalTrack} track
     * @param {boolean} isInitiator indicates if the endpoint is the offerer.
     * @returns {Promise<void>} - resolved when done.
     */
    addTrack(track: any, isInitiator?: boolean): Promise<void>;
    /**
     * Adds local track as part of the unmute operation.
     * @param {JitsiLocalTrack} track the track to be added as part of the unmute
     * operation
     * @return {Promise<boolean>} Promise that resolves to true if the underlying PeerConnection's
     * state has changed and renegotiation is required, false if no renegotiation is needed or
     * Promise is rejected when something goes wrong.
     */
    addTrackUnmute(track: any): Promise<boolean>;
    private _addStream;
    /**
     * Removes WebRTC media stream from the underlying PeerConection
     * @param {MediaStream} mediaStream
     */
    _removeStream(mediaStream: MediaStream): void;
    private _assertTrackBelongs;
    /**
     * Returns the codec that is configured on the client as the preferred video codec.
     * This takes into account the current order of codecs in the local description sdp.
     *
     * @returns {CodecMimeType} The codec that is set as the preferred codec to receive
     * video in the local SDP.
     */
    getConfiguredVideoCodec(): {
        H264: string;
        OPUS: string;
        VP8: string;
        VP9: string;
    };
    /**
     * Sets the codec preference on the peerconnection. The codec preference goes into effect when
     * the next renegotiation happens.
     *
     * @param {CodecMimeType} preferredCodec the preferred codec.
     * @param {CodecMimeType} disabledCodec the codec that needs to be disabled.
     * @returns {void}
     */
    setVideoCodecs(preferredCodec?: {
        H264: string;
        OPUS: string;
        VP8: string;
        VP9: string;
    }, disabledCodec?: {
        H264: string;
        OPUS: string;
        VP8: string;
        VP9: string;
    }): void;
    codecPreference: {
        enable: boolean;
        mediaType: string;
        mimeType: {
            H264: string;
            OPUS: string;
            VP8: string;
            VP9: string;
        };
    } | undefined;
    /**
     * Tells if the given WebRTC <tt>MediaStream</tt> has been added to
     * the underlying WebRTC PeerConnection.
     * @param {MediaStream} mediaStream
     * @returns {boolean}
     */
    isMediaStreamInPc(mediaStream: MediaStream): boolean;
    /**
     * Remove local track from this TPC.
     * @param {JitsiLocalTrack} localTrack the track to be removed from this TPC.
     *
     * FIXME It should probably remove a boolean just like {@link removeTrackMute}
     *       The same applies to addTrack.
     */
    removeTrack(localTrack: any): void;
    /**
     * Returns the sender corresponding to the given media type.
     * @param {MEDIA_TYPE} mediaType - The media type 'audio' or 'video' to be used for the search.
     * @returns {RTPSender|undefined} - The found sender or undefined if no sender
     * was found.
     */
    findSenderByKind(mediaType: any): any | undefined;
    /**
     * Returns the receiver corresponding to the given MediaStreamTrack.
     *
     * @param {MediaSreamTrack} track - The media stream track used for the search.
     * @returns {RTCRtpReceiver|undefined} - The found receiver or undefined if no receiver
     * was found.
     */
    findReceiverForTrack(track: any): RTCRtpReceiver | undefined;
    /**
     * Returns the sender corresponding to the given MediaStreamTrack.
     *
     * @param {MediaSreamTrack} track - The media stream track used for the search.
     * @returns {RTCRtpSender|undefined} - The found sender or undefined if no sender
     * was found.
     */
    findSenderForTrack(track: any): RTCRtpSender | undefined;
    /**
     * Replaces <tt>oldTrack</tt> with <tt>newTrack</tt> from the peer connection.
     * Either <tt>oldTrack</tt> or <tt>newTrack</tt> can be null; replacing a valid
     * <tt>oldTrack</tt> with a null <tt>newTrack</tt> effectively just removes
     * <tt>oldTrack</tt>
     *
     * @param {JitsiLocalTrack|null} oldTrack - The current track in use to be
     * replaced
     * @param {JitsiLocalTrack|null} newTrack - The new track to use
     * @returns {Promise<boolean>} - If the promise resolves with true,
     * renegotiation will be needed. Otherwise no renegotiation is needed.
     */
    replaceTrack(oldTrack: any | null, newTrack: any | null): Promise<boolean>;
    /**
     * Removes local track as part of the mute operation.
     * @param {JitsiLocalTrack} localTrack the local track to be remove as part of
     * the mute operation.
     * @return {Promise<boolean>} Promise that resolves to true if the underlying PeerConnection's
     * state has changed and renegotiation is required, false if no renegotiation is needed or
     * Promise is rejected when something goes wrong.
     */
    removeTrackMute(localTrack: any): Promise<boolean>;
    createDataChannel(label: any, opts: any): RTCDataChannel;
    private _ensureSimulcastGroupIsLast;
    private _adjustLocalMediaDirection;
    /**
     * Munges the stereo flag as well as the opusMaxAverageBitrate in the SDP, based
     * on values set through config.js, if present.
     *
     * @param {RTCSessionDescription} description that needs to be munged.
     * @returns {RTCSessionDescription} the munged description.
     */
    _mungeOpus(description: RTCSessionDescription): RTCSessionDescription;
    setLocalDescription(description: any): Promise<any>;
    /**
     * Enables/disables audio media transmission on this peer connection. When
     * disabled the SDP audio media direction in the local SDP will be adjusted to
     * 'inactive' which means that no data will be sent nor accepted, but
     * the connection should be kept alive.
     * @param {boolean} active <tt>true</tt> to enable audio media transmission or
     * <tt>false</tt> to disable. If the value is not a boolean the call will have
     * no effect.
     * @return {boolean} <tt>true</tt> if the value has changed and sRD/sLD cycle
     * needs to be executed in order for the changes to take effect or
     * <tt>false</tt> if the given value was the same as the previous one.
     * @public
     */
    public setAudioTransferActive(active: boolean): boolean;
    /**
     * Sets the degradation preference on the video sender. This setting determines if
     * resolution or framerate will be preferred when bandwidth or cpu is constrained.
     * Sets it to 'maintain-framerate' when a camera track is added to the pc, sets it
     * to 'maintain-resolution' when a desktop track is being shared instead.
     * @returns {Promise<void>}
     */
    setSenderVideoDegradationPreference(): Promise<void>;
    /**
     * Sets the max bitrate on the RTCRtpSender so that the
     * bitrate of the enocder doesn't exceed the configured value.
     * This is needed for the desktop share until spec-complaint
     * simulcast is implemented.
     * @param {JitsiLocalTrack} localTrack - the local track whose
     * max bitrate is to be configured.
     * @returns {Promise<void>}
     */
    setMaxBitRate(): Promise<void>;
    setRemoteDescription(description: any): Promise<any>;
    /**
     * Changes the resolution of the video stream that is sent to the peer based on
     * the user preferred value. If simulcast is enabled on the peerconection, all the
     * simulcast encodings that have a resolution height lower or equal to the value
     * provided will remain active. For the non-simulcast case, video constraint is
     * applied on the track.
     * @param {number} frameHeight - The user preferred max frame height.
     * @returns {Promise} promise that will be resolved when the operation is
     * successful and rejected otherwise.
     */
    setSenderVideoConstraint(frameHeight?: number): Promise<any>;
    encodingsEnabledState: any;
    /**
     * Enables/disables video media transmission on this peer connection. When
     * disabled the SDP video media direction in the local SDP will be adjusted to
     * 'inactive' which means that no data will be sent nor accepted, but
     * the connection should be kept alive.
     * @param {boolean} active <tt>true</tt> to enable video media transmission or
     * <tt>false</tt> to disable. If the value is not a boolean the call will have
     * no effect.
     * @return {boolean} <tt>true</tt> if the value has changed and sRD/sLD cycle
     * needs to be executed in order for the changes to take effect or
     * <tt>false</tt> if the given value was the same as the previous one.
     * @public
     */
    public setVideoTransferActive(active: boolean): boolean;
    /**
     * Sends DTMF tones if possible.
     *
     * @param {string} tones - The DTMF tones string as defined by {@code RTCDTMFSender.insertDTMF}, 'tones' argument.
     * @param {number} duration - The amount of time in milliseconds that each DTMF should last. It's 200ms by default.
     * @param {number} interToneGap - The length of time in miliseconds to wait between tones. It's 200ms by default.
     *
     * @returns {void}
     */
    sendTones(tones: string, duration?: number, interToneGap?: number): void;
    private _onToneChange;
    /**
     * Makes the underlying TraceablePeerConnection generate new SSRC for
     * the recvonly video stream.
     */
    generateRecvonlySsrc(): void;
    /**
     * Makes the underlying TraceablePeerConnection forget the current primary video
     * SSRC.
     */
    clearRecvonlySsrc(): void;
    /**
     * Closes underlying WebRTC PeerConnection instance and removes all remote
     * tracks by emitting {@link RTCEvents.REMOTE_TRACK_REMOVED} for each one of
     * them.
     */
    close(): void;
    createAnswer(constraints: any): Promise<any>;
    createOffer(constraints: any): Promise<any>;
    _createOfferOrAnswer(isOffer: any, constraints: any): Promise<any>;
    /**
     * Extract primary SSRC from given {@link TrackSSRCInfo} object.
     * @param {TrackSSRCInfo} ssrcObj
     * @return {number|null} the primary SSRC or <tt>null</tt>
     */
    _extractPrimarySSRC(ssrcObj: TrackSSRCInfo): number | null;
    private _processLocalSSRCsMap;
    addIceCandidate(candidate: any): Promise<void>;
    /**
     * Returns the number of simulcast streams that are currently enabled on the peerconnection.
     *
     * @returns {number} The number of simulcast streams currently enabled or 1 when simulcast is disabled.
     */
    getActiveSimulcastStreams(): number;
    /**
     * Obtains call-related stats from the peer connection.
     *
     * @returns {Promise<Object>} Promise which resolves with data providing statistics about
     * the peerconnection.
     */
    getStats(): Promise<Object>;
    /**
     * Generates and stores new SSRC info object for given local track.
     * The method should be called only for a video track being added to this TPC
     * in the muted state (given that the current browser uses this strategy).
     * @param {JitsiLocalTrack} track
     * @return {TPCSSRCInfo}
     */
    generateNewStreamSSRCInfo(track: any): {
        /**
         * an array which holds all track's SSRCs
         */
        ssrcs: Array<number>;
        /**
         * an array stores all track's SSRC
         * groups
         */
        groups: {
            /**
             * the SSRC groups semantics
             */
            semantics: string;
            /**
             * group's SSRCs in order where the first
             * one is group's primary SSRC, the second one is secondary (RTX) and so
             * on...
             */
            ssrcs: Array<number>;
        }[];
    };
    /**
     * Creates a text representation of this <tt>TraceablePeerConnection</tt>
     * instance.
     * @return {string}
     */
    toString(): string;
}
export type SSRCGroupInfo = {
    /**
     * group's SSRCs
     */
    ssrcs: Array<number>;
    semantics: string;
};
export type TrackSSRCInfo = {
    /**
     * track's SSRCs
     */
    ssrcs: Array<number>;
    /**
     * track's SSRC groups
     */
    groups: Array<SSRCGroupInfo>;
};
import RTC from "./RTC";
import * as MediaType from "../../service/RTC/MediaType";
import JitsiRemoteTrack from "./JitsiRemoteTrack";
import { TPCUtils } from "./TPCUtils";
import SdpConsistency from "../sdp/SdpConsistency";
import LocalSdpMunger from "../sdp/LocalSdpMunger";
import RtxModifier from "../sdp/RtxModifier";
