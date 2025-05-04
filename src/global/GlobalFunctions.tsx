import axios, { AxiosError } from "axios"

const response = await fetch('/public_key.pem')
const publicKeyPem = await response.text()

export const pemToArrayBuffer = (pem: string): ArrayBuffer => {
    const cleanPem = pem.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\n/g, '')
  
    const binaryString = window.atob(cleanPem)
  
    const len = binaryString.length
    const bytes = new Uint8Array(len)
  
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
  
    return bytes.buffer
  }

  const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binaryString = window.atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  }

  function ab2str(buf: ArrayBuffer): string {
    return String.fromCharCode(...new Uint8Array(buf))
  }

  function str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length)
    const bufView = new Uint8Array(buf)
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i)
    }
    return buf
  }

export async function encryptWithPublicKey(aesKey: string): Promise<string> {
    const publicKeyArrayBuffer = pemToArrayBuffer(publicKeyPem)
  
    const publicKey = await window.crypto.subtle.importKey(
      'spki',
      publicKeyArrayBuffer,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      true,
      ['encrypt']
    )
  
    const encryptedKey = await window.crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      str2ab(aesKey)
    )
  
    return btoa(ab2str(encryptedKey))
  }

  export const getIPAddress = async () => {
    try {
      const res = await axios.get('https://api-bdc.net/data/client-ip')
      return res.data
    } catch (err) {
      const error = err as AxiosError
      return error.response?.data
    }
  }

  export async function verifySignature(signature: string, data: object): Promise<boolean> {
    const publicKeyArrayBuffer = pemToArrayBuffer(publicKeyPem)
  
    const publicKey = await window.crypto.subtle.importKey(
      'spki',
      publicKeyArrayBuffer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      true,
      ['verify']
    )
  
    const signatureBuffer = base64ToArrayBuffer(signature)
  
    return window.crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      publicKey,
      signatureBuffer,
      new TextEncoder().encode(JSON.stringify(data))
    )
  }

  export async function generateRandomBase64String(byteLength: number): Promise<string> {
    const randomBytes = new Uint8Array(byteLength)
    window.crypto.getRandomValues(randomBytes)
    const binaryString = String.fromCharCode(...randomBytes)
    const base64String = btoa(binaryString)
    return base64String
  }