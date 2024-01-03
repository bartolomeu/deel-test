export function getAuthorizationHeader(id) {
  return { headers: { 
    profile_id: id,
    'content-type': 'application/json'
  } };
}
export const API_URL = 'http://localhost:3001';