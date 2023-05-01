import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice( {
    name: 'documents',
    initialState: {
        isLoading: false,
        data: [],
        error: null
    },
    reducers: {
        fetchDocumentsStart: state => {
            state.isLoading = true;
        },
        fetchDocumentsSuccess: ( state, action ) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchDocumentsFailure: ( state, action ) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteDocumentSuccess: ( state, action ) => {
            state.data = state.data.filter( document => document.id !== action.payload );
        }
    }
} );

export const { fetchDocumentsStart, fetchDocumentsSuccess, fetchDocumentsFailure, deleteDocumentSuccess } = slice.actions;
export default slice.reducer;
