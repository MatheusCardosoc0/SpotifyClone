import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; 
import { DetailsHeader } from "../components";

import {setActiveSong, playPause} from '../redux/features/playerSlice'

import {useGetSongDetailsQuery} from '../redux/services/shazamCore'

const SongDetails = () => {
  const {songid} = useParams()
  const dispatch = useDispatch()
  const {activeSong, isPlaying } = useSelector((state) => state.player)
  const {data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({songid})


  return (
    <div className="flex flex-col">
      {/*<DetailsHeader artistId={artistId} songData={songData} />*/}

      <div className="mb-10">
        <h2 className="text-white text-3xl ">Lyrics: </h2>

        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICK' ? 
          songData?.sections[1].text.map((Line, i) => (
            <p>{Line}</p>
          )) : <p>Desculpe, não há letra da musica.</p>}
        </div>
      </div>
    </div>

  )
}
export default SongDetails;
