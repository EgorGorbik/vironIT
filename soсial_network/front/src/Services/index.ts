export const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const headerWithAuthorization = () => ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
});
