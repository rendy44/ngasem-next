import {Footer, Section, TopNav} from "../components/global";
import {SubmitPenalty} from "../components/form";
import {useEffect, useState} from "react";
import {helper} from "../services/helper";
import {useRouter} from "next/router";

const SubmitPage = () => {
    const router = useRouter()
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        if (!isLoaded) {
            setIsLoaded(true)
        } else {
            if (!helper.isLogin()) {
                router.push('/login')
            }
        }
    }, [isLoaded])
    return <>
        <TopNav/>
        <Section id={'submit'} title={'Laporkan Pelanggaran'} isTitleCenter={true}>
            <div className={'frow'}>
                <div className={'col-sm-2-3 col-md-1-2'}>
                    <SubmitPenalty/>
                </div>
            </div>
        </Section>
        <Footer/>
    </>
}

export default SubmitPage