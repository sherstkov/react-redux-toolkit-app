import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { firestore } from '@services/firebase';
import {
  query,
  collectionGroup,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { Cars, Car } from '@customTypes/Cars';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Cars'],
  endpoints: (builder) => ({
    getCars: builder.query({
      queryFn: async () => {
        try {
          const ref = collectionGroup(firestore, 'cars');
          const postsQuery = query(ref);
          const cars = (await getDocs(postsQuery)).docs.map((doc) =>
            doc.data()
          );
          return { data: cars };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Cars'],
    }),
    createCar: builder.mutation({
      queryFn: async (carData: Car) => {
        try {
          const ref = doc(firestore, 'cars', carData.id);
          await setDoc(ref, carData);
          return { data: 'Car has been created' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Cars'],
    }),
    deleteCar: builder.mutation({
      queryFn: async (id: string) => {
        try {
          const ref = doc(firestore, 'cars', id);
          await deleteDoc(ref);
          return { data: 'Car has been deleted' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Cars'],
    }),
  }),
});

export const { useGetCarsQuery, useCreateCarMutation, useDeleteCarMutation } =
  apiSlice;
