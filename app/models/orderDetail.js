const db = require("../config/db");

module.exports = class OrderDetail {
  constructor({ userId, orderId, prodId, opId, count }) {
    this.userId = userId;
    this.orderId = orderId;
    this.prodId = prodId;
    this.opId = opId;
    this.count = count;
  }

  save() {
    return db.execute(
      `
        INSERT INTO order_details (id, client_id, product_id, option_id, count)
        VALUES (NULL, ?, ?, ?, ?) `,
      [this.userId, this.orderId, this.prodId, this.opId, this.count]
    );
  }
};
