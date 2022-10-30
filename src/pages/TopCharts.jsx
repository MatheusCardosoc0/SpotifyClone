import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { SongCard } from '../components'
import Error from '../components/Error'
import Loader from '../components/Loader'

import { useGetTopChartsQuery } from '../redux/services/shazamCore'

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data, isFetching, error } = useGetTopChartsQuery()


  if (isFetching) return <Loader title={'Carregando melhores musicas'} />

  if (error) return <Error />

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Descubra
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

export default TopCharts