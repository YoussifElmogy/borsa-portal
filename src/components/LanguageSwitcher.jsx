import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 10,
          color: '#fff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(229, 174, 68, 0.3)',
          },
        }}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            mt: 1,
          },
          '& .MuiMenuItem-root': {
            fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
            '&:hover': {
              backgroundColor: 'rgba(229, 174, 68, 0.1)',
            },
            '&.Mui-selected': {
              backgroundColor: '#e5ae44',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#d49e3a',
              },
            },
          },
        }}
      >
        <MenuItem
          selected={i18n.language === 'en'}
          onClick={() => changeLanguage('en')}
        >
          English
        </MenuItem>
        <MenuItem
          selected={i18n.language === 'ar'}
          onClick={() => changeLanguage('ar')}
        >
          العربية
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
