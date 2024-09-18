import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { userRecord } from "../types";

interface EditModalProps {
    open: boolean;
    handleClose: () => void;
    initialData: userRecord | null;
    handleSave: (updatedRecord: userRecord) => void;
}

const EditModal: React.FC<EditModalProps> = ({ open, handleClose, initialData, handleSave }) => {

    const [formValues, setFormValues] = useState<userRecord>(initialData || {
        id: '',
        documentStatus: "",
        employeeNumber: "",
        documentType: "",
        documentName: "",
        companySignatureName: "",
        employeeSignatureName: "",
        employeeSigDate: '',
        companySigDate: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormValues(initialData);
        }
    }, [initialData])


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveClick = () => {
        handleSave(formValues);
        handleClose();
    };

    return (

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Редактировать запись</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="documentStatus"
                    label="Document Status"
                    fullWidth
                    value={formValues.documentStatus}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="employeeNumber"
                    label="Employee Number"
                    fullWidth
                    value={formValues.employeeNumber}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="documentType"
                    label="Document Type"
                    fullWidth
                    value={formValues.documentType}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="documentName"
                    label="Document Name"
                    fullWidth
                    value={formValues.documentName}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="companySignatureName"
                    label="Company Signature Name"
                    fullWidth
                    value={formValues.companySignatureName}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="employeeSignatureName"
                    label="Employee Signature Name"
                    fullWidth
                    value={formValues.employeeSignatureName}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="employeeSigDate"
                    label="Employee Signature Date"
                    fullWidth
                    value={formValues.employeeSigDate}
                    onChange={handleInputChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="companySigDate"
                    label="Company Signature Date"
                    fullWidth
                    value={formValues.companySigDate}
                    onChange={handleInputChange}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSaveClick}>Save</Button>
            </DialogActions>

        </Dialog>
    );
};

export default EditModal;
