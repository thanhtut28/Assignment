import { useEffect } from "react";
import { Alert, AlertTitle, Box, Link } from "@mui/material";
import { Alert as TypeAlert } from "../../AlertReducer";

interface Props {
   alert: TypeAlert;
   removeAlert: ({ id }: Partial<TypeAlert>) => void;
}

export default function AlertComponent({ alert, removeAlert }: Props) {
   useEffect(() => {
      const timeout = setTimeout(() => {
         removeAlert({ id: alert.id });
      }, alert.timeLimit * 1000);
      return () => clearTimeout(timeout);
   }, [alert.id, alert.timeLimit, removeAlert]);

   return (
      <Box py={1}>
         <Alert variant="filled" severity={alert.alertType}>
            {alert.alertTitle.trim() !== "" && <AlertTitle>{alert.alertTitle}</AlertTitle>}
            {alert.link.trim() !== "" ? (
               <Link href={alert.link} color="inherit">
                  {alert.text}
               </Link>
            ) : (
               <>{alert.text}</>
            )}
         </Alert>
      </Box>
   );
}
