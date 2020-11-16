import { createService, getServices, searchServices, updateService } from './serviceRepository';

class ServiceService {
  /**
   * create a service
   *
   * @static
   * @returns {json} json object with service data
   * @param body
   * @memberOf ServiceService
   */
  static async createServiceService(body) {
    return createService(body);
  }

  /**
   * update service account
   *
   * @static
   * @returns {json} json object with service data
   * @param body
   * @memberOf ServiceService
   */
  static async updateServiceService(body) {
    return updateService(body);
  }

  /**
   * get services
   *
   * @static
   * @returns {json} json object with services data
   * @param body
   * @memberOf ProductService
   */
  static async getServicesService(body) {
    const { currentPage, pageLimit, search } = body;
    if (search) {
      return searchServices(Number(currentPage), Number(pageLimit), search);
    }

    if (Object.values(body).length) {
      return getServices(Number(currentPage), Number(pageLimit));
    }

    return getServices();
  }
}
export default ServiceService;
