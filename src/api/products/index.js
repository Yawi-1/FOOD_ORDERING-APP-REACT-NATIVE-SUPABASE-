import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"
export const useProductList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*')
            if (error) return error
            return data
        }
    })
}

export const useProduct = (id) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*').single().eq('id', id)
            if (error) return error
            return data
        }
    })
}