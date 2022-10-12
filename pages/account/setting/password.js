import {Alert, AlertIcon, Text} from "@chakra-ui/react";
import {PanelPage} from "../../../components/account";
import {ChangePassword} from "../../../components/form";

const SettingPasswordPage = () => {
    return <PanelPage title={'Pengaturan'} subtitle={'Kata sandi'}>
        <Alert status={'info'} mb={6}>
            <AlertIcon/>Perbaharui kata sandi Anda secara berkala agar akun tetap aman.</Alert>
        <ChangePassword/>
    </PanelPage>
}
export default SettingPasswordPage