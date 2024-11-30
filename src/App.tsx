import LoginPage from "./components/LoginPage.tsx";
import {BrowserRouter,  Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";


const App = () => {
    return (
        <Provider store={store}>
        <BrowserRouter basename={'test_spa'}>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/main" element={<MainPage/>} />
            </Routes>
        </BrowserRouter>
        </Provider>
    );
};

export default App;