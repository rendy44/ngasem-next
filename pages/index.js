import {Footer, Section, TopNav} from "../components/global";
import {Search} from "../components/form";
import Logo from '../public/logo.jpg'
import Styles from '../styles/pages/index.module.scss'
import Image from "next/image";

const IndexPage = () => {
    return <>
        <TopNav/>
        <Section id={'search'} extraClass={Styles.main_page}>
            <div className={'frow'}>
                <div className={'col-sm-2-3 col-md-1-2'}>
                    <div className={Styles.logo_wrapper}>
                        <Image alt={'Logo'} src={Logo}/>
                    </div>
                    <div>
                        <Search/>
                    </div>
                </div>
            </div>
        </Section>
        <Footer/>
    </>
}

export default IndexPage;