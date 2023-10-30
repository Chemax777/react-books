import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiKey } from '../methods/methods';

// Создаем асинхронные действия с помощью builder callback
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

// Создаем срез книг с использованием builder callback
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

// Экспортируем действия и редюсер из среза
export const { addBook, addToFavorite, delFromFavorite, filterAuthor, filterTitle, setOrder} = bookSlice.actions;
export default bookSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { baseUrl, apiKey } from '../methods/methods';

// export const fetchBooks = createAsyncThunk( //создание ассинхронной функции
//     'books/fetchBooks', // название
//     async function (url, { rejectWithValue }) { // rejectWithValue объект ошибки
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error(`Error : ${response.status} ${response.statusText}`)
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.message)
//         }
//     }
// )

// export const fetchCurrentBook = createAsyncThunk( //создание ассинхронной функции
//     'books/fetchCurrentBook', // название
//     async function (bookId, { rejectWithValue }) { // rejectWithValue объект ошибки
//         try {
//             const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`);
//             if (!response.ok) {
//                 throw new Error(`Error : ${response.status} ${response.statusText}`)
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.message)
//         }
//     }
// )

// const bookSlice = createSlice({
//     name: 'books',
//     initialState: {
//         allBooks: [],
//         curBook: {},
//         status: null,
//         error: null,
//     },
//     reducers: { //описываются методы взаимодействия (редюсеры)
//         // addBook(state, action) {
//         //     state.allBooks.push({
//         //         id: 2,
//         //         name: 'lalalalal'
//         //     })
//         // }
//     },
//     extraReducers: { // ассинхронные ф-и на разных этапах выполнения
//         [fetchBooks.pending]: (state) => {
//             state.status = 'loading';
//             state.error = null;
//         },
//         [fetchBooks.fulfilled]: (state, action) => {
//             state.status = 'resolved';
//             state.allBooks = action.payload;
//         },
//         [fetchBooks.rejected]: (state, action) => {
//             state.status = 'rejected';
//             state.error = action.payload;
//         },
//         [fetchCurrentBook.pending]: (state) => {
//             state.status = 'loading';
//             state.error = null;
//         },
//         [fetchCurrentBook.fulfilled]: (state, action) => {
//             state.status = 'resolved';
//             state.curBook = action.payload;
//         },
//         [fetchCurrentBook.rejected]: (state, action) => {
//             state.status = 'rejected';
//             state.error = action.payload;
//         },
//     }
// })

// export const { addBook } = bookSlice.actions; // экспорт экшенов для взаимодействия

// export default bookSlice.reducer; // экспорт редюсера для корневого файла store/index.js