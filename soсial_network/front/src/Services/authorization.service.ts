import {defaultHeaders, headerWithAuthorization} from "./index";

export const loginUserQuery = (user: any) => {
    return fetch(`/api/login`, {
        body: JSON.stringify(user),
        method: 'POST',
        headers: defaultHeaders,
    })
}

export const registerUserQuery = (user: any) => {
    return fetch(`/api/registration`, {
        body: JSON.stringify(user),
        method: 'POST',
        headers: defaultHeaders,
    })
}

export const authUserQuery = () => {
    return fetch(`/api/posts`, {
        method: 'POST',
        headers: headerWithAuthorization(),
    })
}
