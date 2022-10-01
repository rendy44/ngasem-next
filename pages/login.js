import loginStyle from '../styles/pages/login.module.scss'
import {Footer, Section, TopNav} from "../components/global";
import {Login} from "../components/form";
import Image from "next/image";
import loginImg from '../public/login.png'

const LoginPage = () => {
    return <>
        <TopNav/>
        <Section id={'login'} extraClass={loginStyle.login}>
            <div className={loginStyle.wrapper}>
                <div className={loginStyle.illustration}>
                    <Image src={loginImg} alt={'Login illustration'}/>
                </div>
                <div className={loginStyle.form}>
                    <h1>Selamat datang kembali!</h1>
                    <p>Untuk dapat mencatatkan pelanggaran silahkan masuk menggunakan nama pengguna dan kata sandi yang sudah
                        didaftarkan.</p>
                    <Login/>
                </div>
            </div>
        </Section>
        <Footer/>
    </>
}

export default LoginPage;