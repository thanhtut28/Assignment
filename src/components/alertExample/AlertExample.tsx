import {
   Box,
   TextField,
   Select,
   FormControl,
   InputLabel,
   SelectChangeEvent,
   MenuItem,
   Button,
} from "@mui/material";
import React, { useState } from "react";
import { Alert, AlertType } from "../../AlertReducer";
import { v4 as uuid } from "uuid";

export default function AlertExample({ addAlert }: { addAlert: (alert: Partial<Alert>) => void }) {
   const [timeLimit, setTimeLimit] = useState<number>(3);
   const [text, setText] = useState<string>("");
   const [alertType, setAlertType] = useState<AlertType>("success");
   const [alertTitle, setAlertTitle] = useState<string>("");
   const [link, setLink] = useState<string>("");

   const timeLimitIsValid = timeLimit > 0;
   const textIsValid = text.trim() !== "";

   const formIsValid = timeLimitIsValid && textIsValid;

   const resetInputs = () => {
      setTimeLimit(3);
      setText("");
      setAlertType("success");
      setAlertTitle("");
      setLink("");
   };

   const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTimeLimit(+e.target.value);
   };

   const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
   };

   const handleAlertTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAlertTitle(e.target.value);
   };

   const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLink(e.target.value);
   };

   const handleAlertTypeChange = (event: SelectChangeEvent) => {
      setAlertType(event.target.value as AlertType);
   };

   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formIsValid) return;
      addAlert({ alertTitle, alertType, id: uuid(), link, text, timeLimit });
      resetInputs();
   };

   return (
      <Box
         component="form"
         sx={{ display: "flex", flexDirection: "column", width: 1, maxWidth: 400, p: 2 }}
         onSubmit={handleFormSubmit}
      >
         <TextField
            label="Time Limit"
            value={timeLimit}
            onChange={handleTimeLimitChange}
            type="number"
            inputProps={{
               inputMode: "numeric",
               pattern: "[0-9]*",
            }}
         />
         <TextField value={text} onChange={handleTextChange} label="Text" />
         <TextField value={alertTitle} onChange={handleAlertTitleChange} label="Alert Title" />
         <TextField value={link} onChange={handleLinkChange} label="Link" />

         <FormControl>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={alertType}
               label="Alert Type"
               onChange={handleAlertTypeChange}
            >
               <MenuItem value="success">Success</MenuItem>
               <MenuItem value="error">Error</MenuItem>
               <MenuItem value="warning">Warning</MenuItem>
               <MenuItem value="info">Info</MenuItem>
            </Select>
            <Button variant="contained" color="primary" type="submit">
               Submit
            </Button>
         </FormControl>
      </Box>
   );
}
