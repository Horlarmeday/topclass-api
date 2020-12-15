import { createService, getServices, searchServices, updateService } from './serviceRepository';
import { auditLog } from '../../command/schedule';

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
    const service = await createService(body);
    // Audit Log
    const content = `${body.fullname} created a ${service.name} service`;
    await auditLog(content, body.sid);

    return service;
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
    const updatedService = await updateService(body);
    // Audit Log
    const content = `${body.staff.fullname} updated ${updatedService.name} service`;
    await auditLog(content, body.staff.sub);

    return updatedService;
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
