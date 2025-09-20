import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


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

export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth()
    const userId = session?.user.id;
    return useMutation({
        async mutationFn({ total }) {
            if (!userId) return null;
            const { data, error } = await supabase
                .from('orders')
                .insert({ total, user_id: userId })
                .select()
                .single()
            if (error) throw error;
            return data
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['orders']);
        },
        onError(error) {
            console.log(error);
        }
    })
}

export const useInsertOrderItems = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn({ items, order_id }) {
            const { error } = await supabase
                .from('order_items')
                .insert(
                    items.map((item) => ({
                        size: item.size,
                        quantity: item.quantity,
                        order_id,
                        product_id: item.product_id
                    }))
                )
            if (error) throw error
        },
        async onSuccess() {
            await queryClient.invalidateQueries(['orders'])
        },
        onError(error) {
            console.log(error.message);
        }
    })
}