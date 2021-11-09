const axios = require('axios')

export const httpRequest = (
    method,
    url,
    data,
    token,
    content_type = 'application/json',
    responseType = 'json'
) => {
    if (!window.navigator.onLine) throw new Error('no_internet')

    return axios({
        headers: {
            "Content-Type": content_type,
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        method: method,
        url: process.env.VUE_APP_API_URL + url,
        data: data,
        responseType: responseType
    })
}

export function createURLFromBlob(blob) {
    return window.URL.createObjectURL(blob)
}

export const handleVuexApiCall = async (vuexAction, payload) => {
    try {
        const data = await vuexAction(payload)
        return { success: true, data }
    } catch (err) {
        console.log(err)
        if (err.response) {
            // Handle Response Errors
            const errorCode = err.response.data.errorCode
            const error = getErrorObj(errorCode)
            return { success: false, error, errorCode }
        } else if (err.message === 'no_internet') {
            return { success: false, error: { message: 'We\'re having trouble connecting with the server. Please check your internet connection.', type: 'error'} }
        } else {
            // Throw an error if the error is not an HTTP response
            throw err
        }
    }
}

const getErrorObj = errorCode => {
    let message =
        'Sorry, we have encountered an unknown error. Please contact our technical team for support.'
    switch (errorCode) {
        case 'UNAUTHENTICATED_ERROR':
            message = 'Your session is expired'
            break
        case 'INVALID_CREDENTIALS_ERROR':
            message = 'Incorrect email or password'
            break
        case 'VALIDATION_ERROR':
            message = "We've encountered errors while validating your inputs"
            break
        case 'SMTP_ERROR':
            message =
                'Failed to send email'
            break
        case 'RESOURCE_NOT_FOUND_ERROR':
            message =
                "Sorry, the data you are looking for seems to be missing in our database"
            break
        case 'TOO_MANY_REQUESTS_ERROR':
            message = "We've received too many request from you. Please try again later."
    }
    return { message, type: 'error' }
}