export const setUser = (user: any) => ({type: 'SET_USER', user});
export const setErrorUser = (error: any) => ({type: 'SET_ERROR_USER', error});

export const setUsers = (users: any) => ({type: 'SET_USERS', users: users});
export const setErrorUsers = (error: any) => ({type: 'SET_ERROR_USERS', error: error});

export const setAuthUser = (user: any) => ({type: 'SET_AUTH_USER', user: user});
export const setErrorAuthUser = (error: any) => ({type: 'SET_ERROR_AUTH_USER', error: error});

export const setUserChats = (chats: any) => ({type: 'SET_USER_CHATS', chats: chats});
export const setErrorUserChats = (error: any) => ({type: 'SET_ERROR_USER_CHATS', error: error});

export const setMessages = (messages: any) => ({type: 'SET_MESSAGES', messages});
export const setMessage = (message: any) => ({type: 'SET_MESSAGE', message});
export const delMessages = () => ({type: 'DEL_MESSAGES'});
export const setErrorMessages = (error: any) => ({type: 'SET_ERROR_MESSAGES', error: error});

export const setFriends = (friends: any) => ({type: 'SET_FRIENDS', friends});
export const setErrorFriends = (error: any) => ({type: 'SET_ERROR_Friends', error: error});
