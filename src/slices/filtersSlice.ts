import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { Transmission } from '@customTypes/Cars';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
  activeFilter: [] as Array<string>,
  checkboxFilters: Object.values(Transmission),
  leftInputFilter: 0,
  rightInputFilter: Number.MAX_VALUE,
});

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
    setLeftFilter: (state, action) => {
      state.leftInputFilter = action.payload;
    },
    setRightFilter: (state, action) => {
      state.rightInputFilter = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { selectAll } = filtersAdapter.getSelectors<RootState>(
  (state) => state.filters
);

export const { filtersChanged, setLeftFilter, setRightFilter } = actions;
