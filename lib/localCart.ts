export type LocalCartItem = {
    id: string;
    product_id: string;
    product_name: string;
    product_price: number;
    size: string;
    quantity: number;
};

export function getLocalCart(): LocalCartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const cart = localStorage.getItem('vastr_cart');
        return cart ? JSON.parse(cart) : [];
    } catch {
        return [];
    }
}

export function addToLocalCart(item: Omit<LocalCartItem, 'id'>): void {
    const cart = getLocalCart();
    const existing = cart.find(
        (i) => i.product_id === item.product_id && i.size === item.size
    );
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, id: Date.now().toString() });
    }
    localStorage.setItem('vastr_cart', JSON.stringify(cart));
}

export function removeFromLocalCart(id: string): void {
    const cart = getLocalCart().filter((i) => i.id !== id);
    localStorage.setItem('vastr_cart', JSON.stringify(cart));
}

export function updateLocalCartQuantity(id: string, quantity: number): void {
    if (quantity <= 0) { removeFromLocalCart(id); return; }
    const cart = getLocalCart().map((i) =>
        i.id === id ? { ...i, quantity } : i
    );
    localStorage.setItem('vastr_cart', JSON.stringify(cart));
}

export function clearLocalCart(): void {
    localStorage.removeItem('vastr_cart');
}

export function getLocalCartCount(): number {
    return getLocalCart().reduce((sum, i) => sum + i.quantity, 0);
}