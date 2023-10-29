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
  SUBTITLE: "Select your person to change your world",
  DESCRIPTION: "Click and select the speciality that you want to choose from",
};

const APPOINTMENT_HISTORY = {
  TITLE: "Appointment History",
  BROWSER_TITLE: DEFAULT_BROWSER_TITLE + seperator + "Appointment History Page",
  NO_APPOINTMENT: "You have not made any appointments yet.",
};

const PROFILE = {
  TITLE: "Update Profile",
  BROWSER_TITLE: DEFAULT_BROWSER_TITLE + seperator + "Update Profile Page",
  SUBMIT_BTN: "Update",
};

const NOT_FOUND = {
  TITLE: "Not Found",
  BROWSER_TITLE: DEFAULT_BROWSER_TITLE + seperator + "Not Found Page",
};

const ERRORS = {
  TIMEOUT: 5000,
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
  TIMEOUT: 5000,
  REGISTER_SUCCESSFULLY: "Customer register successfully!",
  UPDATED_SUCCESSFULLY: "Customer record updated successfully!",
  BOOKED_SUCCESSFULLY: "Appointment booked successfully!",
};

export {
  DEFAULT_BROWSER_TITLE,
  HOME,
  LOGIN,
  REGISTER,
  BOOK_APPOINTMENT,
  APPOINTMENT_HISTORY,
  ERRORS,
  INFO,
  PROFILE,
  NOT_FOUND,
};
