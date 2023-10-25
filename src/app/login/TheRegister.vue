<template>
  <div class="register">
    <div class="register__wrapper">
      <h2 class="register__title">{{ REGISTER.TITLE }}</h2>
      <div class="register__errorWrapper">
        <p v-if="isServiceError" class="register__error error__ribbon">
          Service error while adding customer data. Please try again!
        </p>
      </div>
      <div class="register__formWrapper">
        <form class="register__form">
          <div class="register__formElement">
            <label
              class="register__label register__label--name"
              title="Enter username here"
              for="registerUserName"
            >
              <input
                id="registerUserName"
                class="register__input register__input--name"
                type="text"
                placeholder="Enter customer name"
                :class="{ errors__source: isValidName }"
                v-model="formFields.name"
                @blur="validateName()"
              />
            </label>
            <div class="register__errors">
              <p class="errors__title" v-show="validation.name.required">
                This field is required.
              </p>
              <p class="errors__title" v-if="validation.name.maxLength">
                This field can have a maximum of 30 characters.
              </p>
              <p class="errors__title" v-if="validation.name.characters">
                This field support only alphabets and spaces.
              </p>
            </div>
          </div>
          <div class="register__formElement">
            <label
              class="register__label register__label--password"
              title="Enter password here"
              for="registerPassword"
            >
              <input
                id="registerPassword"
                class="register__input register__input--password"
                type="text"
                placeholder="Enter password"
                :class="{ errors__source: isValidPassword }"
                v-model="formFields.password"
                @blur="validatePassword()"
              />
            </label>
            <div class="register__errors">
              <p class="errors__title" v-show="validation.password.required">
                This field is required.
              </p>
              <p class="errors__title" v-if="validation.password.minLength">
                This field should have a length of 6 characters.
              </p>
              <p class="errors__title" v-if="validation.password.upperCase">
                This field should have atleast 1 uppercase character.
              </p>
              <p class="errors__title" v-if="validation.password.lowerCase">
                This field should have atleast 1 lowercase characters.
              </p>
              <p class="errors__title" v-if="validation.password.characters">
                This field should atleast have a specidal charaters.
              </p>
            </div>
          </div>
          <div class="register__formElement">
            <label
              class="register__label register__label--email"
              title="Enter email address"
              for="registeremail"
            >
              <input
                id="registeremail"
                type="email"
                placeholder="Enter email address"
                class="register__input register__input--email"
                :class="{ errors__source: isValidEmail }"
                v-model="formFields.email"
                @blur="validateEmail()"
              />
            </label>
            <div class="register__errors">
              <p class="errors__title" v-show="validation.email.required">
                This field is required.
              </p>
              <p class="errors__title" v-if="validation.email.format">
                Please enter valid email format.
              </p>
            </div>
          </div>
          <div class="register__formElement">
            <label
              class="register__label register__label--dob"
              title="Select date of birth"
              for="registerDob"
            >
              <input
                id="registerDob"
                class="register__input register__input--dob"
                type="date"
                placeholder="Select date of birth"
                :class="{ errors__source: isValidDOB }"
                v-model="formFields.dob"
                @blur="validateDOB()"
              />
            </label>
            <div class="register__errors">
              <p class="errors__title" v-show="validation.dob.required">
                This field is required.
              </p>
              <p class="errors__title" v-if="validation.dob.format">
                Please enter date in 'dd-mm-yyyy' format.
              </p>
            </div>
          </div>
          <div class="register__btnWrapper">
            <button
              class="register__btn"
              type="submit"
              :disabled="!submitted"
              @click.prevent="register()"
            >
              {{ REGISTER.TITLE }}
            </button>
            <p class="register__loginTitle">
              <a class="register__loginLink" @click="openLoginModule">
                {{ REGISTER.BACK_TO_LOGIN }}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits, computed } from "vue";
import { useStore } from "vuex";
import { REGISTER } from "../../constants/pages";

const emit = defineEmits(["openLoginPage"]);

const store = useStore();

const formFields = reactive({
  name: null,
  password: null,
  email: null,
  dob: null,
});

