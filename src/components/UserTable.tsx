import {Box, Button, CircularProgress, Container, Paper} from "@mui/material";
import {userRecord} from "../types.ts"
import {DataGrid, GridRowSelectionModel} from '@mui/x-data-grid';
import {FC, useState} from "react";
import EditModal from "./EditModal.tsx";
import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {setUserData} from "../redux/slices/userSlice.ts";


interface userTableProps {
    handleOpen : () => void
    updateData: (newData: userRecord[], selectedId: userRecord[], id: GridRowSelectionModel) => void;
    editRequest: (id: GridRowSelectionModel, updatedRecord: userRecord) => void;

}


const UserTable: FC<userTableProps> = ({handleOpen , updateData, editRequest}) => {

    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [editingRecord, setEditingRecord] = useState<userRecord | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const userData = useAppSelector(state => state.users.userData)
    const dispatch = useAppDispatch()

    const handleDelete = () => {
        if (userData) {
            const updatedData = userData.filter(item => !selectedRows.includes(item.id))
            const selectedId =  userData.filter(item => selectedRows.includes(item.id))
            updateData(updatedData, selectedId, selectedRows)
            setSelectedRows([]);
        }
    }

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const recordToEdit = userData?.find(record => record.id === selectedRows[0]) || null;
            setEditingRecord(recordToEdit);
            setEditModalOpen(true);
        }
    }

    const handleSaveEditedRecord = (updatedRecord: userRecord) => {
       dispatch(setUserData(userData?.map(record =>
            record.id === updatedRecord.id ? updatedRecord : record
        ) || []))
        editRequest(selectedRows, updatedRecord)
    };

    return (
        <div>
            {userData && userData.length > 0 ? (
                <Container sx={{ marginTop: 8 }}>
                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            pageSizeOptions={[5, 10, 25, 50, 100]}
                            checkboxSelection
                            sx={{ border: 0 }}
                            rows = {userData}
                            columns={Object.keys(userData[0])
                                .filter((key) => key !== "id")
                                .map((key) => ({
                                    field: key,
                                    headerName: key,
                                    flex: 1
                                }))}

                            onRowSelectionModelChange={(newSelection) => {
                                setSelectedRows(newSelection);
                            }}
                            rowSelectionModel={selectedRows}

                        />
                    </Paper>

                    <Box component={"div"} sx={{textAlign:'center'}}>
                        <Button
                            variant="contained"
                            sx={{m:5, align:"center"}}
                            onClick={handleOpen}
                        >
                            добавить запись
                        </Button>

                        <Button
                            variant='contained'
                            color="secondary"
                            onClick={handleDelete}
                            disabled={selectedRows.length !== 1 }
                            sx={{ m:5, align:"center"}}
                        >
                            Удалить запись
                        </Button>

                        <Button variant="contained"
                                onClick={handleEdit}
                                disabled={selectedRows.length !== 1}
                                color = 'warning'
                                sx={{ m:5, align:"center"}}
                        >
                            Редактировать запись
                        </Button>
                    </Box>

                </Container>
            ) : (
                <Container sx={{textAlign:'center', marginTop: 50}}>
                <CircularProgress size={100} />
                </Container>

            )}
            <EditModal
                open={editModalOpen}
                handleClose={() => setEditModalOpen(false)}
                initialData={editingRecord}
                handleSave={handleSaveEditedRecord}
            />

        </div>
    );
};

export default UserTable;
