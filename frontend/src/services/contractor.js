import { API_URL, getAuthorizationHeader } from "./util";

export function getContractorById(id, userId) {
  return fetch(
    `${API_URL}/contracts/${id}`,
    getAuthorizationHeader(userId)
  );
}

export function getContractorAll(userId) {
  return fetch(
    `${API_URL}/contracts`,
    getAuthorizationHeader(userId)
  )
}
