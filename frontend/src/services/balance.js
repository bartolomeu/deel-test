import { API_URL, getAuthorizationHeader } from "./util";

export function postDeposit(userID, body) {
  const options = getAuthorizationHeader(userID);
  options.method = "POST";
  options.body = JSON.stringify(body);
  return fetch(`${API_URL}/balances/deposit/${userID}`, options);
}