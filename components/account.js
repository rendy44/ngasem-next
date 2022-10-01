import {Footer, Section, TopNav} from "./global";
import PropTypes from "prop-types";
import Styles from '../styles/account.module.scss'
import Link from "next/link";

const PanelPage = props => {
    return <>
        <TopNav/>
        <Section id={'account_panel'} title={props.title} extraClass={Styles.account_panel}>
            <div className={'frow'}>
                <div className={'col-sm-1-3'}>
                    <div className={Styles.side_wrapper}>
                        <ul>
                            <li>
                                <Link href={'/account/submit'}>
                                    <a>Laporkan Pelanggaran</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/account'}>
                                    <a>Profile</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/account/setting'}>
                                    <a>Pengaturan</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={'col-sm-2-3'}>
                    <div className={Styles.content_wrapper}>
                        {props.children}
                    </div>
                </div>
            </div>
        </Section>
        <Footer/>
    </>
}
PanelPage.propTypes = {
    title: PropTypes.string.isRequired
}
export {PanelPage}