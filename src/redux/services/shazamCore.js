/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: headers => {
      headers.set(
        'X-RapidAPI-Key',
        'ea0449d5c3mshb8da099b7086a67p1001b4jsn64811e335890'
      )

      return headers
    }
  }),
  endpoints: builder => ({
    getTopCharts: builder.query({ query: () => `/charts/world` }),

    getSongDetails: builder.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`
    })
  })
})

export const { useGetTopChartsQuery, useGetSongDetailsQuery } = shazamCoreApi
