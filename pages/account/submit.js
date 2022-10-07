import {SubmitPenalty} from "../../components/form";
import {useEffect, useState} from "react";
import {helper} from "../../services/helper";
import {useRouter} from "next/router";
import Styles from '../../styles/pages/submit.module.scss'
import {PanelPage} from "../../components/account";
import {PageContent} from "../../components/global";

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
    return <PageContent id={'submit'}>
        <SubmitPenalty/>
    </PageContent>
}

export default SubmitPage