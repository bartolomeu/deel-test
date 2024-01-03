import { API_URL, getAuthorizationHeader } from "./util";

export function getUnpaidJobs(id) {
  return fetch(`${API_URL}/jobs/unpaid`, getAuthorizationHeader(id));
}

export function postPayJob(id, userID) {
  const options = getAuthorizationHeader(userID);
  options.method = "POST";
  return fetch(`${API_URL}/jobs/${id}/pay`, options);
}