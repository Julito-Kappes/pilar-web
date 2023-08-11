
import {
  Popover
} from "@mui/material";


const MenuPopover = ({ children, sx, ...other }) => {
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
};
export default MenuPopover;
