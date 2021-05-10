import {
  createCustomer,
  filterCustomers,
  findCustomerByPhone,
  getCustomers,
  searchCustomers,
  updateCustomer,
} from './customerRepository';
import { auditLog } from '../../command/schedule';

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
    const newCustomer = await createCustomer(body);
    // Audit Log
    const content = `${body.fullname} created ${newCustomer.name} customer account`;
    await auditLog(content, body.sid);

    return newCustomer;
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
    const updatedCustomer = await updateCustomer(body);
    // Audit Log
    const content = `${body.staff.fullname} updated ${updatedCustomer.name} customer account`;
    await auditLog(content, body.staff.sub);

    return updatedCustomer;
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
