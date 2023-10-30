import { useSelector } from "react-redux"
import { Grid } from "@mui/material"
import { useState } from "react"
import { nanoid } from "nanoid"
import { Link } from "react-router-dom"

import BookCard from "../book-list/book-card"
import BookAlert from "../book-list/book-alert"

function FavoriteBooksList() {
    const favoriteBooks = useSelector(state => state.books.favoriteBooks)
    const [alertVisible, setAlertVisible] = useState(false)

    return (
        <>
            <Grid
                container
                spacing={3}
                justifyContent={"center"}
                sx={{ mt: 3, mb: 3, minHeight: '80vh' }}
            >
                {favoriteBooks.length > 0 ?
                    favoriteBooks.map((book) => <BookCard key={nanoid()} book={book} delBook={true} onAlert={setAlertVisible} />) :
                    <div>Your favorite list is empty. Please choose books on the &nbsp;
                        <Link to={'/'}>main page</Link>
                    </div>}
            </ Grid>
            {alertVisible && <BookAlert isSuccess={false}></BookAlert>}
        </>
    )

}

export default FavoriteBooksList