const validation = reactive({
  name: {
    required: false,
    maxLength: false,
    characters: false,
  },
  password: {
    required: false,
    minLength: false,
    lowerCase: false,
    upperCase: false,
    characters: false,
  },
  email: {
    required: false,
    format: false,
  },
  dob: {
    required: false,
    format: false,
  },
});

const submitted = ref(false);

// computed
const isValidName = computed(() => {
  return (
    validation.name.required ||
    validation.name.maxLength ||
    validation.name.characters
  );
});

const isValidPassword = computed(
  () =>
    validation.password.required ||
    validation.password.minLength ||
    validation.password.characters ||
    validation.password.lowerCase ||
    validation.password.upperCase
);

const isValidEmail = computed(
  () => validation.email.required || validation.email.format
);

const isValidDOB = computed(
  () => validation.dob.required || validation.dob.format
);

const isServiceError = computed(
  () => store.getters["customerStore/serviceError"]
);

// const isButtonDisabled = computed(() => submitted.value);

// methods
const validateName = () => {
  const regex = /^[A-Za-z ]*$/;

  console.log("name ", formFields.name);

  if (formFields.name === null) {
    validation.name.required = true;
    validation.name.maxLength = true;
    validation.name.characters = true;

    return;
  }

  validation.name.required = formFields.name === "";
  validation.name.maxLength = formFields.name.length > 30;
  validation.name.characters = !regex.test(formFields.name);
  checkAllFieldsValid();
};

const validatePassword = () => {
  const regexPassword = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const regexLowerCase = /[a-z]/;
  const regexUpperCase = /[A-Z]/;

  if (formFields.password === null) {
    validation.password.required = true;
    validation.password.minLength = true;
    validation.password.characters = true;
    validation.password.lowerCase = true;
    validation.password.upperCase = true;

    return;
  }

  validation.password.required = formFields.password === "";
  validation.password.minLength = formFields.password.length < 6;
  validation.password.characters = !regexPassword.test(formFields.password);
  validation.password.lowerCase = !regexLowerCase.test(formFields.password);
  validation.password.upperCase = !regexUpperCase.test(formFields.password);
  checkAllFieldsValid();
};

const validateEmail = () => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (formFields.password === null) {
    validation.email.required = true;
    validation.email.format = true;

    return true;
  }

  validation.email.required = formFields.email === "";
  validation.email.format = !regex.test(formFields.email);
  checkAllFieldsValid();
};

const validateDOB = () => {
  const dobRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  if (formFields.password === null) {
    validation.dob.required = true;
    validation.dob.format = true;
    return true;
  }

  validation.dob.required = formFields.dob === "";
  validation.dob.format = !dobRegex.test(formFields.dob);
  checkAllFieldsValid();
};

const clearFormFields = () => {
  formFields.name = null;
  formFields.password = null;
  formFields.email = null;
  formFields.dob = null;
  submitted.value = false;
};

const openLoginModule = () => {
  clearFormFields();
  emit("openLoginPage");
};

const checkAllFieldsValid = () => {
  submitted.value = !(
    isValidName.value ||
    isValidPassword.value ||
    isValidEmail.value ||
    isValidDOB.value
  );
};

const register = () => {
  if (!submitted.value) {
    return false;
  }

  validateName();
  validatePassword();
  validateEmail();
  validateDOB();

  const newCustomerDetails = {
    name: formFields.name,
    password: formFields.password,
    email: formFields.email,
    dob: formFields.dob,
  };
  store.dispatch("customerStore/addCustomer", newCustomerDetails);
  clearFormFields();
};
</script>

<style scoped>
.register__title {
  text-align: center;
}
.register__formWrapper {
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.register__form {
  display: block;
  width: 70%;
  margin: 0 auto;
}
.register__label {
  display: block;
  padding: 1rem 0;
}
.register__input {
  width: 100%;
}
.register__btnWrapper {
  padding-bottom: 2rem;
  text-align: center;
}
.register__btn {
  display: inline-block;
}
.register__btn:disabled {
  background-color: gray;
}
.register__error {
  margin-top: 1rem;
  padding: 1rem;

  color: red;
  border: maroon;
  background-color: #d39576;
}
.register__loginLink {
  cursor: pointer;
}
</style>