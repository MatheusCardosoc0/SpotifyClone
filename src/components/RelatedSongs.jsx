import SongBar from "./SongBar";

const RelatedSongs = ({data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId}) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Musicas relacionadas:</h1>

      <div>
        {data?.map((song, i) => (
          <SongBar key={`${song.key}-${artistId}`}
          song={song}
          i={i}
          artistId={artistId}
          activeSong={activeSong}
          isPlaying={isPlaying}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}  />
        ))}
      </div>
    </div>
  )
}

export default RelatedSongs;
