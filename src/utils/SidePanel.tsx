import React, { useMemo } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useNavigate, useLocation } from 'react-router-dom'
import ListItemText from '@mui/material/ListItemText'
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const SidePanel = ({ open }: { open: boolean }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const breadcrumbs = location.pathname

  const Routes = [
    {
      label: 'Analytics',
      url: '/project-analytics',
      icon: 'InsertChartOutlinedRounded',
    },
  ]

  return (
    <>
      <List>
        {Routes.map((route, index) => {
          const SelectedIcon = 'AbcIcon'
          return (
            <ListItem
              key={index}
              disablePadding
              sx={{
                display: 'block',
                padding: '0.5rem',
                borderRight:
                  breadcrumbs === `${route.url}` || (breadcrumbs === '/' && index === 1)
                    ? '1px solid rgb(94, 53, 177)'
                    : null,
              }}
            >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    backdropFilter: 'blur(20px)',
                    borderRadius: '8px',
                    WebkitBackdropFilter: 'blur(20px)',
                    background:
                      breadcrumbs === `${route.url}` || (breadcrumbs === '/' && index === 1)
                        ? 'rgb(237, 231, 246)'
                        : null,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
                onClick={() => navigate(`${route.url}`)}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {SelectedIcon && <AutoGraphIcon fontSize="medium" />}
                </ListItemIcon>
                <ListItemText
                  primary={route.label}
                  sx={[
                    {
                      '& .MuiTypography-root': {
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '1.334em',
                        fontFamily: 'Roboto, sans-serif',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color:
                          breadcrumbs === `${route.url}` || (breadcrumbs === '/' && index === 1)
                            ? 'rgb(94, 53, 177)'
                            : 'inherit',
                        mr: 1,
                      },
                    },
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export default SidePanel
