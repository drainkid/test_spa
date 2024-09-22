import  { useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import UserTable from "./UserTable.tsx";
import {userRecord} from "../types.ts";
import AddModal from "./AddModal.tsx";
import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {addUserData, removeUserData, setUserData} from "../redux/slices/userSlice.ts";

const MainPage = () => {

    const HOST = 'https://test.v5.pryaniky.com'
    const token = localStorage.getItem("access_token");
    const userData = useAppSelector(state => state.users.userData)
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (token) {
            axios.get(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
                headers: {
                    'x-auth': token
                }
            })
                .then((response: AxiosResponse<{ data: [] }>) => {
                    dispatch(setUserData(response.data.data));
                })
                .catch(error => {
                    alert(`Ошибка получения данных: ${error}`);
                });
        }
        else {
            alert('Токен отсутствует');
        }
    }, [dispatch, token]);

    const generateRandomId = (length: number = 8): string => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const handleUpdateAndDeleteData = async (newData: userRecord[], currentId: userRecord[], id:unknown) => {

        const prevData = [...userData || []]
        dispatch(setUserData(newData))
         try {
            await axios.post(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
                 {currentId},
                 {headers: {'x-auth': token}
                 })
         }
         catch(error) {
             dispatch(setUserData(prevData))
             alert(error)
         }
    }

    const addRecord = async (formValues: Record<string, string>) => {

        const tempId = generateRandomId()

        const record:userRecord = {

            id: tempId,
            documentStatus: formValues.documentStatus,
            employeeNumber: formValues.employeeNumber,
            documentType: formValues.documentType,
            documentName: formValues.documentName,
            companySignatureName: formValues.companySignatureName,
            employeeSignatureName: formValues.employeeSignatureName,
            employeeSigDate: formValues.employeeSigDate,
            companySigDate: formValues.employeeSigDate,
        }

        dispatch(addUserData(record))

        try {
            const res = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
                record,
                {
                headers: { 'x-auth': token },
            }
            )

            const newData = res.data.data
            dispatch(setUserData(userData ? [...userData, newData] : [newData]))
        }

        catch (error) {
            dispatch(removeUserData(tempId))
            alert(`Ошибка при создании записи: ${error}`);
        }
        finally {
            setOpen(false)
        }
    }

    const editRequest = (id:unknown, changedData: userRecord) => {

       const req =
           axios.post(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
            changedData,
            {headers: {'x-auth': token}}
        )
        console.log(req)
    }

    return (

        <div>

          <UserTable handleOpen = {()=> setOpen(true)}
                     updateData = {handleUpdateAndDeleteData}
                     editRequest = {editRequest}
          />

          <AddModal open={open}
                    onClose={()=> setOpen(false)}
                    onSubmit={addRecord}
            />

        </div>

    )

};

export default MainPage;