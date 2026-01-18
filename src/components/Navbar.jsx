import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import nextFaceLogo from '../assets/next-face-bo.png'
import nextFaceLogoWhite from '../assets/next-face.png'


const navItems = [
  { label: 'About Us', id: 'about' },
  { label: 'Mission & Vision', id: 'mission' },
  { label: 'Why Join Us', id: 'join' },
]

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - 30 // 30px offset from top
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setDrawerOpen(false)
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'primary.main',
          boxShadow: '0 2px 10px rgba(26, 55, 65, 0.1)',
        }}
      >
        <Toolbar sx={{ margin: '16px' }}>
          {/* Mobile Hamburger Icon on the LEFT */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img
              src={nextFaceLogoWhite}
              alt="Next Face Logo"
              style={{ height: 40, marginRight: 16 }}
            />
          </Box>

          {/* Desktop Nav Items */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                sx={{ fontSize: '1.1rem', fontWeight: 500 }}
                color="inherit"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Register Button stays on the RIGHT */}
          <Box sx={{ ml: 2 }}>
            <Button
              variant="contained"
              sx={{
                 fontSize: '1.1rem', fontWeight: 500 ,
                bgcolor: 'secondary.main',
                color: 'primary.main',
                '&:hover': { bgcolor: 'secondary.light' },
              }}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer on the LEFT */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: '#ffffffcc',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header with logo and close */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #eee' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <img src={nextFaceLogo} alt="Next Face Logo" style={{ height: 36 }} />
            </Box>
            <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
              ✕
            </IconButton>
          </Box>

          {/* Nav items */}
          <List sx={{  flexGrow: 1 }}>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 2,
                  mb: 1,
                  px: 2,
                  py: 1.25,
                  '&:hover': { backgroundColor: '#f5f7f7' },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: { color: 'primary.main', fontWeight: 600, fontSize: '1.05rem' },
                  }}
                />
              </ListItem>
            ))}
          </List>

          {/* CTA */}
      
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar
