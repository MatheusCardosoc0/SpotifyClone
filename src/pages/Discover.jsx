import { SongCard, Error, Loader } from '../components'
import { genres } from '../assets/constants'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'
import { useDispatch, useSelector } from 'react-redux'

const Discover = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const genreTitle = 'Pop'

  const { data, isFetching, error } = useGetTopChartsQuery()
  console.log(data)

  if (isFetching) return <Loader title="Carregando musicas..." />

  if (error) return <Error />

  return (
    <div className="flex flex-col">
      <div>
        <div className="flex justify-between w-full flex-col sm:flex-row mt-4 mb-10 items-center">
          <h2 className="font-bold text-white text-3xl text-left">
            Descobrir {genreTitle}
          </h2>
          <select
            className="bg-black sm:mt-0 text-gray-200 p-3 text-sm rounded-lg outline-none"
            onChange={() => {}}
            value={''}
          >
            {genres.map(genre => (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {data?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Discover
