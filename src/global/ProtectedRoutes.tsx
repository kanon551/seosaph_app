/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const ProtectedRoutes = () => {
  const location = useLocation()
  const session = sessionStorage.getItem('sessionObj')
  const sessionObj = JSON.parse(session as string)

  let expiryDate = new Date(0)
  const currentDate = new Date()

  if (sessionObj?.authToken !== '') {
    expiryDate = new Date(sessionObj?.authTokenExpiry)
  }

  const isValid = currentDate < expiryDate
  const timeLeft = expiryDate.getTime() - currentDate.getTime()
  const minutesLeft = Math.floor(timeLeft / 1000 / 60)
  const secondsLeft = Math.floor((timeLeft / 1000) % 60)

  useEffect(() => {
    console.info('Location Changed:', location.pathname)
    console.info(
      isValid
        ? `Token expires in: ${minutesLeft} minute(s) and ${secondsLeft} second(s).`
        : 'Token has expired.'
    )
  }, [location, expiryDate])

  return isValid ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
