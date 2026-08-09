// Configuration settings for the frontend application
// Automatically uses the local Spring Boot backend (port 8080) when running on localhost,
// and the current server's origin (e.g., for EC2/domain reverse-proxy deployments) in production.
export const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8080'
  : window.location.origin;

