import {
  getSales,
  updateSale,
  filterSales,
  searchSales,
  createPayment,
  generateReceipt,
  getStaffSales,
  applyDiscount,
  searchPayments,
  getPayments,
  getOneSale,
} from './saleRepository';
import { startOfTheYear } from '../../helpers/helper';
import { auditLog, groupSystemNotification } from '../../command/schedule';
import Constant from '../../helpers/constants';
import { getStaffByTwoRole } from '../Staff/staffRepository';
import Roles from '../../helpers/roles';

class SaleService {
  /**
   * update sale
   *
   * @static
   * @returns {json} json object with sale data
   * @param body
   * @memberOf SaleService
   */
  static async updateSaleService(body) {
    const sale = await updateSale(body);
    // Audit Log
    const content = `${body.staff.fullname} updated sale ${sale.slid}`;
    await auditLog(content, body.staff.sub);

    return sale;
  }

  /**
   * apply discount
   *
   * @static
   * @returns {json} json object with sale data
   * @param body
   * @memberOf SaleService
   */
  static async applyDiscountService(body) {
    const { slid, discount } = body;
    const sale = await getOneSale(slid);
    const discountAmount =
      Number(sale.amount_due) - (Number(sale.amount_due) * Number(discount)) / 100;
    // Audit Log
    const content = `${body.staff.fullname} applied ${discount}% discount to ${sale.Customer.name} ${sale.Invoice.name} sale`;
    await auditLog(content, body.staff.sub);

    return applyDiscount({ discount, discountAmount, sale });
  }

  /**
   * get sales
   *
   * @static
   * @returns {json} json object with sales data
   * @param body
   * @memberOf SaleService
   */
  static async getSalesService(body) {
    const { currentPage, pageLimit, search, filter, data } = body;
    if (search) {
      return searchSales(Number(currentPage), Number(pageLimit), search);
    }

    if (filter) {
      return filterSales(Number(currentPage), Number(pageLimit), filter);
    }

    if (data) {
      return getStaffSales(Number(currentPage), Number(pageLimit), data);
    }

    if (Object.values(body).length) {
      return getSales(Number(currentPage), Number(pageLimit));
    }

    return getSales();
  }

  /**
   * create payment
   *
   * @static
   * @returns {json} json object with payment data
   * @param body
   * @memberOf SaleService
   */
  static async createPaymentService(body) {
    const payment = await createPayment(body);
    const sale = await getOneSale(body.slid);
    const staffs = await getStaffByTwoRole(Roles.WORKSHOP, Roles.STORE);

    let updatedSale;

    if (Number(body.amount) < Number(sale.amount_remaining)) {
      const amountRemaining =
        Number(sale.amount_due) - (Number(body.amount) + Number(sale.amount_paid));

      updatedSale = await updateSale({
        slid: sale.slid,
        amount_remaining: amountRemaining,
        status: 'Partial',
        amount_paid: Number(body.amount) + Number(sale.amount_paid),
      });
    }

    if (Number(body.amount) >= Number(sale.amount_remaining)) {
      updatedSale = await updateSale({
        slid: sale.slid,
        amount_remaining: 0,
        status: 'Paid',
        amount_paid: Number(body.amount) + Number(sale.amount_paid),
      });
    }

    if (body.should_generate) {
      // Audit Log
      const content = `${body.fullname} generated a ₦${payment.amount} receipt`;
      await auditLog(content, body.sid);
      await generateReceipt(payment);
    }

    const notification = `Payment of ₦${payment.amount} has been made for ${sale.Invoice.name}`;
    await groupSystemNotification({
      content: notification,
      staff: staffs,
      title: 'Payment Added',
      type: Constant.GROUP,
      category: Constant.APPROVED,
    });

    // Audit Log
    const content = `${body.fullname} added a payment of ₦${payment.amount}`;
    await auditLog(content, body.sid);

    return updatedSale;
  }

  /**
   * generate a receipt
   *
   * @static
   * @returns {json} json object with sale data
   * @param body
   * @memberOf SaleService
   */
  static async generateReceiptService(body) {
    // Audit Log
    const content = `${body.fullname} generated a receipt`;
    await auditLog(content, body.sid);

    return generateReceipt(body);
  }

  /**
   * get payments
   *
   * @static
   * @returns {json} json object with sales data
   * @param body
   * @memberOf SaleService
   */
  static async getPaymentService(body) {
    let { start, end } = body;
    const { currentPage, pageLimit, search } = body;

    if (!start) {
      start = startOfTheYear();
    }

    if (!end) {
      end = new Date();
    }

    if (search) {
      return searchPayments(Number(currentPage), Number(pageLimit), search, start, end);
    }

    if (Object.values(body).length) {
      return getPayments(Number(currentPage), Number(pageLimit), start, end);
    }

    return getSales();
  }
}
export default SaleService;
