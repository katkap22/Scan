import s from './App.module.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import MainNotAuthorizedUser from "./components/MainNotAuthorizedUser/MainNotAuthorizedUser";
import AuthorizationForm from "./components/AuthorizationForm/AuthorizationForm";

function App() {
    return (
        <div className={s.App}>
            <Header />

            <div className="wrapper">

                <Routes>

                    <Route path="/main/*"
                           element={<MainNotAuthorizedUser />} />
                    <Route path="authorizationForm/*"
                           element={<AuthorizationForm />} />

                </Routes>

            </div>

            <Footer />
        </div>
    );
}

export default App;
