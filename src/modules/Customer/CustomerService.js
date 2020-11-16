import {
  createCustomer,
  filterCustomers,
  findCustomerByPhone,
  getCustomers,
  searchCustomers,
  updateCustomer,
} from './customerRepository';

class CustomerService {
  /**
   * create customer account
   *
   * @static
   * @returns {json} json object with customer data
   * @param body
   * @memberOf CustomerService
   */
  static async createCustomerService(body) {
    const customer = await findCustomerByPhone(body.phone);
    if (customer) throw new Error('Customer account already exists');

    return createCustomer(body);
  }

  /**
   * update customer account
   *
   * @static
   * @returns {json} json object with staff data
   * @param body
   * @memberOf CustomerService
   */
  static async updateCustomerService(body) {
    return updateCustomer(body);
  }

  /**
   * get customers
   *
   * @static
   * @returns {json} json object with customers data
   * @param body
   * @memberOf CustomerService
   */
  static async getCustomers(body) {
    const { currentPage, pageLimit, search, filter } = body;
    if (search) {
      return searchCustomers(Number(currentPage), Number(pageLimit), search);
    }

    if (filter) {
      return filterCustomers(Number(currentPage), Number(pageLimit), filter);
    }

    if (Object.values(body).length) {
      return getCustomers(Number(currentPage), Number(pageLimit));
    }

    return getCustomers();
  }
}
export default CustomerService;
