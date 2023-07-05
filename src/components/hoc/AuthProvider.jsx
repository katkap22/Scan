import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    // const [user, setUser] = useState(null);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const signin = (newLogin, newPassword, cb) => {
        setLogin(newLogin);
        setPassword(newPassword);
        cb();
    }
    const signout = (cb) => {
        setLogin(null);
        setPassword(null);
        cb();
    }

    const value = {login, password, signin, signout};

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}