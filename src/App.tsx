import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoutes from './global/ProtectedRoutes'
import OrganizationLayout from './utils/OrganizationLayout'
import { SnackbarProvider, closeSnackbar } from 'notistack'
import Analytics from './pages/Analytics'
import { SignInLayout } from './utils/SignInLayout'
import SignIn from './utils/SignIn'

function App() {

  return (
    <div>
    <Router>
              <SnackbarProvider
                maxSnack={3}
                autoHideDuration={10000}
                action={snackbarId => (
                  <button
                    onClick={() => {
                      closeSnackbar(snackbarId)
                    }}
                    style={{ background: 'transparent', borderRadius: '10px' }}
                  >
                    Close
                  </button>
                )}
              >
              <Routes>
                        <Route
                          path="/"
                          element={
                            <SignInLayout>
                              <SignIn />
                            </SignInLayout>
                          }
                        />
                        <Route
                          path="/login"
                          element={
                            <SignInLayout>
                              <SignIn />
                            </SignInLayout>
                          }
                        />
                          <Route element={<ProtectedRoutes />}>
                            <Route
                              path="/project-analytics"
                              element={
                                <OrganizationLayout>
                                  <Analytics />
                                </OrganizationLayout>
                              }
                            />
                          </Route>
              </Routes>
              </SnackbarProvider>
    </Router>
  </div>
  )
}

export default App
