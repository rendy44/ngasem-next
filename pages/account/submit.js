import {SubmitPenalty} from "../../components/form";
import {useEffect, useState} from "react";
import {helper} from "../../services/helper";
import {useRouter} from "next/router";
import {PageContent} from "../../components/global";
import {Heading} from "@chakra-ui/react";

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
    return <PageContent id={'submit'} flowFromStart={true}>
        <Heading mb={6} as={'h1'}>Catat Pelanggaran</Heading>
        <SubmitPenalty/>
    </PageContent>
}

export default SubmitPage