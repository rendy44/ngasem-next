import {PageContent} from "../components/global";
import {Search} from "../components/form";
import {Box, Image} from "@chakra-ui/react";

const IndexPage = () => {
    return <PageContent id={'home'} containerWidth={'container.sm'}>
        <Box textAlign={'center'}>
            <Image mx={'auto'} mb={{base: 6, md: 12}} alt={'SMK Negeri Ngasem'} src={'/icons/logo192.png'}/>
            <Box>
                <Search/>
            </Box>
        </Box>
    </PageContent>
}

export default IndexPage;