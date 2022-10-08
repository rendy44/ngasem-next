import {Loader, PageContent} from "../../components/global";
import {dataService} from "../../services/data.service";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Flex,
    Heading,
    Icon,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VisuallyHidden
} from "@chakra-ui/react";
import {RiGroupLine, RiStickyNoteLine} from "react-icons/ri";
import {PenaltyItem} from "../../components/penalties";

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
    return (
        <PageContent id={'student'} containerWidth={'container.md'} flowFromStart={true}
                     noTopPadding={true}>
            {isLoaded ?
                <>
                    <Box>
                        <Box h={'100px'} bgSize={'cover'} bgImage={'url(/hero.jpg)'} pos={'relative'}>
                            <VisuallyHidden>Photo by iam_os on Unsplash</VisuallyHidden>
                            <Box pos={'absolute'} top={'60%'} left={3}>
                                <Avatar border={'2px'} borderColor={'blackAlpha.700'} mb={'-6'} bg={'white'} size={'lg'}
                                        src={'/graduating-student.png'}/>
                            </Box>
                        </Box>
                        <Box pt={6} pb={3} bg={'white'} borderBottom={'1px'} borderColor={'blackAlpha.200'}>
                            <Box mb={3}>
                                <Heading size={'md'} as={'h1'}>{data.name}</Heading>
                                <Text fontSize={'sm'} fontWeight={'light'}>{data.nis}</Text>
                            </Box>
                            <Box>
                                <Flex mb={1} alignItems={'top'} justifyContent={'flex-start'}>
                                    <Icon as={RiGroupLine} mr={2}/>
                                    <Text lineHeight={1} color={'blackAlpha.600'}>{data.grade}</Text>
                                </Flex>
                                <Flex alignItems={'top'} justifyContent={'flex-start'}>
                                    <Icon as={RiStickyNoteLine} mr={2}/>
                                    <Text lineHeight={1}
                                          color={'blackAlpha.600'}>{data.point ? `${data.point} poin terakumulasi` : 'Belum ada pelanggaran yang tercatat'}</Text>
                                </Flex>
                            </Box>
                        </Box>
                        <Box bg={'white'}>
                            <Tabs>
                                <TabList>
                                    <Tab><Text fontWeight={600}>Pelanggaran</Text></Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel px={0}>
                                        {data.penalties ? Object.entries(data.penalties).map((penalty, i) => {
                                            return <PenaltyItem
                                                avatar={penalty[1].avatar}
                                                teacher={penalty[1].teacher}
                                                point={penalty[1].point}
                                                penalty={penalty[1].penalty}
                                                time_span={penalty[1].date_span}
                                                description={penalty[1].description}/>
                                        }) : <Text>Belum ada pelanggaran yang tercatat</Text>}
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Box>
                </>
                : <Loader/>}
        </PageContent>
    )
}

export default StudentDetailPage