import { apiSlice } from "../apiSlice";
import { fetchCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";

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
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
