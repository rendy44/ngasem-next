import {ReactSession} from 'react-client-session';

const isLogin = () => {
    return getName() && getKey()
}
const getName = () => {
    return ReactSession.get('name');
}
const getFirstName = () => {
    return ReactSession.get('fname')
}
const getLastName = () => {
    return ReactSession.get('lname')
}
const getUserName = () => {
    return ReactSession.get('username')
}
const getKey = () => {
    return ReactSession.get('key');
}
const getAvatar = () => {
    return ReactSession.get('avatar')
}
const setKey = (key) => {
    ReactSession.set('key', key);
}
const setUserName = (username) => {
    ReactSession.set('username', username)
}
const setName = (name) => {
    ReactSession.set('name', name);
}
const setFirstName = firstName => {
    ReactSession.set('fname', firstName)
}
const setLastName = lastName => {
    ReactSession.set('lname', lastName)
}
const setAvatar = avatar => {
    ReactSession.set('avatar', avatar)
}
const logOut = () => {
    setKey('')
    setUserName('')
    setName('')
    setFirstName('')
    setLastName('')
    setAvatar('')
}
export const helper = {
    isLogin,
    getName,
    getUserName,
    getKey,
    getAvatar,
    setName,
    setFirstName,
    setLastName,
    getFirstName,
    getLastName,
    setUserName,
    setKey,
    setAvatar,
    logOut
}