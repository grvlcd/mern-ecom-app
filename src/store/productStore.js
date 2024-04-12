import axios from 'axios';
import create from 'zustand';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const productStore = create(set => ({
	data: [],
	isLoading: false,
	fetchProducts: async () => {
		try {
			set({ isLoading: true });
			const {
				data: { data = [] }
			} = await axios(`${BACKEND_URL}/api/products`);
			set({ data, isLoading: false });
		} catch (error) {
			console.log(error);
		}
	}
}));

export default productStore;
