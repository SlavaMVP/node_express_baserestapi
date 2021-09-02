const db = require("../config/db");

module.exports = class Order {
  date = new Date();
  constructor({ userId, totalPrice }) {
    this.userId = userId;
    this.price = totalPrice;
  }

  save() {
    return db.execute(
      `
        INSERT INTO orders (order_id, client_id, status_id, payment_id, shipping_id, total_price, order_date)
        VALUES (NULL, ?, ?, ?, ?, ?, ?) `,
      [this.userId, 1, 1, 1, this.price, this.date]
    );
  }

  static getOrders(userId) {
    return db.query(`select O.order_id as id, S.name as status, P.name as payment, Sh.name as shipping, O.total_price as price, O.order_date as date 
    from orders as O, order_status as S, payment as P, shipping as Sh 
    where O.status_id = S.status_id and O.payment_id = P.payment_id and O.status_id = Sh.shipping_id and client_id = ${userId}`);
  }

  static getOrder(orderId) {
    return db.query(`select OD.id , P.name, C.name as color, S.name as size, M.name as material, T.name as type, OD.count as count
    from order_details as OD, products as P, options as O, colors as C, sizes as S, materials as M, types as T
    WHERE OD.product_id = P.product_id and OD.option_id = O.option_id and P.material_id = M.material_id and O.color_id = C.color_id and O.size_id = S.size_id and O.type_id = T.type_id and OD.order_id = ${orderId}`);
  }
};
