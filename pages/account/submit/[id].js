import {SubmitPenalty} from "../../../components/form";
import {useEffect, useState} from "react";
import {helper} from "../../../services/helper";
import {useRouter} from "next/router";
import {PageContent} from "../../../components/global";
import {Heading} from "@chakra-ui/react";

const SubmitPage = () => {
    const router = useRouter()
    const [isLoaded, setIsLoaded] = useState(false)
    const [name, setName] = useState('')
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
        <Heading mb={9} as={'h1'}>Catat Pelanggaran</Heading>
        <SubmitPenalty studentId={parseInt(router.query.id)}/>
    </PageContent>
}

export default SubmitPage