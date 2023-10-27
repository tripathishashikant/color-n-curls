<template>
  <div class="profile">
    <div class="profile__wrapper">
      <h2 class="profile__title">{{ PROFILE.TITLE }}</h2>
      <div class="profile__infoWrapper">
        <p v-if="isCustomerUpdated" class="profile__info info__ribbon">
          {{ INFO.UPDATED_SUCCESSFULLY }}
        </p>
      </div>
      <div class="profile__errorWrapper">
        <p v-if="isServiceError" class="profile__error error__ribbon">
          {{ ERRORS.SERVICE_UNAVAILABLE }}
        </p>
      </div>
      <div class="profile__formWrapper">
        <form class="profile__form">
          <div class="profile__formElement">
            <label
              class="profile__label profile__label--name"
              title="Enter username here"
              for="registerUserName"
            >
              <input
                id="profileUserName"
                class="profile__input profile__input--name"
                type="text"
                placeholder="Enter customer name"
                :class="{ errors__source: isValidName }"
                v-model="customer.name"
                @blur="validateName()"
              />
            </label>
            <div class="profile__errors">
              <p class="errors__title" v-show="validation.name.required">
                {{ ERRORS.REQUIRED }}
              </p>
              <p class="errors__title" v-if="validation.name.maxLength">
                {{ ERRORS.MAX_LENGTH_30 }}
              </p>
              <p class="errors__title" v-if="validation.name.characters">
                {{ ERRORS.ONLY_ALPHABET_SPACE }}
              </p>
            </div>
          </div>
          <div class="profile__formElement">
            <label
              class="profile__label profile__label--password"
              title="Enter password here"
              for="profilePassword"
            >
              <input
                id="profilePassword"
                class="profile__input profile__input--password"
                type="text"
                placeholder="Enter password"
                :class="{ errors__source: isValidPassword }"
                v-model="customer.password"
                @blur="validatePassword()"
              />
            </label>
            <div class="profile__errors">
              <p class="errors__title" v-show="validation.password.required">
                {{ ERRORS.REQUIRED }}
              </p>
              <p class="errors__title" v-if="validation.password.minLength">
                {{ ERRORS.MIN_LENGTH_6 }}
              </p>
              <p class="errors__title" v-if="validation.password.upperCase">
                {{ ERRORS.MIN_1_UPPERCASE }}
              </p>
              <p class="errors__title" v-if="validation.password.lowerCase">
                {{ ERRORS.MIN_1_LOWERCASE }}
              </p>
              <p class="errors__title" v-if="validation.password.characters">
                {{ ERRORS.MIN_1_SPECIAL_CHAR }}
              </p>
            </div>
          </div>
          <div class="profile__formElement">
            <label
              class="profile__label profile__label--email"
              title="Enter email address"
              for="profileEmail"
            >
              <input
                id="profileEmail"
                type="email"
                placeholder="Enter email address"
                class="profile__input profile__input--email"
                :class="{ errors__source: isValidEmail }"
                v-model="customer.email"
                @blur="validateEmail()"
              />
            </label>
            <div class="profile__errors">
              <p class="errors__title" v-show="validation.email.required">
                {{ ERRORS.REQUIRED }}
              </p>
              <p class="errors__title" v-if="validation.email.format">
                {{ ERRORS.VALID_EMAIL_FORMAT }}
              </p>
            </div>
          </div>
          <div class="profile__formElement">
            <label
              class="profile__label profile__label--dob"
              title="Select date of birth"
              for="registerDob"
            >
              <input
                id="profileDob"
                class="profile__input profile__input--dob"
                type="date"
                placeholder="Select date of birth"
                :class="{ errors__source: isValidDOB }"
                v-model="customer.dob"
                @blur="validateDOB()"
              />
            </label>
            <div class="profile__errors">
              <p class="errors__title" v-show="validation.dob.required">
                {{ ERRORS.REQUIRED }}
              </p>
              <p class="errors__title" v-if="validation.dob.format">
                {{ ERRORS.VALID_DATE_FORMAT }}
              </p>
            </div>
          </div>
          <div class="profile__btnWrapper">
            <button
              class="profile__btn"
              type="submit"
              :disabled="hasError"
              @click.prevent="updateProfile()"
            >
              {{ PROFILE.SUBMIT_BTN }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { PROFILE, ERRORS, INFO } from "../../constants/pages";

const store = useStore();

const customer = reactive(store.getters["customerStore/getCustomer"]);

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

const isCustomerUpdated = computed(
  () => store.getters["customerStore/isCustomerUpdated"]
);

const hasError = computed(() => {
  return (
    isValidName.value ||
    isValidPassword.value ||
    isValidEmail.value ||
    isValidDOB.value
  );
});

// methods
const validateName = () => {
  const regex = /^[A-Za-z ]*$/;

  validation.name.required = customer.name === "";
  validation.name.maxLength = customer.name.length > 30;
  validation.name.characters = !regex.test(customer.name);
};

const validatePassword = () => {
  const regexPassword = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const regexLowerCase = /[a-z]/;
  const regexUpperCase = /[A-Z]/;

  validation.password.required = customer.password === "";
  validation.password.minLength = customer.password.length < 6;
  validation.password.characters = !regexPassword.test(customer.password);
  validation.password.lowerCase = !regexLowerCase.test(customer.password);
  validation.password.upperCase = !regexUpperCase.test(customer.password);
};

const validateEmail = () => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  validation.email.required = customer.email === "";
  validation.email.format = !regex.test(customer.email);
};

const validateDOB = () => {
  const dobRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  validation.dob.required = customer.dob === "";
  validation.dob.format = !dobRegex.test(customer.dob);
};

const updateProfile = () => {
  if (hasError.value) {
    return false;
  }

  const updatedCustomerDetails = {
    id: customer.id,
    name: customer.name,
    password: customer.password,
    email: customer.email,
    dob: customer.dob,
  };
  store.dispatch("customerStore/updateCustomer", updatedCustomerDetails);
};
</script>

<style scoped>
.profile__title {
  text-align: center;
}
.profile__formWrapper {
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.profile__form {
  display: block;
  width: 70%;
  margin: 0 auto;
}
.profile__label {
  display: block;
  padding: 1rem 0;
}
.profile__input {
  width: 100%;
}
.profile__btnWrapper {
  margin: 2rem 0;
  text-align: center;
}
.profile__btn {
  display: inline-block;
}
.profile__btn:disabled {
  background-color: gray;
}
.profile__error {
  margin-top: 1rem;
  padding: 1rem;

  color: red;
  border: maroon;
  background-color: #d39576;
}
.profile__loginLink {
  cursor: pointer;
}
</style>
