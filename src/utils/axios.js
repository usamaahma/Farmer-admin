import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/v1"; // <-- change this to your local API base if needed

// Create instances with consistent base URLs
const auth = axios.create({
  baseURL: `${baseURL}/auth`,
});
const users = axios.create({
  baseURL: `${baseURL}/users`,
});
const crop = axios.create({
  baseURL: `${baseURL}/crop`,
});
const event = axios.create({
  baseURL: `${baseURL}/event`,
});
const contact = axios.create({
  baseURL: `${baseURL}/contact`,
});
const orders = axios.create({
  baseURL: `${baseURL}/checkout`,
});
const requestInterceptor = (req) => {
  return req;
};

const errorInterceptor = (err) => {
  console.error("Request failed:", err);
  return Promise.reject(err);
};

// Apply interceptors
[users, crop, auth, event, contact, orders].forEach((instance) => {
  instance.interceptors.request.use(requestInterceptor, errorInterceptor);
});

export { users, auth, crop, event, contact, orders };
