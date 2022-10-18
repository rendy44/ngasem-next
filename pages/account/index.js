import {useEffect, useState} from "react";
import {helper} from "../../services/helper";
import {PageContent} from "../../components/global";
import {Text} from "@chakra-ui/react";
import {PanelPage} from "../../components/account";

const AccountPage = () => {
    const [name, setName] = useState('')
    useEffect(() => {
        setName(helper.getName)
    }, [])
    return <PanelPage title={'Profil'}>
        <Text>Coming soon</Text>
    </PanelPage>
}
export default AccountPage