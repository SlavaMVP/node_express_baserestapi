const db = require("../config/db");

module.exports = class Cart {
  date = new Date();
  constructor({ userId, prodId, opId, count }) {
    this.userId = userId;
    this.prodId = prodId;
    this.opId = opId;
    this.count = count;
  }

  save() {
  
    return db.execute(
      `
        INSERT INTO carts (id, client_id, product_id, option_id, count)
        VALUES (NULL, ?, ?, ?, ?) `,
      [this.userId, this.prodId, this.opId, this.count]
    );
  }

  static clearCart(userId) {
    return db.query(`Delete from carts where client_id = ${userId}`);
  }

  static deleteItem(userId, prodId, opId) {
   
    return db.query(`
    Delete from carts 
    where client_id = ${userId} and product_id = ${prodId} and option_id = ${opId}`);
  }

  static editeItemCount(userId, prodId, opId, count) {
   
    return db.query(
      `update carts set count = ${count} 
      where client_id = ${userId} and product_id = ${prodId} and option_id = ${opId}
          `
    );
  }

  static findItem(userId, prodId, opId) {
  
    return db.query(`
select * from carts where client_id = ${userId} and product_id = ${prodId} and option_id = ${opId}
`);
  }

  static getCart(userId) {
    return db.query(`
    select C.id , P.price as price, P.product_id as prodId ,O.available as avl, O.option_id as opid, P.name as name, K.name as color, S.name as size, T.name as type , C.count as count
    from carts as C, products as P, options as O , colors as K, sizes as S , types as T 
    WHERE C.client_id  = ${userId} and C.product_id = P.product_id and C.option_id = O.option_id and O.type_id = T.type_id and O.size_id = S.size_id and O.color_id = K.color_id
    `);
  }
};
