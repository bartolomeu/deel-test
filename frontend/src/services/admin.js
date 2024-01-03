import { API_URL } from "./util";

export function getBestProfession(start, end) {
  return fetch(`${API_URL}/admin/best-profession?start=${start}&end=${end}`);
}
export function getBestClients(start, end, limit) {
  return fetch(`${API_URL}/admin/best-clients?start=${start}&end=${end}&limit=${limit}`);
}