import '../styles/globals.scss'
import {ReactSession} from "react-client-session";
import Head from "next/head"
import {useEffect, useState} from "react";
import {helper} from "../services/helper";
import {userService} from "../services/user.service";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {ChakraProvider, extendTheme} from '@chakra-ui/react'

const MySwal = withReactContent(Swal)

function MyApp({Component, pageProps}) {
    ReactSession.setStoreType("localStorage");
    const router = useRouter()
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        if (!isLoaded) {
            const isLogin = helper.isLogin();
            const secretKey = helper.getKey();
            if (isLogin) {
                userService.detail(secretKey)
                    .then(res => {
                        if (res.success) {
                            const {key, name, avatar, username} = res.data.data;
                            helper.setKey(key)
                            helper.setName(name)
                            helper.setAvatar(avatar)
                            helper.setUserName(username)
                            setIsLoaded(true)
                        } else {
                            MySwal.fire({
                                icon: 'info',
                                text: 'Sesi telah habis, silahkan login kembali',
                            })
                                .then(() => {
                                    helper.logOut()
                                    router.push('/login')
                                })
                        }
                    })
                    .catch(() => {
                        MySwal.fire({
                            icon: 'error',
                            title: 'Terjadi Kesalahan',
                            text: 'Pastikan perangkat terhubung ke jaringan, silahkan coba lagi'
                        })
                            .then(() => {
                                helper.logOut()
                                router.push('/login')
                            })
                    })
            }
        }
    }, [])
    const customColors = {
        brand: {
            900: '#1a365d',
            800: '#153e75',
            700: '#2a69ac',
        },
    }
    const theme = extendTheme({customColors})
    return <ChakraProvider theme={theme}>
        <Head>
            <title>SMK Negeri Ngasem</title>
        </Head>
        <Component {...pageProps} />
    </ChakraProvider>
}

export default MyApp
