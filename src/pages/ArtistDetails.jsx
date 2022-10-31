import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'

import { setActiveSong, playPause } from '../redux/features/playerSlice'

import {
  useGetSongDetailsQuery, useGetSongRelatedQuery
} from '../redux/services/shazamCore'

import {useGetArtistDetailsQuery } from '../redux/services/shazamCore'

const ArtistDetails = () => {
  const { id: artistId } = useParams()
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error
  } = useGetArtistDetailsQuery(artistId)

  if (isFetchingArtistDetails)
    return <Loader title={'Buscando dados do artista'} />

  if (error) return <Error />

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  )
}
export default ArtistDetails
