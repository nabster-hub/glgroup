import {create} from "zustand";
import {data} from "autoprefixer";

export const useModalContact = create((set) => ({
    isOpen: false,
    data: null,
    open: (data)=> set({isOpen: true, data}),
    close: () => set({isOpen: false, data: null}),
}))