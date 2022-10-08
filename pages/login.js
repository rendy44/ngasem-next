import {PageContent} from "../components/global";
import {Login} from "../components/form";
import {Box, Flex, Heading, Image, Text} from "@chakra-ui/react";

const LoginPage = () => {
    return <PageContent id={'login'}>
        <Flex alignItems={'center'} flexDirection={{base: 'column', md: 'row'}}>
            <Box mb={3} w={{base: 'full', lg: '60%'}}>
                <Image src={'/login.png'} alt={'Login illustration'}/>
            </Box>
            <Box w={{base: 'full', lg: '40%'}}>
                <Heading mb={5} as={'h1'}>Selamat datang kembali!</Heading>
                <Text fontSize={'md'} mb={6}>Untuk dapat mencatat pelanggaran silahkan masuk menggunakan nama pengguna
                    dan kata sandi yang
                    telah didaftarkan.</Text>
                <Login/>
            </Box>
        </Flex>
    </PageContent>
}

export default LoginPage;