import NavMenu from "../nav-menu"
import { Container } from "@mui/material"

function Header() {
    return (
        <>
            <Container component="header" maxWidth="lg">
                <NavMenu />
            </Container>
            {/* <div>
                <NavMenu />
            </div> */}
        </>
    )
}

export default Header