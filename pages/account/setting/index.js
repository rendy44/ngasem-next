import {useRouter} from "next/router";

const SettingPage = () => {
    const router = useRouter()
    router.push('/account/setting/password')
    return <></>
}
export default SettingPage