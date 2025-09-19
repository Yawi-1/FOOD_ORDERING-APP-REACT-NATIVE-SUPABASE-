import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"


export const useAdminOrdersList = ({ archived }) => {
    const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering']
    return useQuery({
        queryKey: ['orders', { statuses }],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*').in('status', statuses)
            if (error) return error
            return data
        }
    })
}

export const useMyOrderList = (id) => {
    return useQuery({
        queryKey: ['myorders', id],
        queryFn: async () => {
            const { error, data } = await supabase.from('orders').select('*').eq('user_id', id)
            if (error) {
                return error
            }
            return data
        }
    })
}

export const useReadOrderById = (id) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*, order_items(*, products(*))').eq('id', id).single()
            if (error) return error
            return data
        }
    })
}