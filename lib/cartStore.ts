import { supabase } from './supabase'

export async function getCart(userId: string) {
    const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

export async function addToCart(userId: string, item: {
    product_id: string
    product_name: string
    product_price: number
    size: string
    quantity?: number
}) {
    // Check karo agar same product same size pehle se hai
    const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', item.product_id)
        .eq('size', item.size)
        .single()

    if (existing) {
        // Quantity update karo
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity: existing.quantity + 1 })
            .eq('id', existing.id)
        if (error) throw error
    } else {
        // Nai item add karo
        const { error } = await supabase
            .from('cart_items')
            .insert({ user_id: userId, ...item, quantity: item.quantity || 1 })
        if (error) throw error
    }
}

export async function removeFromCart(itemId: string) {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
    if (error) throw error
}

export async function updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
        return removeFromCart(itemId)
    }
    const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)
    if (error) throw error
}

export async function clearCart(userId: string) {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
    if (error) throw error
}