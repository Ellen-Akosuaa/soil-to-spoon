import { cartModel } from "../models/cart_model.js";
import { cartSchema } from "../schema/cart_schema.js";
import { productModel } from "../models/product_model.js";


// Add an item to the cart
export const addToCart = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = cartSchema.validate({...req.body});
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { productId, quantity } = value;
        const userId = req.session?.user?.id || req?.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Check if product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find or create the user's cart
        let cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            cart = new cartModel({ user: userId, items: [] });
        }

        // Check if the product is already in the cart
        const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        // Recalculate the total
        let newTotal = 0;
        for (const item of cart.items) {
            const prod = await productModel.findById(item.product);
            if (prod) {
                newTotal += prod.price * item.quantity;
            }
        }
        cart.total = newTotal;

        // Save the cart
        await cart.save();

        res.status(200).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// Remove an item from the cart
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.session?.user?.id || req?.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Find the user's cart
        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Remove the item from the cart
        cart.items = cart.items.filter(item => !item.product.equals(productId));

        // Recalculate the total
        let newTotal = 0;
        for (const item of cart.items) {
            const prod = await productModel.findById(item.product);
            if (prod) {
                newTotal += prod.price * item.quantity;
            }
        }
        cart.total = newTotal;

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart successfully', cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// Update item quantity in the cart
export const updateCartItem = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = cartSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { productId, quantity } = value;
        const userId = req.session?.user?.id || req?.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Find the user's cart
        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Update the item's quantity
        const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
        if (itemIndex > -1) {
            if (quantity <= 0) {
                // Remove item if quantity is 0 or less
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
        } else {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        // Recalculate the total
        let newTotal = 0;
        for (const item of cart.items) {
            const prod = await productModel.findById(item.product);
            if (prod) {
                newTotal += prod.price * item.quantity;
            }
        }
        cart.total = newTotal;

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Cart item updated successfully', cart });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
