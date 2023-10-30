import BookList from "../../components/book-list"
import { Container } from "@mui/material"
import Title from "../../components/title"

function HomePage() {
    return (
        <>
            <Container component="main" maxWidth='lg' sx={{mt: 10}}>
                <Title text={'New Books'}></Title>
                <BookList></BookList>
            </Container>
        </>
    )
}

export default HomePage