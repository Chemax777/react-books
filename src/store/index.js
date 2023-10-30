import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './bookSlice';
import themeReducer from './themeSlice';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistBookConfig = {
    key: 'rootBookPersist',
    storage,
    whitelist: ['favoriteBooks']
}

const persistedReducer = persistReducer(persistBookConfig, bookReducer)

export const store = configureStore({
    reducer: { // редюсеры для разного функционала
        books: persistedReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)
