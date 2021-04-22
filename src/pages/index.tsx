import { useEffect } from 'react';

export default function Home(props) {

  return (
    <>
      <h1>Index</h1>
      <p>
        {JSON.stringify(props.episodes)}
      </p>
    </>
  )
}

export async function getStaticProps() {

  const response = await fetch('http://localhost:8000/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
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
