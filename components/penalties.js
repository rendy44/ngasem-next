import {Avatar, Box, Flex, Icon, SimpleGrid, Text} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {RiFolder2Line, RiTimer2Line} from "react-icons/ri";
import TimeAgo from 'javascript-time-ago'
import id from 'javascript-time-ago/locale/id'

TimeAgo.addDefaultLocale(id)

const PenaltyItem = props => {
    const timeAgo = new TimeAgo('id-ID')
    return <Flex mb={3} alignItems={'top'} justifyContent={'flex-start'} borderBottom={'1px'}
                 borderColor={'blackAlpha.100'}>
        <Box pr={3}>
            <Avatar size={'sm'} src={props.avatar} name={props.teacher}/>
        </Box>
        <Box pb={3}>
            <Flex alignItems={'center'}>
                <Text mr={1} textTransform={'capitalize'}
                      fontWeight={'600'}>{props.teacher}</Text>
                <Text color={'blackAlpha.600'} mr={1}>-</Text>
                <Text fontSize={'sm'} color={'blackAlpha.600'}>{props.point} poin</Text>
            </Flex>
            <Box>
                {props.description ?
                    <Text>{props.description}</Text> :
                    <Text fontWeight={'light'} fontStyle={'italic'} color={'blackAlpha.700'}>Tanpa keterangan</Text>}
            </Box>
            <Box pt={1}>
                <Flex mb={1} fontWeight={'light'} color={'blackAlpha.700'} fontSize={'xs'} alignItems={'flex-start'}
                      justifyContent={'flex-start'}>
                    <Icon as={RiTimer2Line} mr={1}/>
                    <Text lineHeight={1}>{timeAgo.format(Date.now() - parseInt(props.time_span))}</Text>
                </Flex>
                <Flex fontWeight={'light'} color={'blackAlpha.700'} fontSize={'xs'} alignItems={'flex-start'}
                      justifyContent={'flex-start'}>
                    <Icon as={RiFolder2Line} mr={1}/>
                    <Text lineHeight={1}>{props.penalty}</Text>
                </Flex>
            </Box>
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