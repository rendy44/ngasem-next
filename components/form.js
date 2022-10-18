import {useRouter} from 'next/router'
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {userService} from "../services/user.service";
import {helper} from "../services/helper";
import {dataService} from "../services/data.service";
import {ConfirmationDialog, Loader} from "./global";
import {penaltyService} from "../services/penalty.service";
import {
    Avatar,
    Box,
    Button, Flex, FormControl, FormLabel,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Select, Switch, Text,
    Textarea, useDisclosure,
    useToast
} from "@chakra-ui/react";
import {RiImageEditLine, RiLockPasswordLine, RiSearchLine, RiUser3Line} from "react-icons/ri";
import {WarningIcon} from "@chakra-ui/icons";
import PropTypes from "prop-types";

const Login = () => {
    const router = useRouter()
    const toast = useToast()
    const [isDisabled, setIsDisabled] = useState(false)
    const {register, handleSubmit} = useForm();
    const onSubmit = data => {
        const {username, password} = data
        if (!username || !password) {
            return;
        }
        setIsDisabled(true)
        userService.login(username, password)
            .then(res => {
                if (res.success) {
                    const {key, name, avatar, username} = res.data.data
                    helper.setKey(key)
                    helper.setName(name)
                    helper.setAvatar(avatar)
                    helper.setUserName(username)

                    // Reload to the panel route.
                    router.push('/account/feeds')
                } else {
                    toast({
                        title: 'Terjadi kesalahan',
                        description: res.data.data,
                        status: 'warning',
                        position: 'top-right',
                        duration: 5000,
                        isClosable: true,
                    })
                    setIsDisabled(false)
                }
            })
            .catch(() => {
                setIsDisabled(false)
                toast({
                    title: 'Terjadi kesalahan',
                    description: 'Pastikan perangkat terhubung ke jaringan.',
                    status: 'error',
                    position: 'top-right',
                    duration: 5000,
                    isClosable: true,
                })
            })
    }
    return <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={3} mb={6} bg={'blackAlpha.100'} borderRadius={'20px'}>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <Icon as={RiUser3Line} color='blackAlpha.700'/>
                </InputLeftElement>
                <Input variant={'flushed'} placeholder={'Nama pengguna'} {...register("username", {required: true})}/>
            </InputGroup>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <Icon as={RiLockPasswordLine} color='blackAlpha.700'/>
                </InputLeftElement>
                <Input type={'password'} variant={'flushed'}
                       placeholder={'Kata sandi'} {...register("password", {required: true})}/>
            </InputGroup>
        </Box>
        <Box>
            <Button size={'lg'} borderRadius={'full'} isLoading={isDisabled} disabled={isDisabled} type="submit"
                    colorScheme={'teal'}
                    w={'100%'}>Masuk</Button>
        </Box>
    </form>
}
const SubmitPenalty = props => {
    const toast = useToast()
    const {register, handleSubmit} = useForm()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isBusy, setIsBusy] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
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
    const [selectedScoreId, setSelectedScoreId] = useState('')
    const [selectedScorePoint, setSelectedScorePoint] = useState(0)
    const [selectedScoreName, setSelectedScoreName] = useState('')
    const [selectedMajorName, setSelectedMajorName] = useState('')
    const [selectedStudentId, setSelectedStudentId] = useState('')
    const [selectedStudentName, setSelectedStudentName] = useState('')
    const {
        isOpen: isOpenConfirmation,
        onOpen: onOpenConfirmation,
        onClose: onCloseConfirmation
    } = useDisclosure()
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
                    toast({
                        title: 'Terjadi kesalahan',
                        description: 'Pastikan perangkat terhubung ke jaringan.',
                        status: 'error',
                        position: 'top-right',
                        duration: 5000,
                        isClosable: true,
                        onCloseComplete: () => {
                            checkConnection()
                        }
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
    const onConfirmSubmit = () => {
        setIsDisabled(true)
        // setButtonLabel('Loading...')
        const secretKey = helper.getKey();
        penaltyService.send(secretKey, selectedScoreId, selectedStudentId, currentDescription)
            .then((res) => {
                let notifType = 'error';
                let notifTitle = 'Terjadi kesalahan'
                if (res.success) {
                    notifType = 'success';
                    notifTitle = 'Sukses'

                    // Let's reset everything.
                    setSelectedCategoryId('')
                    setScores([])
                    setIsScoreDisabled(true)
                    setSelectedScoreId('')
                    setSelectedGradeId('')
                    setGradeMajors([])
                    setIsMajorDisabled(true)
                    setStudents([])
                    setIsStudentDisabled(true)
                    setSelectedStudentId('')
                    setCurrentDescription('')
                    setSelectedCategoryName('')
                    setSelectedScorePoint(0)
                    setSelectedScoreName('')
                    setSelectedStudentName('')
                }

                toast({
                    title: notifTitle,
                    description: res.data.data,
                    status: notifType,
                    position: 'top-right',
                    duration: 5000,
                    isClosable: true
                })

                setIsDisabled(false)
                // setButtonLabel('Kirim')
            })
            .catch(err => {
                setIsDisabled(false)
                // setButtonLabel('Kirim')
            })
    }
    const onSubmit = data => {
        if (!selectedScoreId || !selectedStudentId) {
            return;
        }
        onOpenConfirmation()
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
        setSelectedScoreId(e.target.value)
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
        setSelectedStudentId(e.target.value)
        setSelectedStudentName(newStudentName)
    }
    return isLoaded ? <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={{base: 3, md: 6}} mb={6} bg={'blackAlpha.100'} borderRadius={'20px'}>
            <FormControl mb={3}>
                <FormLabel mb={0}>Kategori pelanggaran</FormLabel>
                <Select variant={'flushed'} {...register('category', {
                    onChange: onCategoryChange,
                    required: true,
                })} value={selectedCategoryId}>
                    <option key={''} value={''}>Pilih kategori pelanggaran</option>
                    {categories.map((cat) => {
                        return <option key={cat[0]} value={cat[0]}>{cat[1]}</option>
                    })}
                </Select>
            </FormControl>
            <FormControl mb={3}>
                <FormLabel mb={0}>Pelanggaran</FormLabel>
                <Select variant={'flushed'} disabled={isScoreDisabled} {...register('score', {
                    onChange: onScoreChange,
                    required: true
                })}>
                    <option key={''} value={''}>Pilih pelanggaran</option>
                    {scores.map((cat) => {
                        return <option data-point={cat[1].point} key={cat[0]} value={cat[0]}>{cat[1].title}</option>
                    })}
                </Select>
            </FormControl>
            {!props.studentId ? <>
                <FormControl mb={3}>
                    <FormLabel mb={0}>Kelas</FormLabel>
                    <Select variant={'flushed'} {...register('grade', {
                        onChange: onGradeChange,
                        required: true,
                    })} value={selectedGradeId}>
                        <option key={''} value={''}>Pilih kelas</option>
                        {['x', 'xi', 'xii', 'xiii'].map((cat) => {
                            return <option key={cat} value={cat}>{`Kelas ${cat.toUpperCase()}`}</option>
                        })}
                    </Select>
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel mb={0}>Jurusan</FormLabel>
                    <Select variant={'flushed'} disabled={isMajorDisabled} {...register('major', {
                        onChange: onMajorChange,
                        required: true
                    })}>
                        <option key={''} value={''}>Pilih jurusan</option>
                        {gradeMajors.map((cat) => {
                            return <option key={cat[0]} value={cat[0]}>{cat[1]}</option>
                        })}
                    </Select>
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel mb={0}>Siswa</FormLabel>
                    <Select variant={'flushed'} disabled={isStudentDisabled} {...register('student', {
                        onChange: onStudentChange,
                        required: true,
                    })}>
                        <option key={''} value={''}>Pilih siswa</option>
                        {students.map((cat) => {
                            return <option key={cat[0]} value={cat[0]}>{cat[1]}</option>
                        })}
                    </Select>
                </FormControl>
            </> : <></>}
            <FormControl>
                <FormLabel mb={0}>Keterangan</FormLabel>
                <Textarea variant={'flushed'} {...register('description', {
                    onChange: e => {
                        setCurrentDescription(e.target.value)
                    },
                })} value={currentDescription} placeholder={'Keterangan terkait pelanggaran'}></Textarea>
            </FormControl>
        </Box>
        {selectedCategoryName && selectedScorePoint && selectedScoreName && selectedStudentId ?
            <>
                <Text fontWeight={'light'} fontSize={'sm'} mb={6}><WarningIcon mr={1} color={'orange.300'}/> Sebelum
                    dikirim, pastikan data yang dipilih sudah sesuai.</Text>
            </> : ''}
        <Box>
            <Button size={'lg'} colorScheme={'teal'} width={'full'} borderRadius={'full'} isLoading={isDisabled}
                    disabled={isDisabled} type={'submit'}>Kirim</Button>
            <ConfirmationDialog
                title={'Konfirmasi'}
                content={`Dengan melanjutkan, saya menyatakan secara sadar berhak memberikan pelanggarakn kepada ${selectedStudentName} selaku siswa ${selectedMajorName}.`}
                confirmButtonText={'Lanjutkan'}
                confirmButtonColor={'teal'}
                onClose={onCloseConfirmation}
                isOpen={isOpenConfirmation}
                callbackOnConfirm={onConfirmSubmit}/>
        </Box>
    </form> : <Loader/>
}
const Search = () => {
    const router = useRouter()
    const toast = useToast()
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
                    toast({
                        title: 'Tidak ditemukan',
                        description: res.data.data,
                        status: 'warning',
                        position: 'top-right',
                        duration: 5000,
                        isClosable: true,
                    })
                }
            })
    }
    return <form onSubmit={onSubmit}>
        <Flex border={'1px'} p={2} pl={3} borderColor={'blackAlpha.300'} borderRadius={'full'}>
            <Input variant={'unstyled'} onChange={(e) => {
                setNis(e.target.value)
            }} type={'text'} placeholder={'Cari berdasarkan NIS'} disabled={isLoading} value={nis}/>
            <Button isLoading={isLoading} type={'submit'} fontSize={'xl'} p={0} color={'blackAlpha.500'}
                    variant={'ghost'} borderRadius={'full'} size={'sm'} disabled={isLoading}><RiSearchLine/></Button>
        </Flex>
    </form>
}
const ChangePassword = () => {
    const {register, handleSubmit} = useForm()
    const onSubmit = (e) => {

    }
    return <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={{base: 3, md: 6}} mb={6} bg={'blackAlpha.100'} borderRadius={'20px'}>
            <FormControl>
                <FormLabel mb={0}>Kata sandi saat ini</FormLabel>
                <Input type={'password'} placeholder={'********'}
                       variant={'flushed'} {...register("password", {required: true})}/>
            </FormControl>
        </Box>
        <Box p={{base: 3, md: 6}} mb={6} bg={'blackAlpha.100'} borderRadius={'20px'}>
            <FormControl mb={3}>
                <FormLabel mb={0}>Kata sandi baru</FormLabel>
                <Input type={'password'} variant={'flushed'}
                       placeholder={'********'} {...register("password1", {required: true})}/>
            </FormControl>
            <FormControl>
                <FormLabel mb={0}>Ulangi kata sandi baru</FormLabel>
                <Input type={'password'} variant={'flushed'}
                       placeholder={'********'} {...register("password2", {required: true})}/>
            </FormControl>
        </Box>
        <Box>
            <Button size={'lg'} borderRadius={'full'} type="submit"
                    colorScheme={'teal'}
                    w={{base: '100%', md: 'auto'}}>Perbaharui</Button>
        </Box>
    </form>
}
const UpdateNotification = () => {
    const {register, handleSubmit} = useForm()
    const onSubmit = (e) => {

    }
    return <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={{base: 3, md: 6}} mb={6} bg={'blackAlpha.100'} borderRadius={'20px'}>
            <FormControl>
                <FormLabel mb={0}>Alamat email</FormLabel>
                <Input type={'email'} placeholder={'Contoh: user@domain.com'}
                       variant={'flushed'} {...register("email", {required: true})}/>
            </FormControl>
        </Box>
        <Box p={{base: 3, md: 6}} mb={6} bg={'blackAlpha.100'} borderRadius={'20px'}>
            <FormControl mb={3} display={'flex'} alignItems={'center'}>
                <FormLabel htmlFor={'new'} mb={0}>Pelanggaran baru</FormLabel>
                <Switch id={'new'}/>
            </FormControl>
            <FormControl mb={3} display={'flex'} alignItems={'center'}>
                <FormLabel htmlFor={'advance'} mb={0}>Siswa butuh tindakan lanjutan</FormLabel>
                <Switch id={'advance'}/>
            </FormControl>
        </Box>
        <Box>
            <Button size={'lg'} borderRadius={'full'} type="submit"
                    colorScheme={'teal'}
                    w={{base: '100%', md: 'auto'}}>Perbaharui</Button>
        </Box>
    </form>
}
const UpdateAccount = () => {
    const {register, handleSubmit} = useForm()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    useEffect(() => {
        setFirstName(helper.getFirstName)
        setLastName(helper.getLastName)
    }, [])
    const onSubmit = (e) => {

    }
    return <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={{base: 3, md: 6}} mb={6} bg={'blackAlpha.100'} borderRadius={'20px'}>
            <FormControl mb={3}>
                <Box pos={'relative'}>
                    <Icon as={RiImageEditLine}/>
                    <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo'/>
                    <Input display={'none'} type={'file'} value={''} placeholder={'Disarankan foto dengan skala 1:1'}
                           accept={"image/png, image/gif, image/jpeg"} variant={'unstyled'} {...register("photo")}/>
                </Box>
            </FormControl>
        </Box>
        <Box p={{base: 3, md: 6}} mb={6} bg={'blackAlpha.100'} borderRadius={'20px'}>
            <FormControl mb={3}>
                <FormLabel mb={0}>Nama depan</FormLabel>
                <Input type={'text'} value={firstName} placeholder={'Nama depan'}
                       variant={'flushed'} {...register("fname", {required: true})}/>
            </FormControl>
            <FormControl>
                <FormLabel mb={0}>Nama belakang</FormLabel>
                <Input type={'text'} value={lastName} placeholder={'Nama belakang'}
                       variant={'flushed'} {...register("lname", {required: true})}/>
            </FormControl>
        </Box>
        <Box>
            <Button size={'lg'} borderRadius={'full'} type="submit"
                    colorScheme={'teal'}
                    w={{base: '100%', md: 'auto'}}>Perbaharui</Button>
        </Box>
    </form>
}

SubmitPenalty.propTypes = {
    studentId: PropTypes.number
}
export {Login, SubmitPenalty, Search, ChangePassword, UpdateNotification, UpdateAccount}