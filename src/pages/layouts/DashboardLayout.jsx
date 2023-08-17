import React, { useRef, Children, useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Container,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Drawer,
  Collapse,
  MenuItem as MenuItemMui,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerMenu, popMenu } from "../../constants/menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import MenuPopover from "../../components/MenuPopover";

const drawerWidth = 240;

/*const MenuPopover = ({ children, sx, ...other }) => {
  return (
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      paperProps={{ sx }}
      {...other}
    >
      {children}
    </Popover>
  );
};*/

const PopMenu = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <IconButton
        size="small"
        sx={{ ml: 2 }}
        onClick={() => setOpen(true)}
        ref={menuRef}
      >
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </IconButton>
      <MenuPopover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={menuRef.current}
        sx={{
          marginTop: 2.5,
          marginLeft: 0.5,
          overflow: "inherit",
          boxShadow: "1px, 1px, 2px, 2px rgb(0 0 0 / 20%)",
          width: 320,
        }}
      >
        {popMenu.map((item) => (
          <MenuItemMui
            key={item.title}
            to={item.path}
            component={RouterLink}
            onClick={() => setOpen(false)}
            sx={{ py: 1, px: 2.5 }}
          >
            <ListItemText disableTypography>{item.title}</ListItemText>
          </MenuItemMui>
        ))}
      </MenuPopover>
    </Box>
  );
};

const MenuItem = ({ item }) => {
  const navigate = useNavigate();
  const { children, title, path } = item;
  const [open, setOpen] = useState(false);
  if (children) {
    return (
      <>
        <ListItem key={item.title} onClick={() => setOpen((status) => !status)}>
          <ListItemButton>
            <ListItemText
              sx={{ fontWeight: 400 }}
              primary={item.title}
              disableTypography
            />
          </ListItemButton>
          {open ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child, index) => {
              return (
                <ListItem
                  key={index}
                  onClick={() => navigate(child.path)}
                  disablePadding
                >
                  <ListItemButton
                    sx={{
                      height: 42,
                      fontWeight: "200",
                      padding: (th) => th.spacing(0, 2.5, 0, 3),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        width: 26,
                        height: 26,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: (th) => th.spacing(0, 2, 0, 0),
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "text.disabled",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ fontWeight: 400 }}
                      primary={child.title}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }
  return (
    <>
      <ListItem onClick={() => navigate(path)}>
        <ListItemButton>
          <ListItemText
            sx={{ fontWeight: 400 }}
            primary={title}
            disableTypography
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};

const Menu = ({ items }) => {
  return (
    <List>
      {items.map((item) => (
        <MenuItem item={item} />
      ))}
    </List>
  );
};

const SideMenu = ({ open, onClose }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (open) {
      onClose();
    }
  }, [pathname]);
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        open={open}
        onClose={onClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Menu items={drawerMenu} />
      </Drawer>
    </Box>
  );
};

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute">
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <Button sx={{ color: "#FFF" }} onClick={() => setOpen(true)}>
            <MenuIcon />
          </Button>

          <SideMenu open={open} onClose={() => setOpen(false)} />

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Pilar Tecno Web
          </Typography>

          <PopMenu />
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
export default DashboardLayout;
