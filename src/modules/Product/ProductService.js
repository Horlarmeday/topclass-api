import {
  createProduct,
  filterProducts,
  getProducts,
  searchProducts,
  updateProduct,
} from './productRepository';

class ProductService {
  /**
   * create a product
   *
   * @static
   * @returns {json} json object with product data
   * @param body
   * @memberOf ProductService
   */
  static async createProductService(body) {
    return createProduct(body);
  }

  /**
   * update product account
   *
   * @static
   * @returns {json} json object with staff data
   * @param body
   * @memberOf ProductService
   */
  static async updateProductService(body) {
    return updateProduct(body);
  }

  /**
   * get products
   *
   * @static
   * @returns {json} json object with products data
   * @param body
   * @memberOf ProductService
   */
  static async getProductsService(body) {
    const { currentPage, pageLimit, search, filter } = body;
    if (search) {
      return searchProducts(Number(currentPage), Number(pageLimit), search);
    }

    if (filter) {
      return filterProducts(Number(currentPage), Number(pageLimit), filter);
    }

    if (Object.values(body).length) {
      return getProducts(Number(currentPage), Number(pageLimit));
    }

    return getProducts();
  }
}
export default ProductService;
