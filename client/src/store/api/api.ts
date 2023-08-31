import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPlaceData } from "../../types/place.interface";
import { BASEURL } from "../../constants/constants";

export const travelByApi = createApi({
  reducerPath: "travelByApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: (builder) => ({
    getPlace: builder.query<IPlaceData, string>({
      query: (id) => `/place/${id}`,
    }),
  }),
});

export const { useGetPlaceQuery } = travelByApi;
