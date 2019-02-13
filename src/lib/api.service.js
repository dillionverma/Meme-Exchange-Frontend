import Vue from "vue";
import JwtService from "@/lib/jwt.service";

const API_URL = "http://localhost:3000/api";

function headers() {
  return { Authorization: `Token token=${JwtService.getToken()}` };
}

const api = {
  async post(path, body = {}) {
    return await Vue.axios({
      baseURL: API_URL,
      headers: headers(),
      url: path,
      method: "POST",
      data: body
    });
  },
  async get(path, params = {}) {
    return await Vue.axios({
      baseURL: API_URL,
      headers: headers(),
      url: path,
      method: "GET",
      params: params
    });
  },
  async delete(path, params = {}) {
    return await Vue.axios({
      baseURL: API_URL,
      headers: headers(),
      url: path,
      method: "DELETE",
      params: params
    });
  }
};

export default api;
