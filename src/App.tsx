import { useState } from "react";
import AlertManager from "./components/alertManager/AlertManager";
import AlertExample from "./components/alertExample/AlertExample";
import useAlertReducer from "./AlertReducer";
import { AppBar, Box, Toolbar, Popper, Container, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function App() {
   const { alertReducer, removeAlert, addAlert } = useAlertReducer();

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
   };

   const open = Boolean(anchorEl);
   const id = open ? "simple-popper" : undefined;

   return (
      <Box>
         <AppBar position="static">
            <Toolbar sx={{ width: 1 }}>
               <Box width={1} display="flex" justifyContent="flex-end">
                  <IconButton
                     size="large"
                     aria-label="show 17 new notifications"
                     onClick={handleClick}
                     sx={{
                        color: theme => theme.palette.common.white,
                     }}
                  >
                     <Badge
                        badgeContent={alertReducer.length > 0 ? alertReducer.length : 0}
                        color="error"
                     >
                        <NotificationsIcon />
                     </Badge>
                  </IconButton>
                  <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 100 }}>
                     <Box
                        sx={{
                           width: 400,
                           py: 2,
                           mr: {
                              xs: 1,
                              sm: 2,
                           },
                        }}
                     >
                        <AlertManager alertReducer={alertReducer} removeAlert={removeAlert} />
                     </Box>
                  </Popper>
               </Box>
            </Toolbar>
         </AppBar>
         <Container
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}
         >
            <AlertExample addAlert={addAlert} />
         </Container>
      </Box>
   );
}

export default App;
