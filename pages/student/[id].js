import {Footer, Loader, Section, TopNav} from "../../components/global";
import {dataService} from "../../services/data.service";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Styles from '../../styles/pages/student.module.scss'

const StudentDetailPage = () => {
    const router = useRouter();
    const {id} = router.query
    const [data, setData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        if (!isLoaded) {
            if (id !== undefined) {
                dataService.getStudentDetail(id)
                    .then(res => {
                        if (res.success) {
                            setData(res.data.data)
                            setIsLoaded(true)
                        } else {
                            router.push('/404')
                        }
                    })
            }
        }
    })
    const studentContent = isLoaded ? <></> : <Loader/>
    return (
        <>
            <TopNav/>
            <Section id={'studentDetail'} extraClass={Styles.student}>
                {studentContent}
            </Section>
            <Footer/>
        </>
    )
}

export default StudentDetailPage