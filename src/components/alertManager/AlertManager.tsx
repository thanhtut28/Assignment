import { Alert } from "../../AlertReducer";
import { AlertContainer } from "./Elements";
import AlertComponent from "../alert/AlertComponent";

export default function AlertManager({
   alertReducer,
   removeAlert,
}: {
   alertReducer: Alert[];
   removeAlert: ({ id }: Partial<Alert>) => void;
}) {
   return (
      <>
         {alertReducer.length > 0 && (
            <AlertContainer>
               {alertReducer.map(alert => (
                  <AlertComponent key={alert.id} alert={alert} removeAlert={removeAlert} />
               ))}
            </AlertContainer>
         )}
      </>
   );
}
