import { combineReducers } from '@reduxjs/toolkit';
import filtersReducer from './filters';
import pizzazReducer from './pizzaz';

const rootReducer = combineReducers({
    filters: filtersReducer,
    pizzaz: pizzazReducer
  });

  export default rootReducer;