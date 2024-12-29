import { apiSlice } from "../apiSlice";
import {
  fetchCategoriesAndDocuments,
  fetchCategory,
} from "../../../utils/firebase/firebase.utils";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      async queryFn() {
        try {
          const CategoriesMap = await fetchCategoriesAndDocuments();
          return { data: CategoriesMap };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: ["Categories"],
    }),
    getCategory: builder.query({
      async queryFn(category) {
        try {
          const categoryData = await fetchCategory(category);
          return { data: categoryData };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: (result, error, category) => [
        { type: "Category", id: category },
      ],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = categoriesApi;
