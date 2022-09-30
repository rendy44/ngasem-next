import '../styles/globals.scss'
import {ReactSession} from "react-client-session";
import Head from "next/head"

function MyApp({Component, pageProps}) {
    ReactSession.setStoreType("localStorage");
    return <>
        <Head>
            <title>SMK Negeri Ngasem</title>
        </Head>
        <Component {...pageProps} />
    </>
}

export default MyApp
