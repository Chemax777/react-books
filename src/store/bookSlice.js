import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiKey } from '../methods/methods';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error : ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
});

export const fetchCurrentBook = createAsyncThunk('books/fetchCurrentBook', async (bookId) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`);
    if (!response.ok) {
        throw new Error(`Error : ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
});

const bookSlice = createSlice({
    name: 'books',
    initialState: {
        allBooks: [],
        curBook: {},
        favoriteBooks: [],
        filter: {
            author: '',
            title: '',
            order: 'newest',
            year: '',
        },
        status: null,
        error: null,
    },
    reducers: {
        addToFavorite(state, action) {
            state.favoriteBooks.push(action.payload)
        },
        delFromFavorite(state, action) {
            state.favoriteBooks = state.favoriteBooks.filter(book => book.id !== action.payload)
        },
        filterAuthor(state, action) {
            state.filter.author = action.payload
        },
        filterTitle(state, action) {
            state.filter.title = action.payload
        },
        setOrder(state, action) {
            state.filter.order = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.allBooks = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(fetchCurrentBook.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCurrentBook.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.curBook = action.payload;
            })
            .addCase(fetchCurrentBook.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    },
});

export const { addBook, addToFavorite, delFromFavorite, filterAuthor, filterTitle, setOrder} = bookSlice.actions;
export default bookSlice.reducer;

