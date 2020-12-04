import {
  getSales,
  updateSale,
  filterSales,
  searchSales,
  createPayment,
  getSaleById,
  generateReceipt, getStaffSales, applyDiscount,
} from './saleRepository';

class SaleService {
  // /**
  //  * create a sale
  //  *
  //  * @static
  //  * @returns {json} json object with sale data
  //  * @param body
  //  * @memberOf SaleService
  //  */
  // static async createSaleService(body) {
  //   return createSale(body);
  // }

  /**
   * update sale
   *
   * @static
   * @returns {json} json object with sale data
   * @param body
   * @memberOf SaleService
   */
  static async updateSaleService(body) {
    return updateSale(body);
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
    return applyDiscount(body);
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
    const sale = await getSaleById(body.slid);
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
      await generateReceipt(payment);
    }

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
    return generateReceipt(body);
  }
}
export default SaleService;
