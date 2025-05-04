import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import seosaph from '../assets/seosaph_logo.png'
import { Props } from '../global/GlobalDataTypes';
import SidePanel from '../utils/SidePanel';

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRight: 'none',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  borderRight: 'none',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}))

export default function OrganizationLayout(props: Props) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const { window, children } = props

  return (
    <Box sx={{ display: 'flex', background: 'rgb(255, 255, 255)' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: 'rgb(255, 255, 255)',
          boxShadow: 'none',
          zIndex: theme => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: '3vh', minHeight: '47px !important' }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{
              color: 'rgb(94, 53, 177)',
              borderRadius: '12px',
              background: 'rgb(237, 231, 246)',
              transition: '0.2s ease-in-out',
              '&:hover': {
                background: 'rgb(94, 53, 177)',
                color: 'rgb(237, 231, 246)',
                transition: '0.2s ease-in-out',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={seosaph} alt="form-Rig" style={{ width: '7%' }} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar />
        <SidePanel open={open} />
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // height: '90vh',
          padding: '20px',
          marginTop: '8vh',
          marginRight: '10px',
          marginBottom: '8vh',
          background: 'rgb(248, 250, 252)',
          borderRadius: '24px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
