/**
 * Handles local tracks.
 * @param tracks Array with JitsiTrack objects
 */
declare function onLocalTracks(tracks: any): void;
/**
 * Handles remote tracks
 * @param track JitsiTrack object
 */
declare function onRemoteTrack(track: any): void;
/**
 * That function is executed when the conference is joined
 */
declare function onConferenceJoined(): void;
/**
 *
 * @param id
 */
declare function onUserLeft(id: any): void;
/**
 * That function is called when connection is established successfully
 */
declare function onConnectionSuccess(): void;
/**
 * This function is called when the connection fail.
 */
declare function onConnectionFailed(): void;
/**
 * This function is called when the connection fail.
 */
declare function onDeviceListChanged(devices: any): void;
/**
 * This function is called when we disconnect.
 */
declare function disconnect(): void;
/**
 *
 */
declare function unload(): void;
/**
 *
 */
declare function switchVideo(): void;
/**
 *
 * @param selected
 */
declare function changeAudioOutput(selected: any): void;
declare namespace options {
    namespace hosts {
        const domain: string;
        const muc: string;
    }
    const bosh: string;
    const clientNode: string;
}
declare const confOptions: {};
declare let connection: any;
declare let isJoined: boolean;
declare let room: any;
declare let localTracks: any[];
declare const remoteTracks: {};
declare let isVideo: boolean;
declare namespace initOptions {
    const disableAudioLevels: boolean;
}
