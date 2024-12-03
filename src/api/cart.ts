import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProductDetails = async (productId: string) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};
