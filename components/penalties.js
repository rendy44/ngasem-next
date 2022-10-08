import {Avatar, Box, Flex, Icon, SimpleGrid, Text} from "@chakra-ui/react";
import PropTypes from "prop-types";
import TimeAgo from 'javascript-time-ago'
import id from 'javascript-time-ago/locale/id'
import {BsChat, BsFileEarmarkBinary} from "react-icons/bs";

TimeAgo.addDefaultLocale(id)

const PenaltyItem = props => {
    const timeAgo = new TimeAgo('id-ID')
    return <Flex mb={3} alignItems={'top'} justifyContent={'flex-start'} borderBottom={'1px'}
                 borderColor={'blackAlpha.100'}>
        <Box pr={3}>
            <Avatar src={props.avatar} name={props.teacher}/>
        </Box>
        <Box pb={3}>
            <Flex alignItems={'center'}>
                <Text mr={1} textTransform={'capitalize'}
                      fontWeight={'600'}>{props.teacher}</Text>
                <Text color={'blackAlpha.600'} mr={1}>-</Text>
                <Text fontSize={'sm'}
                      color={'blackAlpha.600'}>{timeAgo.format(Date.now() - parseInt(props.time_span), 'mini')}</Text>
            </Flex>
            <Box mb={3}>
                <Text>{props.penalty}</Text>
            </Box>
            <SimpleGrid columns={3} color={'blackAlpha.600'}>
                <Flex alignItems={'center'}>
                    {props.description ? <>
                        <Icon as={BsChat} mr={2}/>
                        <Text fontSize={'sm'}>1</Text>
                    </> : <Icon color={'blackAlpha.300'} as={BsChat}/>}
                </Flex>
                <Flex alignItems={'center'}>
                    <Icon as={BsFileEarmarkBinary} mr={2}/>
                    <Text fontSize={'sm'}>{props.point}</Text>
                </Flex>
                <Box></Box>
            </SimpleGrid>
            {props.description ? <Flex pt={3} alignItems={'top'} justifyContent={'flex-start'}>
                <Box pr={3}>
                    <Avatar size={'sm'} src={props.avatar} name={props.teacher}/>
                </Box>
                <Box>
                    <Flex alignItems={'center'}>
                        <Text mr={1} textTransform={'capitalize'}
                              fontWeight={'600'}>{props.teacher}</Text>
                        <Text color={'blackAlpha.600'} mr={1}>-</Text>
                        <Text fontSize={'sm'}
                              color={'blackAlpha.600'}>{timeAgo.format(Date.now() - parseInt(props.time_span), 'mini')}</Text>
                    </Flex>
                    <Box>
                        <Text fontSize={'sm'} color={'blackAlpha.600'}>Menambahkan catatan</Text>
                        <Text>{props.description}</Text>
                    </Box>
                </Box>
            </Flex> : <></>}
            {/*<Box pt={1}>*/}
            {/*    <Flex mb={1} fontWeight={'light'} color={'blackAlpha.700'} fontSize={'xs'} alignItems={'flex-start'}*/}
            {/*          justifyContent={'flex-start'}>*/}
            {/*        <Icon as={RiTimer2Line} mr={1}/>*/}
            {/*        <Text lineHeight={1}>{timeAgo.format(Date.now() - parseInt(props.time_span))}</Text>*/}
            {/*    </Flex>*/}
            {/*</Box>*/}
        </Box>
    </Flex>
}
PenaltyItem.propTypes = {
    avatar: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
    penalty: PropTypes.string.isRequired,
    time_span: PropTypes.number.isRequired,
    description: PropTypes.string
}

export {PenaltyItem}