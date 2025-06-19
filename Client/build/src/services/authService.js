import { userLogin, userRegister } from '../redux/features/auth/authActions';
import store from '../redux/store'

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if(!role || !email || !password) {
            return alert("Please provide all credentials");
        }
        store.dispatch(userLogin({email, password, role}))
    } catch (error) {
        console.log(error);
    }
};

export const handleRegister = (e, name, role, email, password, organisationName, hospitalName, address, website, phone) => {
    e.preventDefault();
    try {
        store.dispatch(userRegister({name, role, email, password, organisationName, hospitalName, address, website, phone}))
    } catch (error) {
        console.log(error);
    }
};
