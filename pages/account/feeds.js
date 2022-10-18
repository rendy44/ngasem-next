import {Loader, PageContent} from "../../components/global";
import {useEffect, useState} from "react";
import {dataService} from "../../services/data.service";
import {Button, Center, Heading, Text} from "@chakra-ui/react";
import {PenaltyItem} from "../../components/penalties";

const FeedPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [feeds, setFeeds] = useState([])
    const [oldFeeds, setOldFeeds] = useState([])
    console.log(totalPage)
    useEffect(() => {
        if (!isLoaded || currentPage > 1) {
            dataService.getFeeds(currentPage)
                .then(res => {
                    if (res.success) {
                        setTotalPage(res.data.data.total)
                        setFeeds(feeds.length ? oldFeeds.concat(Object.entries(res.data.data.feeds)) : Object.entries(res.data.data.feeds))
                        setIsLoaded(true)
                        setIsLoading(false)
                    }
                })
                .catch(err => {

                })
        }
    }, [currentPage])
    const NextPage = props => {
        return currentPage < totalPage ? <Center>
            <Button onClick={() => {
                setIsLoading(true)
                setCurrentPage(currentPage + 1)
                setOldFeeds(feeds)
            }} isLoading={props.isLoading} variant={'link'}>Muat lebih banyak</Button>
        </Center> : <></>
    }
    return <PageContent id={'feed'} flowFromStart={true} containerWidth={'container.md'}>
        <Heading mb={9} as={'h1'}>Pelanggaran Terbaru</Heading>
        {isLoaded ? (feeds.length ? <>
            {feeds.map((feed, i) => {
                return <PenaltyItem
                    key={i} avatar={feed[1].avatar}
                    teacher={feed[1].teacher}
                    studentName={feed[1].student}
                    studentId={feed[1].student_id}
                    point={parseInt(feed[1].point)}
                    penalty={feed[1].penalty}
                    penaltyTitle={feed[1].penalty_title}
                    penaltyCategory={feed[1].penalty_category}
                    timeSpan={feed[1].date_span}
                    description={feed[1].description}/>
            })}
            <NextPage isLoading={isLoading}/>
        </> : <Text>Belum ada feed</Text>) : <Loader/>}
    </PageContent>
}
export default FeedPage