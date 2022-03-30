import { types } from '../types/types';

export const startLoading = ():types => ({
    type: '[ui] startLoading',
});

export const stopLoading = ():types => ({
    type: '[ui] stopLoading',
});