import '../styles/globals.scss'
import {ReactSession} from "react-client-session";
import Head from "next/head"
import {useEffect, useState} from "react";
import {helper} from "../services/helper";
import {userService} from "../services/user.service";

function MyApp({Component, pageProps}) {
    ReactSession.setStoreType("localStorage");
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        if (!isLoaded) {
            const isLogin = helper.isLogin();
            const secretKey = helper.getKey();
            if (isLogin) {
                userService.detail(secretKey)
                    .then(res => {
                        if (res.success) {
                            const {key, name, avatar} = res.data.data;
                            helper.setKey(key)
                            helper.setName(name)
                            helper.setAvatar(avatar)
                            setIsLoaded(true)
                        }
                    })
            }
        }
    }, [])
    return <>
        <Head>
            <title>SMK Negeri Ngasem</title>
        </Head>
        <Component {...pageProps} />
    </>
}

export default MyApp
