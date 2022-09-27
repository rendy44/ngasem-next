import {Footer, Section} from "../components/global";
import {useEffect, useState} from "react";

const SubmitPage = props => {
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        if (!isLoaded) {

        }
    }, [isLoaded])
    return <>
        <Section id={'submit'}>
            <p>Hallo Gess</p>
        </Section>
        <Footer/></>
}

export default SubmitPage