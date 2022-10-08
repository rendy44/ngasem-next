import {useEffect, useState} from "react";
import {helper} from "../../services/helper";
import {PageContent} from "../../components/global";
import {Text} from "@chakra-ui/react";

const AccountPage = () => {
    const [name, setName] = useState('')
    useEffect(() => {
        setName(helper.getName)
    }, [])
    return <PageContent id={'submit'} flowFromStart={true}>
        <Text>Coming soon</Text>
    </PageContent>
}
export default AccountPage