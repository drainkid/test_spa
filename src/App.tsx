import LoginPage from "./components/LoginPage.tsx";
import { HashRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";


const App = () => {
    return (
        <Provider store={store}>
        <HashRouter basename={'test_spa'}>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/main" element={<MainPage/>} />
            </Routes>
        </HashRouter>
        </Provider>
    );
};

export default App;