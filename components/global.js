import PropTypes from "prop-types";
import Styles from '../styles/global.module.scss'
import ReactLoading from "react-loading";
import {useEffect, useRef, useState} from "react";
import {helper} from "../services/helper";
import {useRouter} from "next/router";
import NextLink from "next/link"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Avatar,
    Box,
    Button, Center, Container,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay, Flex, Heading,
    Icon,
    Image, Link, ListItem,
    Square,
    Text, UnorderedList,
    useDisclosure
} from "@chakra-ui/react";
import {RiSettings3Line, RiUser3Line} from "react-icons/ri";

const ConfirmationDialog = props => {
    const cancelRef = useRef()
    return (
        <>
            <AlertDialog motionPreset={'slideInBottom'} isOpen={props.isOpen}
                         leastDestructiveRef={cancelRef}
                         onClose={props.onClose}
                         isCentered>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        {props.title ?
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>{props.title}</AlertDialogHeader> :
                            <></>}
                        <AlertDialogBody>{props.content}</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button variant={'ghost'} ref={cancelRef}
                                    onClick={props.onClose}>{props.cancelButtonText ?? 'Batal'}</Button>
                            <Button colorScheme={props.confirmButtonColor ?? 'red'} onClick={() => {
                                props.callbackOnConfirm()
                                props.onClose()
                            }} ml={3}>{props.confirmButtonText ?? 'Konfirmasi'}</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
const TopNav = () => {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [username, setUsername] = useState('')
    const [isSticky, setIsSticky] = useState(false)
    const {
        isOpen: isOpenDrawer,
        onOpen: onOpenDrawer,
        onClose: onCloseDrawer
    } = useDisclosure()
    const {
        isOpen: isOpenLogout,
        onOpen: onOpenLogout,
        onClose: onCloseLogout
    } = useDisclosure()
    const stickyNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY
            setIsSticky(windowHeight > 80)
        }
    }
    useEffect(() => {
        if (!isLogin) {
            setIsLogin(helper.isLogin)
        } else {
            setName(helper.getName)
            setAvatar(helper.getAvatar)
            setUsername(helper.getUserName)
        }
        window.addEventListener('scroll', stickyNavbar);

        return () => {
            window.removeEventListener('scroll', stickyNavbar);
        };
    }, [isLogin])
    const navButtons = !isLogin ? ('/login' !== router.pathname ?
            <NextLink href={'/login'}><Button colorScheme={'teal'}>Masuk</Button></NextLink> : <></>) :
        <>
            <Box bg={'blackAlpha.100'} p={1} borderRadius={'2xl'} border={'1px'} borderColor={'blackAlpha.300'}>
                <Flex>
                    <Square>
                        <Avatar size={'xs'} name={name} src={avatar}/>
                    </Square>
                    <Center px={2}>
                        <Text fontWeight={'medium'} fontSize={'md'} onClick={onOpenDrawer}
                              cursor={'pointer'}>{username}</Text>
                    </Center>
                </Flex>
            </Box>
            <Drawer placement={'right'} onClose={onCloseDrawer} isOpen={isOpenDrawer}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Info Akun</DrawerHeader>
                    <DrawerBody>
                        <Box>
                            <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'}
                                  bg={'blackAlpha.100'} p={4}>
                                <Box mb={2}>
                                    <Avatar size={'lg'} src={avatar} name={name}/>
                                </Box>
                                <NextLink href={'/account'}>
                                    <Link><Text textTransform={'capitalize'} fontWeight={'medium'}>{name}</Text></Link>
                                </NextLink>
                            </Flex>
                            <Box py={4}>
                                <UnorderedList listStyleType={'none'} ml={0}>
                                    <ListItem mb={3}>
                                        <NextLink href={'/account'}>
                                            <Link textDecoration={'none'}>
                                                <Flex>
                                                    <Box pr={2}><Icon w={7} h={7} as={RiUser3Line}/></Box>
                                                    <Box>
                                                        <Text fontWeight={'medium'}>Profil</Text>
                                                        <Text fontWeight={'light'} fontSize={'sm'}>Lihat detail profil
                                                            dan pelanggaran
                                                            yang sudah tercatat</Text>
                                                    </Box>
                                                </Flex>
                                            </Link>
                                        </NextLink>
                                    </ListItem>
                                    <ListItem>
                                        <NextLink href={'/account/setting'}>
                                            <Link>
                                                <Flex>
                                                    <Box pr={2}><Icon w={7} h={7} as={RiSettings3Line}/></Box>
                                                    <Box>
                                                        <Text fontWeight={'medium'}>Pengaturan</Text>
                                                        <Text fontWeight={'light'} fontSize={'sm'}>Perbaharui akun dan
                                                            kata sandi</Text>
                                                    </Box>
                                                </Flex>
                                            </Link>
                                        </NextLink>
                                    </ListItem>
                                </UnorderedList>
                            </Box>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button colorScheme={'red'} onClick={onOpenLogout}>Keluar</Button>
                        <ConfirmationDialog
                            title={'Konfirmasi'}
                            content={'Yakin ingin keluar?'}
                            onClose={onCloseLogout}
                            isOpen={isOpenLogout}
                            confirmButtonText={'Iya, keluar'}
                            callbackOnConfirm={() => {
                                helper.logOut()
                                setIsLogin(false)
                                router.push('/login')
                            }}/>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    return <Box py={2}>
        <Container maxW={'container.xl'}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Box>
                    {'/' !== router.pathname ? <NextLink href={'/'}>
                        <Link>
                            <Flex alignItems={'center'}>
                                <Box borderRight={'1px'} borderColor={'blackAlpha.300'} pr={1}>
                                    <Image src={'/icons/logo192.png'} boxSize={'32px'}/>
                                </Box>
                                <Box pl={1}>
                                    <Text color={'blackAlpha.700'} textDecoration={'none'} fontSize={'xs'}
                                          lineHeight={'1.2'}
                                          className={Styles.logo_name}>SMK Negeri<br/>Ngasem</Text>
                                </Box>
                            </Flex>
                        </Link>
                    </NextLink> : <></>}
                </Box>
                <Box>
                    {navButtons}
                </Box>
            </Flex>
        </Container>
    </Box>
}
const PageContent = props => {
    return <Flex flexDirection={'column'} justifyContent={'space-between'} minH={'100vh'}>
        <TopNav/>
        <Section id={props.id} containerWidth={props.containerWidth}>
            {props.children}
        </Section>
        <Footer/>
    </Flex>
}
const Section = (props) => {
    const headingElm = props.title ? <Heading as={'h1'} size={'2xl'}>{props.title}</Heading> : <></>
    return (
        <Box py={{base: 12, md: 20}}>
            <Container maxW={props.containerWidth ?? 'container.xl'}>
                <Box>
                    {props.isTitleCenter ? <Center>{headingElm}</Center> : <Box>{headingElm}</Box>}
                    {props.children}
                </Box>
            </Container>
        </Box>
    )
}
const Footer = () => {
    return (
        <Box bg={'blackAlpha.100'} py={6}>
            <Container maxW={'container.xl'}>
                <Center>
                    <Text fontSize={'sm'} fontWeight={'light'}>&copy; 2022 SMK Negeri Ngasem. All rights reserved</Text>
                </Center>
            </Container>
        </Box>
    )
}
const HeadingTitle = props => {
    const centerClass = props.isCenter ? 'text-center' : '';
    return <div className={`${Styles.title} ${centerClass}`}>
        <h1>{props.title}</h1>
    </div>
}
const Info = props => {
    return <p className={Styles.info}>{props.children}</p>
}
const Loader = () => {
    return <div className={'frow'}>
        <ReactLoading type={'spokes'} color={'#773377'} height={64} width={64}/>
    </div>
}

ConfirmationDialog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
    confirmButtonColor: PropTypes.string,
    callbackOnCancel: PropTypes.func,
    callbackOnConfirm: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
TopNav.propTypes = {
    noAddButton: PropTypes.bool
}
PageContent.propTypes = {
    id: PropTypes.string.isRequired,
    containerWidth: PropTypes.string
}
Section.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    isTitleCenter: PropTypes.bool,
    containerWidth: PropTypes.string
}
HeadingTitle.propTypes = {
    title: PropTypes.string.isRequired,
    isCenter: PropTypes.bool
}

export {TopNav, ConfirmationDialog, PageContent, Section, HeadingTitle, Footer, Info, Loader}