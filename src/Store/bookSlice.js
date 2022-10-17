const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3005/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await fetch("http://localhost:3005/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: { book: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: {
    // show
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.book = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // insert

    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.book.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default bookSlice.reducer;
