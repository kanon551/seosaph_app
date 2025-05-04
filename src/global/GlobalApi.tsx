/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosError } from 'axios'
import CryptoJS from 'crypto-js'
import { enqueueSnackbar, VariantType } from 'notistack'
import { OTPlessAuth, SessionObj, SessionPayload } from './GlobalDataTypes';
import { encryptWithPublicKey, getIPAddress, verifySignature } from './GlobalFunctions';

export const generalURL = 'localhost:2323/api'

export const authAxios = axios.create({
  baseURL: `http://${generalURL}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const signIn = async (payload: OTPlessAuth, key: string) => {
  try {
    console.log('payload', payload)
    const ipAddress = await getIPAddress()
    const signInPayload = {
      ...payload,
      ipAddress: ipAddress.ipString,
      ipType: ipAddress.ipType,
    }
    const jsonString = JSON.stringify(signInPayload)

    const encryptedData = CryptoJS.AES.encrypt(jsonString, key).toString()

    const encryptedAppkey = await encryptWithPublicKey(key)

    const dataToSend = {
      data: encryptedData,
      appKey: encryptedAppkey,
    }

    const res = await authAxios.post(`/org/orgSignIn`, JSON.stringify(dataToSend))
    console.log('res', res)
    return res.data
  } catch (err) {
    console.log('err', err)
    const error = err as AxiosError
    return error.response?.data
  }
}

const signatureCheck = async (aesSignature: string, payload: SessionPayload) => {
  const isSignatureValid = await verifySignature(aesSignature, payload)
  return isSignatureValid
}

export const orgSignIn = async (otplessAuthData: OTPlessAuth, key: string) => {
  const getSessionToken = await signIn(otplessAuthData, key)
  console.log('getSessionToken', getSessionToken)
  const sessionDetails: SessionObj = getSessionToken?.response
  if (
    !sessionDetails ||
    !sessionDetails?.authToken ||
    !sessionDetails?.authTokenExpiry ||
    !sessionDetails?.signature
  ) {
    const variant: VariantType = 'error'
    const errorMessage = `Sign in Failed: Sorry , couldnt sign you in`
    enqueueSnackbar(errorMessage, { variant, autoHideDuration: 10000 })
  } else {
    const { signature, ...payload } = sessionDetails
    sessionStorage.setItem(
      'sessionObj',
      JSON.stringify({
        authToken: sessionDetails?.authToken,
        authTokenExpiry: sessionDetails?.authTokenExpiry,
        name: sessionDetails?.name,
        message: sessionDetails?.message,
        signature: sessionDetails?.signature,
      })
    )
    const signatureResponse = await signatureCheck(signature, payload)
    return signatureResponse
  }
}

export const getOrgDetails = async () => {
  try {
    const session = sessionStorage.getItem('sessionObj')
    const sessionObj = JSON.parse(session as string)

    const timestamp = Date.now()
    const identifier = `clientID|${timestamp}`
    const encryptedIdentifier = await encryptWithPublicKey(identifier)
    authAxios.defaults.headers.common.Authorization = `Bearer ${sessionObj.authToken}`
    authAxios.defaults.headers.common['X-Encrypted-Identifier'] = encryptedIdentifier
    const res = await authAxios.get(`/org/getOrgDetails`)
    return res.data
  } catch (err) {
    const error = err as AxiosError
    return error.response?.data
  }
}

export const getLogsDetails = async(payload) => {
  try {
    const session = sessionStorage.getItem('sessionObj')
    const sessionObj = JSON.parse(session as string)

    const timestamp = Date.now()
    const identifier = `clientID|${timestamp}`
    const encryptedIdentifier = await encryptWithPublicKey(identifier)
    authAxios.defaults.headers.common.Authorization = `Bearer ${sessionObj.authToken}`
    authAxios.defaults.headers.common['X-Encrypted-Identifier'] = encryptedIdentifier
    const res = await authAxios.post(`/org/getLogDetails`, payload);
    return res.data
  } catch (err) {
    const error = err as AxiosError
    return error.response?.data
  }
}


export const getStatsDetails = async (startDate: string, endDate: string) => {
  try {
    const session = sessionStorage.getItem('sessionObj')
    const sessionObj = JSON.parse(session as string)

    const timestamp = Date.now()
    const identifier = `clientID|${timestamp}`
    const encryptedIdentifier = await encryptWithPublicKey(identifier)
    authAxios.defaults.headers.common.Authorization = `Bearer ${sessionObj.authToken}`
    authAxios.defaults.headers.common['X-Encrypted-Identifier'] = encryptedIdentifier
    const res = await authAxios.post(`/org/getLogStatus`, {
      startDate,
      endDate,
    });
    return res.data
  } catch (err) {
    const error = err as AxiosError
    return error.response?.data
  }
}