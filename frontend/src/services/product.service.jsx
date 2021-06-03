import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.get("/products");
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  create(data) {
    return http.post("/products", data);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  deleteAll() {
    return http.delete(`/products`);
  }

  findByTitle(title) {
    return http.get(`/products?title=${title}`);
  }

  filterByPrice(minPrice, maxPrice) {
    return http.get(`/products?min_price=${minPrice}&max_price=${maxPrice}`);
  }

  filterByQty(minQty, maxQty) {
    return http.get(`/products?min_qty=${minQty}&max_qty=${maxQty}`);
  }
}

export default new ProductDataService();
