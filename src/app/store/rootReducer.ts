import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/model/authSlice';
import uiPreferencesReducer from '@/features/ui-preferences/model/uiPreferencesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  uiPreferences: uiPreferencesReducer,
});

export default rootReducer;
