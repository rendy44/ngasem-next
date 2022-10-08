import {ReactSession} from "react-client-session";
import Head from "next/head"
import {useEffect, useState} from "react";
import {helper} from "../services/helper";
import {userService} from "../services/user.service";
import {useRouter} from "next/router";
import {ChakraProvider, useToast} from '@chakra-ui/react'

function MyApp({Component, pageProps}) {
    ReactSession.setStoreType("localStorage");
    const router = useRouter()
    const toast = useToast()
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
                            toast({
                                title: 'Sesi habis',
                                description: 'Anda akan dialihkan, silahkan login kembali',
                                status: 'warning',
                                position: 'top-right',
                                duration: 5000,
                                isClosable: true,
                                onCloseComplete: () => {
                                    helper.logOut()
                                    router.push('/login')
                                }
                            })
                        }
                    })
                    .catch(() => {
                        toast({
                            title: 'Terjadi kesalahan',
                            description: 'Pastikan perangkat terhubung ke jaringan, silahkan coba lagi',
                            status: 'error',
                            position: 'top-right',
                            duration: 5000,
                            isClosable: true,
                            onCloseComplete: () => {
                                helper.logOut()
                                router.push('/login')
                            }
                        })
                    })
            }
        }
    }, [])
    return <ChakraProvider>
        <Head>
            <title>SMK Negeri Ngasem</title>
        </Head>
        <Component {...pageProps} />
    </ChakraProvider>
}

export default MyApp
