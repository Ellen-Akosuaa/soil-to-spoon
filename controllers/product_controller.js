import {productModel} from '../models/product_model.js';
import {farmerModel} from '../models/farmers_model.js';
import { productSchema } from '../schema/product_schema.js';

// Create a new product
export const addProduct = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = productSchema.validate({
            ...req.body,
            productImages: req.files?.productImages[0].filename,
        });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { productName,productDescription, price,quantity, productCategory, productImages } = value;
        const userId = req.session?.user?.id || req?.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Check if the farmer exists
        const farmer = await farmerModel.findById(userId);
        if (!farmer) {
            return res.status(404).json({ error: 'Farmer not found' });
        }

        const product = new productModel({
            productName,
            productDescription,
            price,
            quantity,
            productCategory,
            farmer: userId, // Link product to farmer
            productImages
        });

        await product.save();

        // Add the product to the farmer's product list
        farmer.products.push(product._id);
        await farmer.save();

        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Retrieve a product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id).populate('farmer'); // Populate farmer details

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate request body
        const { error, value } = productSchema.validate({
            ...req.body,
            productImages: req.files?.productImages[0].filename,
        });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const product = await productModel.findByIdAndUpdate(id, value, { new: true });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Remove the product from the farmer's product list
        await farmerModel.updateOne({ products: id }, { $pull: { products: id } });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Retrieve all products for a specific farmer
export const getProductsByFarmer = async (req, res) => {
    try {
        const { farmerId } = req.params;
        const products = await productModel.find({ farmer: farmerId });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
