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
const setKey = (key) => {
    ReactSession.set('key', key);
}
const setName = (name) => {
    ReactSession.set('name', name);
}
const logOut = () => {
    setKey('')
    setName('')
}
export const helper = {
    isLogin, getName, getKey, setName, setKey, logOut
}