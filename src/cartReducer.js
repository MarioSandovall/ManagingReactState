export default function cartReducer(cart, action) {
    switch (action.type) {
        case "empty":
            return [];
        case "add":{
            const { id, sku } = action;
            const itemInCart = cart.find((i) => i.sku === sku);

            if (itemInCart) {
                return cart.map(item => item.sku === sku
                    ? { ...item, quantity: item.quantity + 1 }
                    : cart);
            } else {
                return [...cart, { id, sku, quantity: 1 }]
            }
        }
        case "updateQuantity":
            {
                const { quantity, sku } = action;

                if (quantity === 0) {
                    return cart.filter(i => i.sku !== sku);
                }
    
                return cart.map((i) => i.sku === sku
                    ? { ...i, quantity }
                    : i);
            }
        default:
            throw new Error("Unhandled action " + action.type)
    }
};