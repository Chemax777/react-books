import { Grid } from "@mui/material"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useState, useEffect } from "react";


import { addToFavorite, delFromFavorite } from "../../../store/bookSlice";

import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { noImage } from "../../../methods";
import { useDispatch, useSelector } from "react-redux";

export function BookCard({ book }) {
    const { id } = book
    const allBooks = useSelector(state => state.books.allBooks)
    const favoriteBooks = useSelector(state => state.books.favoriteBooks)
    const [isFavorite, setIsFavorite] = useState(false)

    const dispatch = useDispatch();

    const addBookToFavorite = (bookId, books) => {
        const favoriteBook = books.filter(book => book.id === bookId)
        dispatch(addToFavorite(favoriteBook[0]))
        setIsFavorite(prevState => !prevState)
    }

    const delBookFromFavorite = (bookId) => {
        dispatch(delFromFavorite(bookId))
        setIsFavorite(prevState => !prevState)
    }

    useEffect(() => {
        favoriteBooks.find(favBook => favBook.id === id) ?
            setIsFavorite(true) : setIsFavorite(false)
    }, [isFavorite])

    return (
        book.volumeInfo &&
        <Grid
            item
            lg={3}
            md={4}
            sm={6}
            xs={12}
            sx={{ textAlign: 'center' }}
        >
            <Card>
                <CardMedia
                    sx={{ height: 400 }}
                    image={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : noImage}
                    title={book.volumeInfo.title}
                />
                <CardContent sx={{ height: 250 }}>
                    <Typography color="text.main" gutterBottom variant="h5" component="h5">
                        {book.volumeInfo.title}
                    </Typography>
                    <Typography variant="body2" component="div" color="text.secondary">
                        <Typography gutterBottom variant="h6" component="p">
                            Authors: {
                                Array.isArray(book.volumeInfo.authors) && book.volumeInfo.authors.map(author => {
                                    const authorId = nanoid()
                                    return <Typography key={authorId} variant="h6" component="span">{author}/</Typography>
                                })
                            }
                        </Typography>
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    {
                        isFavorite ? (
                            <Button variant='contained' color='error' size="small"
                                sx={{ mb: 1 }}
                                onClick={() => { delBookFromFavorite(id) }}
                            >Delete from favorite</Button>
                        ) : (
                            <Button variant='contained' color='success' size="small"
                                sx={{ mb: 1 }}
                                onClick={() => { addBookToFavorite(id, allBooks.items) }}
                            >Add to favorite</Button>
                        )
                    }
                    <Link to={`/overview/${id}`}>
                        <Button variant='contained' size="small">Overview</Button>
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default BookCard