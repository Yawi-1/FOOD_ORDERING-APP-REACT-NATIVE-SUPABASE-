import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export const useInsertProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data) {
            const { error } = await supabase
                .from("products")
                .insert({
                    name: data.name,
                    price: Number(data.price),
                })
                .select();

            if (error) {
                throw error;
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries(["products"]);
        },
        onError(error) {
            console.error("Insert failed:", error.message);
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn({ id, ...update }) {
            const { data, error } = await supabase
                .from('products')
                .update(update)
                .eq('id', id)
                .select()
            if (error) {
                throw error
            }
            return data
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries(['products'])
            await queryClient.invalidateQueries(['products', id])
        },
        onError(error) {
            console.log(error);
        },
    })
}