
interface EmailDetails {
    name: string
    email: string
  }
  
  interface MobileDetails {
    name: string
    number: string
  }
export interface OTPlessAuth {
    token: string
    timestamp: string
    timezone: string
    email: EmailDetails
    mobile: MobileDetails
    waNumber: string
    waName: string
  }

  export interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window
    children: React.ReactElement
  }
  
  export interface SessionPayload {
    authToken: string
    name: string
    message: string
  }
  
  export interface SessionObj {
    authToken: string
    authTokenExpiry: number
    name: string
    message: string
    signature: string
  }

  export interface StandardResponse {
    status: boolean
    statusCode: number
    statusMessage: string
    response: any
  }

  