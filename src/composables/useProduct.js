import axios from "axios";

const getProductList = async () => {
  try {
    const result = await axios.get("http://localhost:3000/products");
    return result.data.products;
  } catch (error) {
    return [];
  }
};

const getProduct = async (productID) => {
  try {
    const result = await axios.get(
      `http://localhost:3000/products/${productID}`
    );
    return result.data.product;
  } catch (error) {
    return {};
  }
};

export { getProduct, getProductList };
