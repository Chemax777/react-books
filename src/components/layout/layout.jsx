import Header from "../header";
import Footer from "../footer";

import { Outlet } from "react-router";

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout