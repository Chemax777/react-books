import { Container } from "@mui/material"
import FavoriteBooksList from "../../components/favorite-books-list"
import Title from "../../components/title"

function FavoriteBooksPage() {
    
    return (
        <Container component="main" maxWidth='lg' sx={{ mt: 10 }}>
            <Title text={'Favorite books'}></Title>
            <FavoriteBooksList></FavoriteBooksList>
        </Container>
    )
}

export default FavoriteBooksPage