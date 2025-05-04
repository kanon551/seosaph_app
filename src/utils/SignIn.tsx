/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { type VariantType, useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { OTPlessAuth } from '../global/GlobalDataTypes';
import { orgSignIn } from '../global/GlobalApi'
import { generateRandomBase64String } from '../global/GlobalFunctions';

const SignIn = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [otplessAuthData, setOtplessAuthData] = useState<OTPlessAuth>({
    token: '',
    timestamp: '',
    timezone: '',
    email: {
      name: '',
      email: '',
    },
    mobile: {
      name: '',
      number: '',
    },
    waNumber: '',
    waName: '',
  })

  useEffect(() => {
    const script = document.createElement('script')

    script.type = 'text/javascript'
    script.src = 'https://otpless.com/auth.js'

    document.body.appendChild(script)

    sessionStorage.removeItem('sessionObj')

    // Add CSS to change the background color of the otpless-floating-button
    script.onload = () => {
      const style = document.createElement('style')
      style.innerHTML = `
          #otpless-floating-button {
            display: none !important;
            background-color: transparent !important; 
            box-shadow: none !important;
            z-index: 99 !important;
          }
        `
      document.head.appendChild(style)
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    ;(window as any).otpless = (otplessUser: any) => {
      setOtplessAuthData({
        token: otplessUser.token,
        timestamp: otplessUser.timestamp,
        timezone: otplessUser.timezone,
        email: otplessUser?.email || {
          name: '',
          email: '',
        },
        mobile: otplessUser.mobile || {
          name: '',
          number: '',
        },
        waNumber: otplessUser?.waNumber || '',
        waName: otplessUser?.waName || '',
      })
    }
  }, [])

  async function fetchData() {
    if (otplessAuthData?.token && otplessAuthData?.timestamp && otplessAuthData?.timezone) {
      const key = await generateRandomBase64String(32)
      const orgResponse = await orgSignIn(otplessAuthData, key)
      if (orgResponse) {
        navigate(`/project-analytics`)
      } else {
        const variant: VariantType = 'error'
        const errorMessage = `Forbidden session`
        enqueueSnackbar(errorMessage, { variant, autoHideDuration: 10000 })
      }
    }
  }

  useEffect(() => {
    const isEmailValid = otplessAuthData?.email?.name && otplessAuthData?.email.email
    const isMobileEmpty = !otplessAuthData?.mobile?.name && !otplessAuthData?.mobile?.number

    if (isEmailValid && isMobileEmpty) {
      const variant: VariantType = 'error'
      const errorMessage = `Only WhatApp login is supported. Please sign out and sign in again with WhatsApp.`
      enqueueSnackbar(errorMessage, { variant, autoHideDuration: 10000 })
    } else {
      fetchData()
    }
  }, [otplessAuthData])

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Currently we are accepting Sign in only through WhatsApp.{' '}
        </Typography>
      </Stack>
      <iframe
        id="otpless-floating-frame"
        src="https://otpless.com/auth/index.html?login_uri=https://c4af-203-92-57-226.ngrok-free.app/"
        style={{
          height: '190px',
          border: '1px solid grey',
          borderRadius: '12px',
        }}
        loading="eager"
      />
      <Alert color="warning">
        Sign in{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Only
        </Typography>{' '}
        with{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          WhatsApp
        </Typography>
      </Alert>
    </Stack>
  )
}

export default SignIn
