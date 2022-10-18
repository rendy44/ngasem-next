import {useRouter} from "next/router";

const SettingAccountPage = () => {
    const router = useRouter()
    router.push('/account/setting/password')
    return <></>
}
export default SettingAccountPage