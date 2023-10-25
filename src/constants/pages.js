const DEFAULT_BROWSER_TITLE = "Color N Curls";
const seperator = " - ";

const HOME = {
  TITLE: "Color N Curls",
  BROWSER_TITLE: DEFAULT_BROWSER_TITLE + seperator + "Home Page",
};

const LOGIN = {
  TITLE: "Login",
  LOGOUT_TITLE: "Logout",
  BROWSER_TITLE: DEFAULT_BROWSER_TITLE + seperator + "Login Page",
  REGISTER_LINK_TITLE: "Not a registered User.",
  REGISTER_LINK_SUB_TITLE: "Click here!",
};

const REGISTER = {
  TITLE: "Register",
  BACK_TO_LOGIN: "Back to Login!",
};

const BOOK_APPOINTMENT = {
  TITLE: "Book Appointment",
  BROWSER_TITLE: DEFAULT_BROWSER_TITLE + seperator + "Book Appointment Page",
};

const BOOKED_APPOINTMENT = {
  TITLE: "Booked Appointment",
  BROWSER_TITLE: DEFAULT_BROWSER_TITLE + seperator + "Booked Appointment Page",
};

const ERRORS = {
  INVALID_USER: "Invalid User!",
  SERVICE_UNAVAILABLE: "Service Unavailable. Please try again after sometime!",
};

export {
  DEFAULT_BROWSER_TITLE,
  HOME,
  LOGIN,
  REGISTER,
  BOOK_APPOINTMENT,
  BOOKED_APPOINTMENT,
  ERRORS,
};
