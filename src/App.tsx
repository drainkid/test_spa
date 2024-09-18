import LoginPage from "./components/LoginPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/main" element={<MainPage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;