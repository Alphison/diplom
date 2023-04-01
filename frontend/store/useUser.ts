import { UsersService } from './../services/Users.service';
import { User } from './useSign';
import { immer } from 'zustand/middleware/immer'
import { create } from "zustand";

export interface UsersType {
    users: User[] | null;
    loading: boolean;
    fetchUsers: () => void;
}

export const useUsers = create<UsersType>()(immer(set => ({
    users: null,
    loading: false,
    error: null,
    fetchUsers: async () => {
        set({loading: true})

        try {
            const res = await UsersService.getAll()

            set({users: res.data})
        } catch(error: any) {
            // set({error: error})
        } finally {
            set({loading: false})
        }
    }
})))