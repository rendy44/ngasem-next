// import {PanelPage} from "../../components/account";
import {useEffect, useState} from "react";
import {helper} from "../../services/helper";
// import Styles from '../../styles/pages/account.module.scss'
import {PageContent} from "../../components/global";

const AccountPage = () => {
    const [name, setName] = useState('')
    useEffect(() => {
        setName(helper.getName)
    }, [])
    return <PageContent id={'submit'}>
        <p>Hallo Juragan</p>
    </PageContent>
}
export default AccountPage