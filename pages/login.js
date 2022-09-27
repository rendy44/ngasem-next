import loginStyle from '../styles/pages/login.module.scss'
import {Footer, Section} from "../components/global";
import {Login} from "../components/form";
import Image from "next/image";
import loginImg from '../public/login.png'

const LoginPage = () => {
    return <>
        <Section id={'login'} extraClass={loginStyle.login}>
            <div className={loginStyle.wrapper}>
                <div className={loginStyle.illustration}>
                    <Image src={loginImg} alt={'Login illustration'}/>
                </div>
                <div className={loginStyle.form}>
                    <h1>Selamat datang kembali!</h1>
                    <p>Untuk dapat memberikan pelanggaran silahkan masuk menggunakan username dan kata sandi yang sudah
                        didaftarkan</p>
                    <Login/>
                </div>
            </div>
        </Section>
        <Footer/>
    </>
}

export default LoginPage;