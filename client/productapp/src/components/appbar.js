import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system'; // Import styled from @mui/system

// Define styles using styled API
const Root = styled('div')({
  flexGrow: 1,
});

const MenuButton = styled(IconButton)({
  marginRight: theme => theme.spacing(2), // Use theme.spacing for consistent spacing
});

const Title = styled(Typography)({
  flexGrow: 1,
});

const Appbar = () => {
  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <MenuButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </MenuButton>
          <Title variant="h6">
            Spring Boot React Full Stack Application
          </Title>
        </Toolbar>
      </AppBar>
    </Root>
  );
};

export default Appbar;
