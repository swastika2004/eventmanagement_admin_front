import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Store/Api";

/* ================= FETCH CATEGORIES ================= */
export const fetchCategories = createAsyncThunk(
  "category/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories/getAllCategory");

      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);

export const singleCategory = createAsyncThunk(
  "category/singleCategory",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await api.get(`/categories/get-singlecategory/${id}`);

      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);

/* ================= ADD CATEGORY ================= */
export const addCategory = createAsyncThunk(
  "category/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/categories/create-category", data);

      if (response?.data?.status_code === 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);

/* ================= UPDATE CATEGORY ================= */
export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/categories/updateCategory/${id}`, data);

      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);

/* ================= DELETE CATEGORY ================= */
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/category/${id}`);

      if (response?.data?.status_code === 201) {
        return id;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);

/* ================= SLICE ================= */
const initialState = {
  loading: false,
  error: null,
  categoryList: [],
  categoryData:"",
  singlecate:{}
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      /* FETCH */
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categoryList = payload;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
        .addCase(singleCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(singleCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singlecate = payload;
      })
      .addCase(singleCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      /* ADD */
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.categoryData=payload
      })

      /* UPDATE */
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        const updated = payload?.data;
        state.categoryList = state.categoryList.map((cat) =>
          cat._id === updated._id ? updated : cat
        );
      })

      /* DELETE */
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.categoryList = state.categoryList.filter(
          (cat) => cat._id !== payload
        );
      })
});

export default CategorySlice.reducer;
