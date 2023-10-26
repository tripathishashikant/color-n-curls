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
  REQUIRED: "This field is required.",
  MAX_LENGTH_30: "This field can have a maximum of 30 characters.",
  MIN_LENGTH_6: "This field should have a length of 6 characters.",
  ONLY_ALPHABET_SPACE: "This field support only alphabets and spaces.",
  MIN_1_UPPERCASE: "This field should have atleast 1 uppercase character.",
  MIN_1_LOWERCASE: "This field should have atleast 1 lowercase characters.",
  MIN_1_SPECIAL_CHAR: "This field should atleast have a specidal character.",
  VALID_EMAIL_FORMAT: "Please enter valid email format.",
  VALID_DATE_FORMAT: "Please enter date in 'dd-mm-yyyy' format.",
};

const INFO = {
  REGISTER_SUCCESSFULLY: "Customer register successfully!",
};

export {
  DEFAULT_BROWSER_TITLE,
  HOME,
  LOGIN,
  REGISTER,
  BOOK_APPOINTMENT,
  BOOKED_APPOINTMENT,
  ERRORS,
  INFO,
};
