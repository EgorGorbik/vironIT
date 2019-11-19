export const getUser = (state: any) => {
    return state.user;
}

export const getUsers = (state: any) => {
    return state.users;
}

export const getAuthUser = (state: any) => {
    return state.authUser;
}

export const getIsLogin = (state: any) => {
    console.log(state.isLogin)
    return state.isLogin;
}
