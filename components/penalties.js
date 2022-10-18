import {Avatar, Box, Flex, Icon, Link, SimpleGrid, Text} from "@chakra-ui/react";
import PropTypes from "prop-types";
import TimeAgo from 'javascript-time-ago'
import id from 'javascript-time-ago/locale/id'
import {BsChat, BsFileEarmarkBinary} from "react-icons/bs";
import NextLink from "next/link";

TimeAgo.addDefaultLocale(id)

const PenaltyItem = props => {
    const cutOffString = (string, length) => {
        return string.length > length ? `${string.substring(0, parseInt(length) - 3).trim()}...` : string
    }
    const timeAgo = new TimeAgo('id-ID')
    const maybeStudentLink = props.studentName ? <NextLink
        href={`/student/${props.studentId}`}><Link>{cutOffString(props.studentName, 15)}</Link></NextLink> : <></>
    return <>
        {props.studentName ?
            <Text fontSize={'sm'} color={'blackAlpha.600'} mb={3} lineHeight={1.1}>{maybeStudentLink} telah melakukan
                pelanggaran terkait {props.penaltyCategory.toLowerCase()}</Text> : <></>}
        <Flex mb={3} alignItems={'top'} justifyContent={'flex-start'} borderBottom={'1px'}
              borderColor={'blackAlpha.100'}>
            <Box pr={3}>
                <Avatar mt={1} src={props.avatar} name={props.teacher}/>
            </Box>
            <Box pb={3}>
                <Flex alignItems={'center'}>
                    <Text mr={1} textTransform={'capitalize'}
                          fontWeight={'600'}>{cutOffString(props.teacher, 15)}</Text>
                    <Text color={'blackAlpha.600'} mr={1}>-</Text>
                    <Text fontSize={'sm'}
                          color={'blackAlpha.600'}>{timeAgo.format(Date.now() - props.timeSpan, 'mini')}</Text>
                </Flex>
                <Box mb={3}>
                    <Text>{props.penaltyTitle ?? props.penalty}</Text>
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
                                  fontWeight={'600'}>{cutOffString(props.teacher, 12)}</Text>
                            <Text color={'blackAlpha.600'} mr={1}>-</Text>
                            <Text fontSize={'sm'}
                                  color={'blackAlpha.600'}>{timeAgo.format(Date.now() - props.timeSpan, 'mini')}</Text>
                        </Flex>
                        <Box>
                            <Text fontSize={'sm'} color={'blackAlpha.600'}>Menambahkan catatan</Text>
                            <Text>{props.description}</Text>
                        </Box>
                    </Box>
                </Flex> : <></>}
            </Box>
        </Flex>
    </>
}
PenaltyItem.propTypes = {
    avatar: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    studentName: PropTypes.string,
    studentId: PropTypes.number,
    studentGrade: PropTypes.string,
    point: PropTypes.number.isRequired,
    penaltyCategory: PropTypes.string,
    penaltyTitle: PropTypes.string,
    penalty: PropTypes.string.isRequired,
    timeSpan: PropTypes.number.isRequired,
    description: PropTypes.string
}

export {PenaltyItem}