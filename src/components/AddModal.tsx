import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from "@mui/material"

interface AddModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (formValues: Record<string, string>) => void;
}

const AddModal: React.FC<AddModalProps> = ({ open, onClose, onSubmit }) => {
    const [formValues, setFormValues] = useState({
        documentStatus: "",
        employeeNumber: "",
        documentType: "",
        documentName: "",
        companySignatureName: "",
        employeeSignatureName: "",
        employeeSigDate: '',
        companySigDate: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        onSubmit(formValues) //addRecord
        onClose()
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Добавить запись</DialogTitle>

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
                <Button onClick={onClose}>закрыть</Button>
                <Button onClick={handleSubmit}>добавить</Button>
            </DialogActions>

        </Dialog>
    );
};

export default AddModal;
