'use client'

import * as React from 'react'
import Box from '@mui/material/Box'

const HEIGHT = 60
const WIDTH = 60

type Color = 'dark' | 'light'

export interface LogoProps {
  color?: Color
  height?: number
  width?: number
}

export function Logo({ height = HEIGHT, width = WIDTH }: LogoProps): React.JSX.Element {
  const url = '/assets/f_x.svg'

  return <Box alt="logo" component="img" height={height} src={url} width={width} />
}

export interface SignInLogoProps {
  colorDark?: Color
  colorLight?: Color
  emblem?: boolean
  height?: number
  width?: number
}

export function SignInLogo({
  colorDark = 'light',
  colorLight = 'dark',
  height = HEIGHT,
  width = WIDTH,
  ...props
}: SignInLogoProps): React.JSX.Element {
  const color = colorLight

  return (
    <Box sx={{ height: `${height}px`, width: `${width}px` }}>
      {/* <Logo color={color} height={height} width={width} {...props} /> */}
      <Box
        component="img"
        alt="Widgets"
        src="/assets/seosaph_logo.png"
        sx={{
        height: '86px',
        maxWidth: '200px',
        objectFit: 'cover',
        borderRadius: '12px',
        }}
    />
    </Box>
  )
}
