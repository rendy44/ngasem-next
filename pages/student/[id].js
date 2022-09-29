import {Footer, Loader, Section} from "../../components/global";
import {dataService} from "../../services/data.service";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Styles from '../../styles/pages/student.module.scss'
import logoSmk from '../../public/graduating-student.png'
import Image from "next/image";
import Link from "next/link";

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
    const studentContent = isLoaded ? <div className={Styles.detail_wrapper}>
        <div className={'frow'}>
            <div className={'col-md-2-3'}>
                <div className={Styles.hero}>
                    <div className={Styles.cover}>
                        <Link href={'/'}>
                            <a className={Styles.back}><span></span> Kembali</a>
                        </Link>
                        <span className={Styles.alt}>Photo by iam_os on Unsplash</span>
                    </div>
                    <div className={Styles.profile}>
                        <div className={Styles.profile_image}>
                            <Image src={logoSmk} className={Styles.img}/>
                        </div>
                        <div className={Styles.profile_info}>
                            <h1 className={Styles.name}>{data.name}</h1>
                            <p className={Styles.grade}>{data.grade}</p>
                        </div>
                    </div>
                </div>
                <div className={Styles.detail}>
                    <h2>Informasi</h2>
                    <div className={Styles.details_wrapper}>
                        <div className={Styles.detail_item}>
                            <label htmlFor="name">Nama lengkap</label>
                            <span id="name">{data.name}</span>
                        </div>
                        <div className={Styles.detail_item}>
                            <label htmlFor="nis">NIS</label>
                            <span id="nis">{data.nis}</span>
                        </div>
                        <div className={Styles.detail_item}>
                            <label htmlFor="grade">Kelas</label>
                            <span id="grade">{data.grade}</span>
                        </div>
                        {parseInt(data.point) > 0 ? <div className={Styles.detail_item}>
                            <label htmlFor="point">Poin terakumulasi</label>
                            <span id="point">{data.point} poin</span>
                        </div> : <></>}
                    </div>
                </div>
                <div className={Styles.penalties}>
                    <h2>Pelanggaran</h2>
                    <div className={Styles.penalties_wrapper}>
                        {data.penalties ?
                            Object.entries(data.penalties).map((penalty, i) => {
                                return <div className={Styles.detail_item} key={i}>
                                    <div className={Styles.item_top}>
                                        <span>Oleh <strong>{penalty[1].teacher}</strong> pada {penalty[1].date} sebesar {penalty[1].point} poin</span>
                                    </div>
                                    {penalty[1].description ?
                                        <div className={Styles.item_body}>
                                            <blockquote><p>{penalty[1].description}</p></blockquote>
                                        </div> : <></>}
                                    <div className={Styles.item_bottom}>
                                        <ul>
                                            <li>{penalty[1].penalty}</li>
                                        </ul>
                                    </div>
                                </div>
                            })
                            : <p className={Styles.empty}>Belum ada pelanggaran yang tercatat</p>}
                    </div>
                </div>
            </div>
        </div>
    </div> : <Loader/>
    return (
        <>
            <Section id={'studentDetail'} extraClass={isLoaded ? `${Styles.student} ${Styles.loaded}` : Styles.student}>
                {studentContent}
            </Section>
            <Footer/>
        </>
    )
}

export default StudentDetailPage