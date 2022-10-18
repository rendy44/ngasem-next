const SettingAccountPage = ({props}) => {
    return <></>
}

export const getServerSideProps = async () => {
    return {
        redirect: {
            permanent: true,
            destination: '/account/setting/password'
        }
    }
}
export default SettingAccountPage