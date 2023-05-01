import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice( {
    name: 'documents',
    initialState: {
        isLoading: false,
        documents: [],
        max_pages: 0,
        error: null
    },
    reducers: {
        fetchDocumentsStart: state => {
            state.isLoading = true;
        },
        fetchDocumentsSuccess: ( state, action ) => {
            state.isLoading = false;
            state.documents = action.payload.documents;
            state.max_pages = action.payload.max_pages
            state.error = null;
        },
        fetchDocumentsFailure: ( state, action ) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteDocumentSuccess: ( state, action ) => {
            state.documents = state.documents.filter( ( document ) => {
                return !action.payload.includes( document.image_id )
            } );
        }
    }
} );

export const { fetchDocumentsStart, fetchDocumentsSuccess, fetchDocumentsFailure, deleteDocumentSuccess } = slice.actions;
export default slice.reducer;
