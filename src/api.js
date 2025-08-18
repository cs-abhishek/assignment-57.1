import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const getProductList = () => {
  return axios.get(`${BASE_URL}/products`);
};

export const getProduct = (id) => {
  return axios.get(`${BASE_URL}/products/${id}`);
};

export const searchProducts = (query) => {
  return axios.get(`${BASE_URL}/products/search?q=${query}`);
};

export const getProductsByCategory = (category) => {
  return axios.get(`${BASE_URL}/products/category/${category}`);
};
