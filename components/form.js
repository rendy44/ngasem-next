import {useRouter} from 'next/router'
import Styles from '../styles/form.module.scss';
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {userService} from "../services/user.service";
import {helper} from "../services/helper";
import {dataService} from "../services/data.service";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {Info, Loader} from "./global";
import {penaltyService} from "../services/penalty.service";
import Link from "next/link";

const MySwal = withReactContent(Swal)

const Login = () => {
    const router = useRouter()
    const [isDisabled, setIsDisabled] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [buttonLabel, setButtonLabel] = useState('Masuk');
    const onSubmit = data => {
        setIsDisabled(true)
        setButtonLabel('Loading...')
        const {username, password} = data
        userService.login(username, password)
            .then(res => {
                if (res.success) {
                    helper.setKey(res.data.data.key)
                    helper.setName(res.data.data.name)

                    // Reload to the panel route.
                    router.push('/submit')
                } else {
                    MySwal.fire({
                        icon: "error",
                        html: res.data.data,
                    })
                    setButtonLabel('Masuk')
                    setIsDisabled(false)
                }
            })
            .catch(() => {
                setIsDisabled(false)
                setButtonLabel('Masuk')
                MySwal.fire({
                    icon: 'error',
                    text: 'Terjadi kesalahan, pastikan perangkat terhubung ke jaringan.'
                })
            })
    }
    return <form onSubmit={handleSubmit(onSubmit)} className={Styles.form}>
        <div className={Styles.fields}>
            <div className={Styles.field}>
                <label>Username
                    <input type="text" {...register("username", {required: true})}/>
                </label>
            </div>
            <div className={Styles.field}>
                <label>Password
                    <input type="password" {...register("password", {required: true})}/>
                </label>
            </div>
        </div>
        <div className="frow justify-around">
            <button disabled={errors.username || errors.password || isDisabled}
                    className={Styles.button} type="submit">{buttonLabel}
            </button>
            <Link href={'/'}>
                <a className={`${Styles.button} ${Styles.clear}`}>Kembali</a>
            </Link>
        </div>
    </form>
}
const SubmitPenalty = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isBusy, setIsBusy] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [buttonLabel, setButtonLabel] = useState('Kirim')
    const [categories, setCategories] = useState([])
    const [selectedCategoryId, setSelectedCategoryId] = useState('')
    const [scores, setScores] = useState([])
    const [isScoreDisabled, setIsScoreDisabled] = useState(true)
    const [selectedGradeId, setSelectedGradeId] = useState('')
    const [gradeMajors, setGradeMajors] = useState([])
    const [isMajorDisabled, setIsMajorDisabled] = useState(true)
    const [students, setStudents] = useState([])
    const [isStudentDisabled, setIsStudentDisabled] = useState(true)
    const [currentDescription, setCurrentDescription] = useState('')
    const [selectedCategoryName, setSelectedCategoryName] = useState('')
    const [selectedScorePoint, setSelectedScorePoint] = useState(0)
    const [selectedScoreName, setSelectedScoreName] = useState('')
    const [selectedMajorName, setSelectedMajorName] = useState('')
    const [selectedStudentName, setSelectedStudentName] = useState('')
    const checkConnection = () => {
        if (!isBusy) {
            setIsBusy(true)
            setIsLoaded(false)
            dataService.getCategories()
                .then(res => {
                    if (res.success) {
                        setCategories(Object.entries(res.data.data))
                        setIsLoaded(true)
                    }
                    setIsBusy(false)
                })
                .catch(() => {
                    setIsLoaded(true)
                    setIsBusy(false)
                    MySwal.fire({
                        icon: 'error',
                        text: 'Terjadi kesalahan, pastikan perangkat terhubung ke jaringan.',
                        confirmButtonText: 'Coba Lagi',
                    })
                        .then(() => {
                            checkConnection()
                        })
                })
        }
    }
    // const []
    useEffect(() => {
        if (!isBusy && !isLoaded) {
            checkConnection();
        }
    })
    const onSubmit = data => {
        const {score, student, description} = data
        const currentTeacherName = helper.getName()
        MySwal.fire({
            text: `Dengan melanjutkan, saya ${currentTeacherName} menyatakan secara sadar berhak memberikan pelanggarakn kepada ${selectedStudentName} selaku siswa ${selectedMajorName}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'Lanjutkan'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsDisabled(true)
                setButtonLabel('Loading...')
                const secretKey = helper.getKey();
                penaltyService.send(secretKey, score, student, description)
                    .then((res) => {
                        let notifType = 'error';
                        if (res.success) {
                            notifType = 'success';

                            // Let's reset everything.
                            setSelectedCategoryId('')
                            setScores([])
                            setIsScoreDisabled(true)
                            setSelectedGradeId('')
                            setGradeMajors([])
                            setIsMajorDisabled(true)
                            setStudents([])
                            setIsStudentDisabled(true)
                            setCurrentDescription('')
                            setSelectedCategoryName('')
                            setSelectedScorePoint(0)
                            setSelectedScoreName('')
                            setSelectedStudentName('')
                        }

                        MySwal.fire({
                            icon: notifType,
                            text: res.data.data,
                        })
                        setIsDisabled(false)
                        setButtonLabel('Kirim')
                    })
                    .catch(err => {
                        setIsDisabled(false)
                        setButtonLabel('Kirim')
                    })
            }
        })
    }
    const onCategoryChange = e => {
        const currentCategory = e.target.value
        setIsScoreDisabled(true)
        setScores([])
        setSelectedCategoryName('')
        setSelectedScorePoint(0)
        setSelectedScoreName('')
        setSelectedCategoryId(currentCategory)
        if (currentCategory) {
            setSelectedCategoryName(e.target.selectedOptions[0].label)
            dataService.getScores(currentCategory)
                .then((res) => {
                    if (res.success) {
                        // const objArr = Object.entries(res.data)
                        setScores(Object.entries(res.data.data))
                        setIsScoreDisabled(false)
                    }
                })
        }
    }
    const onScoreChange = e => {
        let newScorePoint = 0
        let newScoreName = ''
        if (e.target.value) {
            newScorePoint = parseInt(e.target.selectedOptions[0].getAttribute('data-point'))
            newScoreName = e.target.selectedOptions[0].label
        }
        setSelectedScorePoint(newScorePoint)
        setSelectedScoreName(newScoreName)
    }
    const onGradeChange = e => {
        const currentGrade = e.target.value;
        setIsMajorDisabled(true)
        setGradeMajors([])
        setIsStudentDisabled(true)
        setStudents([])
        setSelectedMajorName('')
        setSelectedStudentName('')
        setSelectedGradeId(currentGrade)
        if (currentGrade) {
            dataService.getGradeMajors(currentGrade)
                .then((res) => {
                    if (res.success) {
                        setGradeMajors(Object.entries(res.data.data))
                        setIsMajorDisabled(false)
                    }
                })
        }
    }
    const onMajorChange = e => {
        setIsStudentDisabled(true)
        setStudents([])
        setSelectedMajorName('')
        setSelectedStudentName('')
        const currentMajor = e.target.value;
        if (currentMajor) {
            setSelectedMajorName(e.target.selectedOptions[0].label)
            dataService.getStudents(currentMajor)
                .then((res) => {
                    if (res.success) {
                        setStudents(Object.entries(res.data.data))
                        setIsStudentDisabled(false)
                    }
                })
        }
    }
    const onStudentChange = e => {
        let newStudentName = ''
        if (e.target.value) {
            newStudentName = e.target.selectedOptions[0].label
        }
        setSelectedStudentName(newStudentName)
    }
    return isLoaded ? <form onSubmit={handleSubmit(onSubmit)} className={Styles.form}>
        <div className={Styles.fields}>
            <div className={Styles.field}>
                <label>Jenis Pelanggaran
                    <select {...register('category', {
                        onChange: onCategoryChange,
                        required: true,
                    })} value={selectedCategoryId}>
                        <option key={''} value={''}>Pilih jenis pelanggaran</option>
                        {categories.map((cat) => {
                            return <option key={cat[0]} value={cat[0]}>{cat[1]}</option>
                        })}
                    </select>
                </label>
            </div>
            <div className={Styles.field}>
                <label>Pelanggaran
                    <select disabled={isScoreDisabled} {...register('score', {
                        onChange: onScoreChange,
                        required: true
                    })}>
                        <option key={''} value={''}>Pilih pelanggaran</option>
                        {scores.map((cat) => {
                            return <option data-point={cat[1].point} key={cat[0]} value={cat[0]}>{cat[1].title}</option>
                        })}
                    </select>
                </label>
            </div>
            <div className={Styles.field}>
                <label>Kelas
                    <select {...register('grade', {
                        onChange: onGradeChange,
                        required: true,
                    })} value={selectedGradeId}>
                        <option key={''} value={''}>Pilih kelas</option>
                        {['x', 'xi', 'xii', 'xiii'].map((cat) => {
                            return <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                        })}
                    </select>
                </label>
            </div>
            <div className={Styles.field}>
                <label>Jurusan
                    <select disabled={isMajorDisabled} {...register('major', {
                        onChange: onMajorChange,
                        required: true
                    })}>
                        <option key={''} value={''}>Pilih jurusan</option>
                        {gradeMajors.map((cat) => {
                            return <option key={cat[0]} value={cat[0]}>{cat[1]}</option>
                        })}
                    </select>
                </label>
            </div>
            <div className={Styles.field}>
                <label>Siswa
                    <select disabled={isStudentDisabled} {...register('student', {
                        onChange: onStudentChange,
                        required: true,
                    })}>
                        <option key={''} value={''}>Pilih siswa</option>
                        {students.map((cat) => {
                            return <option key={cat[0]} value={cat[0]}>{cat[1]}</option>
                        })}
                    </select>
                </label>
            </div>
            <div className={Styles.field}>
                <label>Keterangan (opsional)</label>
                <textarea {...register('description', {
                    onChange: e => {
                        setCurrentDescription(e.target.value)
                    },
                })} value={currentDescription} placeholder={'Keterangan terkait pelanggaran'}></textarea>
            </div>
        </div>
        {selectedCategoryName && selectedScorePoint && selectedScoreName && selectedStudentName ?
            <Info>Nama: {selectedStudentName}<br/>
                Kelas: {selectedMajorName}<br/>
                Pelanggaran: {selectedCategoryName} - {selectedScoreName}<br/>
                Poin: <strong>{selectedScorePoint}</strong>
            </Info> : ''}
        <div className="frow justify-around">
            <button disabled={errors.score || errors.student || isDisabled}
                    className={Styles.button} type="submit">{buttonLabel}
            </button>
            <Link href={'/'}>
                <a className={`${Styles.button} ${Styles.clear}`}>Kembali</a>
            </Link>
        </div>
    </form> : <Loader/>
}
const Search = () => {
    const router = useRouter()
    const [nis, setNis] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = e => {
        e.preventDefault();
        if (isLoading || !nis) {
            return false;
        }
        setIsLoading(true)
        dataService.searchStudent(nis)
            .then(res => {
                if (res.success) {
                    router.push(`/student/${res.data.data}`)
                } else {
                    setIsLoading(false)
                    MySwal.fire({
                        title: 'Tidak ditemukan',
                        text: res.data.data,
                        icon: 'error',
                    })
                }
            })
    }
    return <form onSubmit={onSubmit}>
        <div className={Styles.search_form}>
            <input onChange={(e) => {
                setNis(e.target.value)
            }} type={'text'} placeholder={'Cari berdasarkan NIS'} disabled={isLoading} value={nis}/>
            <button type={'submit'} disabled={isLoading}/>
        </div>
    </form>
}
export {Login, SubmitPenalty, Search}