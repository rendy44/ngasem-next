import {ReactSession} from 'react-client-session';

const isLogin = () => {
    return getName() && getKey()
}
const getName = () => {
    return ReactSession.get('name');
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
const setName = (name) => {
    ReactSession.set('name', name);
}
const setAvatar = avatar => {
    ReactSession.set('avatar', avatar)
}
const logOut = () => {
    setKey('')
    setName('')
    setAvatar('')
}
export const helper = {
    isLogin, getName, getKey, getAvatar, setName, setKey, setAvatar, logOut
}