import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { SignInLogo } from '../utils/SignInLogo'

export interface SignInLayoutProps {
  children: React.ReactNode
}

export function SignInLayout({ children }: SignInLayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        width: '100%',
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '98vh',
        backgroundColor: '#ffffff',
      }}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'inline-block', fontSize: 0 }}>
            <SignInLogo colorDark="light" colorLight="dark" height={32} width={122} />
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flex: '1 1 auto',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          background: 'rgb(94, 53, 177)',
          color: 'var(--mui-palette-common-white)',
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography
              color="white"
              sx={{ fontSize: '50px', lineHeight: '32px', textAlign: 'center' }}
              variant="h1"
            >
              Welcome to{' '}
              <Box component="span" sx={{ color: 'hotpink', fontFamily: 'sans-serif' }}>
                Seosaph
              </Box>
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              color="white"
              sx={{ fontSize: '1.4erem' }}
            >
              Enabling the digital intelligence{' '}
              <Box
                component="span"
                sx={{
                  color: 'hotpink',
                  fontSize: '18px',
                  lineHeight: '32px',
                  fontFamily: 'fantasy',
                }}
              >
                Using Data
              </Box>
            </Typography>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              alt="Widgets"
              src="/assets/sign-in-widget.jpg"
              sx={{
                height: '50vh',
                maxWidth: '600px',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
