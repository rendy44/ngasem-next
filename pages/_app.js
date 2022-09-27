import '../styles/globals.scss'
import {ReactSession} from "react-client-session";

function MyApp({Component, pageProps}) {
    ReactSession.setStoreType("localStorage");
    return <Component {...pageProps} />
}

export default MyApp
