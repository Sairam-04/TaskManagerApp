const setUser = (token) =>{
    localStorage.setItem('x-auth-token',token);
}

const getUser = () =>{
    return localStorage.getItem('x-auth-token');
}

const removeUser = ()=>{
    localStorage.removeItem('x-auth-token');
}

export {setUser, getUser, removeUser};