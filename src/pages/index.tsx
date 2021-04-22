import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { api } from '../services/api';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  members: string;
  description: string;
  duration: number;
  duration_as_string: string;
  url: string;
  published_at: string;
  //...
}

type HomeProps = {
  episodes: Array<Episode>
  //episodes:Episode[] -> equivale
}

export default function Home(props: HomeProps) {

  return (
    <>
      <h1>Index</h1>
      <p>
        {JSON.stringify(props.episodes)}
      </p>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await api.get('episodes', {
    params: {
      limits: 12,
      order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      published_at: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      duration: Number(episode.file.duration),
      duration_as_string: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
  })


  return {
    props: {
      episodes,
    },
    revalidate: 28800,

  }
}

/* export async function getServerSideProps() {

  const response = await fetch('http://localhost:8000/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    }
  }
} */

/* missaoespacial */

/* SPA - Single PA */
/* SSR - Server Side Rendering -> executa js na camada do servidor, portanto os dados são transferidos para o cliente após serem processados na camada do servidor */
/* SSG - Static Site Generator -> salva uma versão estática do html a cada período de tempo estabelecido no argumento da função */
