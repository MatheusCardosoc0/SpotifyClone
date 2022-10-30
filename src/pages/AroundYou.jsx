import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { SongCard } from '../components'
import Error from '../components/Error'
import Loader from '../components/Loader'

import { useGetSongsByCountryQuery } from '../redux/services/shazamCore'

const AroundYou = () => {
  const [Country, setCountry] = useState('')
  const [Loading, setLoading] = useState(true)
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetSongsByCountryQuery(Country)

  console.log(Country)

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_DiWQlX7I7RISMoQp2Ido8N0AopmfW&ipAddress=8.8.8.8`
      )
      .then(res => setCountry(res.data?.location?.country))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
    //at_DiWQlX7I7RISMoQp2Ido8N0AopmfW
  }, [Country])

  if (isFetching && Loading)
    return <Loader title={'Carregando musicas indicadas a você'} />

  if (error && Country) return <Error />

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Recomendações a você <span className='font-black'>{Country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            activeSong={activeSong}
            data={data}
            i={i}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  )
}

export default AroundYou
