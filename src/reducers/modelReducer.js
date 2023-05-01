import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice( {
    name: 'models',
    initialState: {
        isLoading: false,
        models: [],
        error: null
    },
    reducers: {
        fetchModelsStart: state => {
            state.isLoading = true;
        },
        fetchModelsSuccess: ( state, action ) => {
            state.isLoading = false;
            state.models = action.payload;
            state.error = null;
        },
        fetchModelsFailure: ( state, action ) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteModelSuccess: ( state, action ) => {
            state.models = state.models.filter( ( model ) => {
                return !action.payload.includes( model.id )
            } );
        },
        addModelsStart: state => {
            state.isLoading = true;
        },
        addModelsSuccess: ( state, action ) => {
            state.isLoading = false;
            state.Models = [action.payload.new_model, ...action.payload.models];
            state.error = null;
        },
        addModelsFailure: ( state, action ) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
} );

export const { fetchModelsStart, fetchModelsSuccess, fetchModelsFailure, deleteModelSuccess, addModelsStart, addModelsSuccess, addModelsFailure } = slice.actions;
export default slice.reducer;
