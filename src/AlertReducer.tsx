import { useReducer } from "react";
import { v4 as uuid } from "uuid";

export type AlertType = "error" | "warning" | "info" | "success";

export interface Alert {
   timeLimit: number;
   text: string;
   link: string;
   alertType: AlertType;
   id: string;
   alertTitle: string;
}

const alert: Alert = {
   timeLimit: 10,
   text: "This is an info alert — check it out",
   link: "",
   alertType: "info",
   id: uuid(),
   alertTitle: "Info",
};

const initialState: Alert[] = [alert];

export enum AlertActionKind {
   ADD = "ADD",
   REMOVE = "REMOVE",
}

interface AlertAction {
   type: string;
   payload: Partial<Alert>;
}

function AlertReducer(state: Alert[], { type, payload }: AlertAction): Alert[] {
   switch (type) {
      case AlertActionKind.ADD:
         console.log(payload);
         return [
            ...state,
            {
               alertTitle: payload.alertTitle!,
               alertType: payload.alertType!,
               id: payload.id!,
               link: payload.link!,
               timeLimit: payload.timeLimit!,
               text: payload.text!,
            },
         ];

      case AlertActionKind.REMOVE:
         return state.filter(alert => alert.id !== payload.id);
      default:
         return state;
   }
}

export default function useAlertReducer() {
   const [alertReducer, dispatch] = useReducer(AlertReducer, initialState);

   const addAlert = (alert: Partial<Alert>) => {
      dispatch({ type: AlertActionKind.ADD, payload: alert });
   };

   const removeAlert = ({ id }: Partial<Alert>) => {
      dispatch({ type: AlertActionKind.REMOVE, payload: { id } });
   };

   return {
      alertReducer,
      addAlert,
      removeAlert,
   };
}
