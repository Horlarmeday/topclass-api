/**
 * Product controller handles all requests that has to do with products
 *
 * - createProduct - allow products to create a new account
 * - getOneProduct - allow products to login to their account
 * - getProducts - allow products to view their profile info
 * - updateProduct - allow products to update
 */
import { validateProduct } from './validations';
import { getProductById } from './productRepository';
import ProductService from './ProductService';

/**
 *
 *
 * @class ProductController
 */
class ProductController {
  /**
   * create a product record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, product data and access token
   */
  static async createProduct(req, res, next) {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const product = await ProductService.createProductService(
        Object.assign(req.body, { sid: req.user.sub, fullname: req.user.fullname })
      );

      return res.status(201).json({
        message: 'Successful, product created!',
        data: product,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get one product
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with product data
   */
  static async getOneProduct(req, res, next) {
    try {
      const product = await getProductById(req.params.id);
      if (!product) return res.status(404).json('Product not found');

      return res.status(200).json({
        message: 'Success',
        data: product,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * update product
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with product data
   */
  static async updateProduct(req, res, next) {
    const { pid } = req.body;
    if (!pid) return res.status(400).json('Product id required');

    try {
      const product = await ProductService.updateProductService(
        Object.assign(req.body, { staff: req.user })
      );

      return res.status(200).json({
        message: 'Data updated successfully',
        data: product,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all products
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with products data
   */
  static async getProducts(req, res, next) {
    try {
      const products = await ProductService.getProductsService(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: products,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default ProductController;
