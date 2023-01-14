import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Products {
  products: string[];
  addProduct: (newProduct: string) => void;
  removeProduct: (productToDelete: string) => void;
}

export const useProducts = create<Products>()(
  immer(
    persist(
      (set) => ({
        products: [],
        addProduct: (newProduct: string) => set((state) => { state.products.push(newProduct) }),
        removeProduct: (productToDelete: string) => set((state) => ({ products: state.products.filter(product => product !== productToDelete) })),
      }),
      {
        name: 'products-storage',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
)