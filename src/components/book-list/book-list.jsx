import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchBooks } from '../../store/bookSlice' //методы взаимодействия со store
import { nanoid } from "nanoid"
import { apiKey } from '../../methods'


import FilterBooks from "./filter-books"
import BookCard from "./book-card"
import Loader from "../loader"
import { Box, Grid, Pagination } from '@mui/material'
import FilterBooksOrder from "./filter-books/filter-books-order"

function BookList() {
    const allBooks = useSelector(state => state.books.allBooks) // получение книг из store
    const dispatch = useDispatch() // необходимо для последующего взаимодействия со store
    const status = useSelector(state => state.books.status)
    const error = useSelector(state => state.books.error)
    const filterAuthor = useSelector(state => state.books.filter.author)
    const filterTitle = useSelector(state => state.books.filter.title)
    const filterOrder = useSelector(state => state.books.filter.order)
    const filterCategory = useSelector(state => state.books.filter.category)

    const [maxPage, setMaxPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        allBooks.totalItems > 1000 ? setMaxPage(80) : setMaxPage(Math.ceil(allBooks.totalItems / 12))
    }, [allBooks.totalItems])

    useEffect(() => {
        const startIndex = currentPage
        dispatch(
            fetchBooks(`https://www.googleapis.com/books/v1/volumes?q=${filterTitle}+inauthor:${filterAuthor}+subject:${filterCategory}&filter:ebooks&startIndex=${startIndex}&maxResults=12&orderBy=${filterOrder}&key=${apiKey}`)
        )
    }, [currentPage, filterAuthor, filterTitle, filterOrder, filterCategory])

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <>
            <Box sx={{ position: 'relative', minHeight: '80vh' }}>
                <FilterBooks></FilterBooks>
                <Grid
                    container
                    spacing={3}
                    justifyContent={"center"}
                    sx={{ mt: 3, mb: 3 }}
                >
                    {status === 'loading' ?
                        <Loader /> :
                        Array.isArray(allBooks.items) && allBooks.items.map((item, i) => {
                            const keyId = nanoid()
                            return <BookCard
                                key={keyId}
                                book={item}
                                addBook={true}
                            />
                        })
                    }
                </ Grid>
                <Grid container justifyContent={'center'}>
                    <Pagination page={currentPage}
                        onChange={handleChangePage}
                        count={maxPage}
                        color="primary" />
                </Grid>
                {error && <h2>{error}</h2>}
            </Box>

        </>
    )
}

export default BookList