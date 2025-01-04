import { fetchOrders } from "../../../utils/firebase/firebase.utils";
import { apiSlice } from "../apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      async queryFn(userId) {
        try {
          const orders = await fetchOrders(userId);
          return { data: orders };
        } catch (error) {
          return { error: error.message };
        }
      },
      providesTags: (result, error, userId) => [{ type: "Orders", id: userId }],
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
