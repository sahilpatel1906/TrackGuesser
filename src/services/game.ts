import GameState from "src/types/GameState";
import fetchFromSpotify from "./api";
import Track from "src/types/Track";

interface SpotifyTrack {
  artists: [{name: string}]|null
  album: {images: [{url: string, width: number, height: number}], href: string, name: string}|null
  href: string|null
  preview_url: string|null
  name: string|null
  uri: string
}

const validateTrack = (track: SpotifyTrack): boolean => {
  if(!track) return false
  if(!track.uri) return false
  if(!track.artists || track.artists.length < 1 || !track.artists[0].name) return false
  if(!track.album || !track.album.name || !track.album.images || track.album.images.length < 1) return false
  if(!track.preview_url) return false
  if(!track.name) return false
  return true
}

const convertTrack = (track: SpotifyTrack): Track => {
  return {
    href: track.href!,
    title: track.name!,
    artist: track.artists!.map((artists)=>artists.name),
    album: track.album!.name,
    albumArt: track.album!.images[0].url,
    previewUrl: track.preview_url!
  }
}

export const generateGame = async (token: string, playlistUrl: string): Promise<GameState> => {
  const regx = new RegExp("^https:\/\/open.spotify.com\/playlist\/([a-z0-9]+)","i")
  const matches = regx.exec(playlistUrl)
  if(matches != null && matches.length > 1) {
    const playlistData = await fetchFromSpotify({token, endpoint: `playlists/${matches[1]}`, params: {fields: 'tracks(items(track(uri,name,href,album(name,href,images),artists(name),preview_url)))'}})
    console.log(playlistData)
    const tracks = <SpotifyTrack[]>playlistData.tracks.items.map((item:any)=>item.track)
    console.log(tracks)
    const validTracks: SpotifyTrack[] = tracks.filter((t)=>validateTrack(t)).reduce<SpotifyTrack[]>((acc, track) => {
      // Check if the track's URI is already in the accumulator
      if (!acc.some(existingTrack => existingTrack.uri === track.uri)) {
        acc.push(track);
      }
      return acc;
    }, [])
    console.log(validTracks)
    if(validTracks.length < 4) {
      throw new Error("Invalid Playlist - Not enough tracks!")
    }
    // Shuffle the array
    for (let i = validTracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [validTracks[i], validTracks[j]] = [validTracks[j], validTracks[i]];
    }
    return {
      mode: <"easy"|"normal"|"hard">localStorage.getItem("mode") ?? 'normal',
      round: 1,
      score: 0,
      tracks: validTracks.slice(0,5).map(convertTrack),
      roundState: {
        albumHint: false,
        artistHint: false,
        titleHint: false,
        artistGuessed: false,
        songGuesses: 0,
        artistGuessComplete: false,
        titleGuessed: false,
        ended: false
      },
      autofillTitles: <string[]>validTracks.map((track)=>track.name)
    }
  } else {
    throw new Error("Invalid Playlist Format")
  }
}