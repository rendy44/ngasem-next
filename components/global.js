import PropTypes from "prop-types";
import Styles from '../styles/global.module.scss'
import ReactLoading from "react-loading";
import Link from "next/link";
import {useEffect, useState} from "react";
import {helper} from "../services/helper";
import MySwal from "sweetalert2";
import {useRouter} from "next/router";
import Image from "next/image";
import Logo from '../public/icons/logo192.png'

const TopNav = () => {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [username, setUsername] = useState('')
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isSticky, setIsSticky] = useState(false)
    const stickyNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY
            setIsSticky(windowHeight > 80)
        }
    }
    useEffect(() => {
        if (!isLogin) {
            setIsLogin(helper.isLogin)
        } else {
            setName(helper.getName)
            setAvatar(helper.getAvatar)
            setUsername(helper.getUserName)
        }
        window.addEventListener('scroll', stickyNavbar);

        return () => {
            window.removeEventListener('scroll', stickyNavbar);
        };
    }, [isLogin])
    const simpleStyle = {
        backgroundImage: `url(${avatar})`,
    }
    const navButtons = !isLogin ? ('/login' !== router.pathname ?
            <Link href={'/login'}><a className={Styles.button_login}>Masuk</a></Link> : <></>) :
        <div className={isNavOpen ? Styles.nav_wrapper : `${Styles.nav_wrapper} ${Styles.nav_close}`}>
            <div className={Styles.profile_nav_wrapper}>
                <div className={Styles.profile_info} style={simpleStyle}/>
                <span className={Styles.profile_name} onClick={(e) => {
                    e.preventDefault();
                    setIsNavOpen(!isNavOpen)
                }}>{username}</span>
            </div>
            <div className={Styles.nav_box}>
                <div className={Styles.nav_profile_wrapper}>
                    <div className={Styles.nav_profile} style={simpleStyle}></div>
                    <Link href={'/account'}>
                        <p>{name}
                            <span>@{username}</span>
                        </p>
                    </Link>
                </div>
                <div className={Styles.nav_list}>
                    <ul>
                        <li>
                            <Link href={'/account/submit'}>
                                <a>Catat<span>Catat dan laporkan pelanggaran siswa</span></a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/account'}>
                                <a>Profil<span>Lihat detail profil and pelanggaran yang sudah tercatat</span></a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/account/setting'}>
                                <a>Pengaturan<span>Perbaharui profil dan kata sandi</span></a>
                            </Link>
                        </li>
                        <li>
                            <span onClick={() => {
                                MySwal.fire({
                                    icon: 'question',
                                    title: 'Konfirmasi',
                                    text: `Anda masuk sebagai ${helper.getName()}, yakin ingin keluar?`,
                                    confirmButtonText: 'Iya, keluar',
                                    showCancelButton: true,
                                    cancelButtonText: 'Batal'
                                })
                                    .then(res => {
                                        if (res.isConfirmed) {
                                            helper.logOut()
                                            setIsLogin(false)
                                            router.push('/login')
                                        }
                                    })
                            }}>Keluar
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    return <div className={Styles.top_nav_wrapper}>
        <div className={isSticky ? `${Styles.top_nav} ${Styles.sticky}` : Styles.top_nav}>
            <div className={'frow-container'}>
                <div className={Styles.cols_wrapper}>
                    <div className={Styles.logo_wrapper}>
                        {'/' !== router.pathname ? <Link href={'/'}>
                            <a className={Styles.link_home}>
                                <Image src={Logo} width={32} height={32}/>
                                <span className={Styles.logo_name}>SMK Negeri<br/>Ngasem</span>
                            </a>
                        </Link> : <></>}
                    </div>
                    <div className={Styles.button_wrapper}>
                        {navButtons}
                    </div>
                </div>
            </div>
        </div>
        {isLogin && '/account/submit' !== router.pathname ?
            <div className={Styles.float_bottom}><Link href={'/account/submit'}><a
                className={Styles.block_a}></a></Link></div> : <></>}
    </div>
}
const Section = (props) => {
    const elmClass = Styles.section
    return (
        <div className={props.extraClass ? `${elmClass} ${props.extraClass}` : elmClass}>
            <div className={'frow-container'}>
                <div className={Styles.inner}>
                    {props.title && <div className={props.isTitleCenter ? 'frow text-center' : 'frow row-start'}>
                        <div className={'col-sm-2-3'}><h2 className={Styles.title}>{props.title}</h2></div>
                    </div>}
                    {props.children}
                </div>
            </div>
        </div>
    )
}
const Footer = (props) => {
    return (
        <footer className={Styles.footer}>
            <div className={'frow-container'}>
                <div className={Styles.p_wrapper}>
                    <p>&copy; 2022 SMK Negeri Ngasem. All rights reserved</p>
                    {props.children}
                </div>
            </div>
        </footer>
    )
}
const HeadingTitle = props => {
    const centerClass = props.isCenter ? 'text-center' : '';
    return <div className={`${Styles.title} ${centerClass}`}>
        <h1>{props.title}</h1>
    </div>
}
const Info = props => {
    return <p className={Styles.info}>{props.children}</p>
}
const Loader = () => {
    return <div className={'frow'}>
        <ReactLoading type={'spokes'} color={'#773377'} height={64} width={64}/>
    </div>
}

Section.propTypes = {
    id: PropTypes.string.isRequired,
    extraClass: PropTypes.string,
    title: PropTypes.string,
    isTitleCenter: PropTypes.bool,
}
HeadingTitle.propTypes = {
    title: PropTypes.string.isRequired,
    isCenter: PropTypes.bool
}

export {TopNav, Section, HeadingTitle, Footer, Info, Loader}