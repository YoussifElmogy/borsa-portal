import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Menu, MenuItem, Button } from '@mui/material';
import { Language as LanguageIcon, ArrowDropDown } from '@mui/icons-material';

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

  const currentLanguage = i18n.language === 'en' ? 'English' : 'العربية';

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LanguageIcon />
        </Box>
        <Button
          onClick={handleClick}
          endIcon={<ArrowDropDown />}
          sx={{
            color: '#fff',
            border: '1px solid #fff',
            borderRadius: 1,
            textTransform: 'none',
            padding: '4px 8px',
            minWidth: 'auto',
            fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
            fontSize: '0.875rem',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: '#fff',
            },
            '& .MuiButton-endIcon': {
              marginInlineStart: '4px',
            },
          }}
        >
          {currentLanguage}
        </Button>
      </Box>
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
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            lineHeight: 1.5,
            padding: { xs: '12px 16px', sm: '6px 16px' },
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
