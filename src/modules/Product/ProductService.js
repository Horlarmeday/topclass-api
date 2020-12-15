import {
  createProduct,
  filterProducts,
  getProducts,
  searchProducts,
  updateProduct,
} from './productRepository';
import { auditLog } from '../../command/schedule';

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
    const product = await createProduct(body);
    // Audit Log
    const content = `${body.fullname} added a ${product.name} to the inventory`;
    await auditLog(content, body.sid);

    return product;
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
    const product = await updateProduct(body);
    // Audit Log
    const content = `${body.staff.fullname} updated ${product.name}`;
    await auditLog(content, body.staff.sub);

    return product;
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
