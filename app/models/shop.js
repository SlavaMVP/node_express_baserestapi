const db = require("../config/db");

module.exports = class Shop {
  constructor() {}

  static getProducts() {
    return db.query(
      `SELECT O.option_id as id, P.name as product, M.name as material, T.name as type, S.name as Size ,C.name as color, O.available as available 
      FROM products as P, materials as M, types as T, sizes as S, colors as C, options as O 
      WHERE P.material_id = M.material_id and O.product_id = P.product_id and O.type_id = T.type_id and O.size_id = S.size_id and O.color_id = C.color_id 
      ORDER BY id`
    );
  }

  static getProduct(id) {
    return db.query(
      `SELECT O.option_id as opId,  P.product_id as prodId, P.name as name, P.image as img,  M.name as material, T.name as type, S.name as size ,C.name as color,P.price, O.available as available 
      FROM products as P, materials as M, types as T, sizes as S, colors as C, options as O 
      WHERE P.material_id = M.material_id and O.product_id = P.product_id and O.type_id = T.type_id and O.size_id = S.size_id and O.color_id = C.color_id and O.option_id = ${id}`
    );
  }

  static getCategories() {
    return db.query(`SELECT category_id as id, name from categories`);
  }

  static getProductsOfTypeAndCategory(type, category) {
    return db.query(
      `select O.option_id as id, P.name, P.price , P.image as img, K.name as color
      from categories_to_products as CP ,products as P, options as O, types as T, categories as C , colors as K
      where CP.product_id = P.product_id and O.product_id = P.product_id and O.type_id = T.type_id and O.color_id = K.color_id and CP.category_id = C.category_id and C.name = '${category}' and T.name = '${type}'`
    );
  }

  static getTypes() {
    return db.query(`SELECT * from types`);
  }

  static getProductsOfType(type) {
    return db.query(
      `select O.option_id as id, P.name, P.price as price, P.image as img, T.name as type, S.name as size, C.name as color, M.name as material, O.available as available 
      from products as P, options as O, types as T, sizes as S, colors as C, materials as M
      where P.product_id = O.product_id and O.size_id = S.size_id and O.color_id = C.color_id and P.material_id = M.material_id and O.type_id = T.type_id and T.name = '${type}'`
    );
  }
};
