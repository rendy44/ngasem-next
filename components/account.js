import {PageContent} from "./global";
import PropTypes from "prop-types";
import {
    Box,
    Breadcrumb, BreadcrumbItem, BreadcrumbLink,
    Flex,
    Heading,
    Icon,
    Link,
    ListItem,
    Text,
    UnorderedList
} from "@chakra-ui/react";
import NextLink from "next/link";
import {RiLockPasswordLine, RiNotification4Line, RiSettings3Line, RiUser3Line} from "react-icons/ri";

const PanelPage = props => {
    return <PageContent id={'account'} flowFromStart={true}>
        <Heading mb={9} as={'h1'}>{props.title}</Heading>
        <Flex direction={{base: 'column', md: 'row'}}>
            <Box mb={{base: 6, md: 0}} w={{base: '100%', md: '35%', lg: '30%'}}>
                <UnorderedList listStyleType={'none'} ml={0}>
                    <ListItem mb={3}>
                        <NextLink href={'/account/setting/password'}>
                            <Link>
                                <Flex>
                                    <Box pr={2}><Icon w={7} h={7} as={RiLockPasswordLine}/></Box>
                                    <Box>
                                        <Text fontWeight={'medium'}>Kata sandi</Text>
                                        <Text fontWeight={'light'} fontSize={'sm'}>Untuk meningkatkan keamanan akun,
                                            perbaharui kata sandi secara berkala.</Text>
                                    </Box>
                                </Flex>
                            </Link>
                        </NextLink>
                    </ListItem>
                    <ListItem>
                        <NextLink href={'/account/setting/notification'}>
                            <Link>
                                <Flex>
                                    <Box pr={2}><Icon w={7} h={7} as={RiNotification4Line}/></Box>
                                    <Box>
                                        <Text fontWeight={'medium'}>Pemberitahuan</Text>
                                        <Text fontWeight={'light'} fontSize={'sm'}>Nyalakan notifikasi setiap ada
                                            pelanggaran baru yang tercatat.</Text>
                                    </Box>
                                </Flex>
                            </Link>
                        </NextLink>
                    </ListItem>
                </UnorderedList>
            </Box>
            <Box pl={{base: 0, md: 6}} w={{base: '100%', md: '65%', lg: '70%'}}>{props.subtitle ?
                <Heading size={'lg'} fontWeight={'medium'} mb={6} as={'h2'}>{props.subtitle}</Heading> : <></>}
                {props.children}
            </Box>
        </Flex>
    </PageContent>
}
PanelPage.propTypes = {
    noAddButton: PropTypes.bool,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
}
export {PanelPage}