import {ReactSession} from 'react-client-session';

const isLogin = () => {
    return getName() && getKey()
}
const getName = () => {
    return ReactSession.get('name');
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
const setAvatar = avatar => {
    ReactSession.set('avatar', avatar)
}
const logOut = () => {
    setKey('')
    setUserName('')
    setName('')
    setAvatar('')
}
export const helper = {
    isLogin, getName, getUserName, getKey, getAvatar, setName, setUserName, setKey, setAvatar, logOut
}