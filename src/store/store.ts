import { combineReducers, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { PersistPartial } from 'redux-persist/lib/persistReducer'
import storage from 'redux-persist/lib/storage'
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

import userReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
    userReducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
    const store: EnhancedStore<PersistPartial> = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    })
    const persistor = persistStore(store)
    return {store, persistor}
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['store']['dispatch']