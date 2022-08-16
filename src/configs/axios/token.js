import router from '@/router';

/**
 *
 * @type {string}
 */
const API_TOKEN_KEY = 'token';

/**
 *
 * @type {string}
 */
const TOKEN_EXPIRED_DATE = 'tokenExpiredDate';

/**
 *
 * @type {string}
 */
const REDIRECT_TO_AUTH_ROUTE = '/';


/**
 * @returns {string|null}
 */
export const getToken = () => localStorage.getItem(API_TOKEN_KEY);

/**
 * @returns {void}
 */
export const setToken = async (token) => await localStorage.setItem(API_TOKEN_KEY, token);

/**
 *
 * @param token
 * @param tokenExpiredDate
 * @param remember
 * @returns {Promise<void>}
 */
export const setAuthorizedUserCredentials = async (token, tokenExpiredDate, remember) => {
    await setToken(token);
    await redirectToAuthRoute();
    setTokenExpiredDate(tokenExpiredDate);
    setIsRemember(remember);
}

export const setAuthorizedUserRefreshTokenSuccess = async (token, tokenExpiredDate, remember) => {
    await setToken(token);
    await setTokenExpiredDate(tokenExpiredDate);
    await setIsRemember(remember);
};

/**
 *
 * @param tokenExpiredDate
 */
const setTokenExpiredDate = async (tokenExpiredDate) => await localStorage.setItem(TOKEN_EXPIRED_DATE, tokenExpiredDate);

/**
 *
 * @param remember
 */
const setIsRemember = async (remember) => await localStorage.setItem('remember', remember);

/**
 *
 * @param customer
 */
export const setCustomer = async (customer) => await localStorage.setItem('customer', customer);

/**
 *
 * @param customer
 */
export const getCustomer = () => JSON.parse(localStorage.getItem('customer'));

/**
 * @returns {void}
 */
export const unsetCustomer = async () => {
    localStorage.clear();
    await router.push({ path: '/login' }).catch(() => {});
}

/**
 *
 * @returns {Promise<Route>}
 */
const redirectToAuthRoute = async () => await router.push({ path: REDIRECT_TO_AUTH_ROUTE }).catch(() => {});

/**
 * @returns {void}
 */
export const unsetToken = async () => {
    localStorage.clear();
    await router.push({ path: '/login' }).catch(() => {});
}
