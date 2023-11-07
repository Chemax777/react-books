import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchCurrentBook, addToFavorite, delFromFavorite } from "../../store/bookSlice"
import Title from "../title"
import Loader from "../loader"
import { nanoid } from "nanoid"
import { removeHTMLTags, noImage } from "../../methods"

import { Grid, Box, Typography, Button, Link } from "@mui/material"

import { useParams } from "react-router"

function BookOverview() {
    const { bookId } = useParams()
    const dispatch = useDispatch()
    const curBook = useSelector(state => state.books.curBook)
    const status = useSelector(state => state.books.status)
    const error = useSelector(state => state.books.error)
    const favoriteBooks = useSelector(state => state.books.favoriteBooks)
    const [isFavorite, setIsFavorite] = useState(true);

    const addBookToFavorite = (bookToAdd) => {
        dispatch(addToFavorite(bookToAdd))
        setIsFavorite(prevState => !prevState)
    }

    const delBookFromFavorite = (bookId) => {
        dispatch(delFromFavorite(bookId))
        setIsFavorite(prevState => !prevState)
    }

    useEffect(() => {
        dispatch(fetchCurrentBook(bookId))
        curBook && favoriteBooks.find(favBook => favBook.id === bookId) ?
            setIsFavorite(true) : setIsFavorite(false)
    }, [])

    return (
        <>
            {status === 'loading' ?
                <Loader /> :
                curBook.volumeInfo &&
                <Grid container justifyContent={"center"} sx={{ minHeight: '80vh' }}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Title text={curBook.volumeInfo.title}></Title>
                    </Grid>
                    <Grid item lg={12}>
                        <Typography variant="h5" color="text.secondary" component="h5" sx={{ textAlign: 'center' }}>
                            {curBook.volumeInfo.subtitle}
                        </Typography>
                    </Grid>
                    <Grid container spacing={4} justifyContent={"space-between"}>
                        <Grid item lg={3} md={4} sm={5} xs={12}>
                            <img
                                src={curBook.volumeInfo.imageLinks ?
                                    (curBook.volumeInfo.imageLinks.thumbnail) :
                                    (noImage)
                                }
                                alt={curBook.volumeInfo.title}
                                style={{ width: '100%' }}>
                            </img>
                        </Grid>
                        <Grid item lg={9} md={8} sm={7} xs={12} alignSelf={"center"}>
                            <Typography variant="body2" component="div" color="text.secondary">
                                <Typography variant="h6" component="p">Authors:&nbsp;
                                    {Array.isArray(curBook.volumeInfo.authors) &&
                                        curBook.volumeInfo.authors.map(author => {
                                            const authorId = nanoid()
                                            return <Typography key={authorId}
                                                variant="h6"
                                                component="span"
                                            >{author}/</Typography>
                                        })}
                                </Typography>
                                <Typography variant="h6" component="p">
                                    Publisher:&nbsp;
                                    <Typography variant="h6" component="span">{curBook.volumeInfo.publisher}</Typography>
                                </Typography>
                                <Typography variant="h6" component="p">
                                    Published date:&nbsp;
                                    <Typography variant="h6" component="span">{curBook.volumeInfo.publishedDate}</Typography>
                                </Typography>
                                <Typography variant="h6" component="p">Categories:&nbsp;
                                    {Array.isArray(curBook.volumeInfo.categories) &&
                                        curBook.volumeInfo.categories.map(category => {
                                            const categoryId = nanoid()
                                            return <Typography key={categoryId}
                                                variant="h6"
                                                component="span"
                                            >{category}/</Typography>
                                        })}
                                </Typography>
                                <Typography variant="h6" component="p">
                                    <Link
                                        href={curBook.volumeInfo.previewLink}
                                        target='_blank'
                                        rel="noopener"
                                        color="inherit"
                                        underline="hover"
                                    >
                                        {"See on Google Books"}
                                    </Link>
                                </Typography>
                            </Typography>
                            {
                                isFavorite ? (
                                    <Button variant='contained' color='error' size="small"
                                        sx={{ mb: 1 }}
                                        onClick={() => { delBookFromFavorite(bookId) }}
                                    >Delete from favorite</Button>
                                ) : (
                                    <Button variant='contained' color='success' size="small"
                                        sx={{ mb: 1 }}
                                        onClick={() => { addBookToFavorite(curBook) }}
                                    >Add to favorite</Button>
                                )
                            }
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" color="text.main" component="h4"
                            sx={{ marginBottom: '10px' }}
                        >Description</Typography>
                        <Box>
                            <Typography variant="body2" component="p" color="text.secondary">
                                {
                                    curBook.volumeInfo.description ? (
                                        removeHTMLTags(curBook.volumeInfo.description)
                                    ) : (
                                        "No description :("
                                    )
                                }
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            }
            {error && <h2>{error}</h2>}
        </>
    )
}

export default BookOverview