import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from "next/head";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (<>

    <Head>
      <script
          type="text/javascript"
          src={"https://maps.googleapis.com/maps/api/js?key=AIzaSyAOPXPtW9ZSRH_F5tliPUID9Ph2mXi97Kg&libraries=places"}
      />
      <title>commutio</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  <body
      className="main"
      // style={style}
  >

  <Component {...pageProps} />
  </body>
    </>)
}

export default MyApp
