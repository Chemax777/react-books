import { BrowserRouter, Route, Routes } from "react-router-dom"

import HomePage from "../../pages/home-page/home-page"
import Page404 from "../../pages/page404"
import Layout from "../layout/layout"
import OverviewPage from "../../pages/overview-page"
import FavoriteBooksPage from "../../pages/favorite-books-page"

import { useSelector } from "react-redux/es/hooks/useSelector"
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../../theme/theme"

function App() {
    const isLightTheme = useSelector(state => state.theme.lightTheme)
    return (
        <>
            <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage></HomePage>}></Route>
                            <Route path="/overview/:bookId" element={<OverviewPage />}></Route>
                            <Route path="/favorite-books" element={<FavoriteBooksPage />}></Route>
                            <Route path="*" element={<Page404 />}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}

export default App