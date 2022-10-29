import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DetailsHeader, Loader, RelatedSongs } from '../components'

import { setActiveSong, playPause } from '../redux/features/playerSlice'

import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore'

const SongDetails = () => {
  const { songid } = useParams()
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid })
  const {data, isFetching: isFetchingRelatedSongs, error} = useGetSongRelatedQuery({songid})

  if(isFetchingRelatedSongs || isFetchingRelatedSongs) return <Loader title={"Buscando detalhes da musica"} />

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }

  if(error) return <Error />

    

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl ">Lyrics: </h2>

        <div className="mt-24">
          {songData?.sections[1].type === 'LYRICS'?
          songData?.sections[1].text.map((line, i) => (
            <p className='text-base text-gray-300 my-1'>{line}</p>
            ))
          : <p className='text-base text-gray-300 my-1'>Desculpe, mas não temos a letra da musica</p>}
        </div>
      </div>

      <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} />
    </div>
  )
}
export default SongDetails
