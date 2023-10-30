import { Container } from "@mui/material"

import BookOverview from "../../components/book-overview"

function OverviewPage() {
    return (
        <>
            <Container component="main" maxWidth='lg' sx={{ mt: 10 }}>
                <BookOverview />
            </Container>
        </>
    )
}

export default OverviewPage