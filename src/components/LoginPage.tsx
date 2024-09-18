import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import axios from "axios";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const loginToPage = async (e:FormEvent) => {
       const HOST = 'https://test.v5.pryaniky.com'
        e.preventDefault();
        try {
            const token = await axios
                .post(`${HOST}/ru/data/v3/testmethods/docs/login`,
                    {username: login, password: password}
                )
                .then(value => value.data.data.token)

            localStorage.setItem('access_token', token)

            navigate('/main')
        }
        catch (err) {

            alert('Ошибка авторизации: ' + err);

        }
    }

    return (
        <div>
            <Container maxWidth="xs" sx={{marginTop:8, padding: 2 }}>
                <Paper elevation={10}>

                    <Typography variant="h5" component="h5" sx={{textAlign: "center"}}>
                       Авторизация
                    </Typography>

                    <Box component="form" sx={{mt:1, margin: 3}}>

                        <TextField
                          autoFocus
                          required
                          fullWidth
                          placeholder={'enter login'}
                          sx={{mb:2}}
                          value={login}
                          onChange={e => setLogin(e.target.value)}
                        />

                        <TextField
                          type="password"
                          required
                          fullWidth
                          placeholder={'enter password'}
                          sx={{mb:2}}
                          autoComplete={'on'}
                          onChange={e => setPassword(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            sx={{m:1}}
                            type="submit"
                            onClick={loginToPage}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};

export default LoginPage;