export const getToken = () => {
    const token = sessionStorage.getItem('Authorization');
    return token?token:'';
}