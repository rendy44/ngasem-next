import {PanelPage} from "../../components/account";
import {useEffect, useState} from "react";
import {helper} from "../../services/helper";
import Styles from '../../styles/pages/account.module.scss'

const AccountPage = () => {
    const [name, setName] = useState('')
    useEffect(() => {
        setName(helper.getName)
    }, [])
    return <PanelPage title={name}>
        <p>Hallo Juragan</p>
    </PanelPage>
}
export default AccountPage