import Vue from 'vue'

import {
  ValidationProvider,
  extend,
  setInteractionMode,
  localize
} from 'vee-validate'

import {
  required,
  email,
  max,
  min,
  confirmed,
  image,
  size
} from 'vee-validate/dist/rules'

import store from '../store'

// Validation Mode: lazy
// Validates on change or blur depending on the input type.
setInteractionMode('lazy')

// Set localized error messages
const defaultRequired = 'This field is required'

localize({
  en: {
    fields: {
      Email: {
        required: defaultRequired,
        email: 'Invalid email format',
        unique: 'Email already taken',
        max: 'Exceeded the limit of 255 characters',
        must_exist: 'Email address does not exist'
      },
      Password: {
        required: defaultRequired,
        min: 'Password must be at least 6 characters long'
      },
      'Confirm Password': {
        confirmed: 'Password and Confirm Password fields must match.',
        required: defaultRequired
      },
      'First Name': {
        required: defaultRequired,
        max: 'Exceeded the limit of 255 characters'
      },
      'Last Name': {
        required: defaultRequired,
        max: 'Exceeded the limit of 255 characters'
      },
      'Middle Name': {
        max: 'Exceeded the limit of 255 characters'
      },
      Birthday: {
        valid_date: 'Format must be YYYY-MM-DD'
      },
      'Mobile Number': {
        valid_mobile_number: 'Format must be +639XXXXXXXXX'
      },
      'Home Address': {
        max: 'Exceeded the limit of 255 characters'
      },
      Barangay: {
        max: 'Exceeded the limit of 255 characters'
      },
      City: {
        max: 'Exceeded the limit of 255 characters'
      },
      Region: {
        max: 'Exceeded the limit of 255 characters'
      },
      'Profile Picture': {
        image: 'Profile picture must be an image',
        size: 'Image size must not exceed 5MB'
      }
    }
  }
})

// You can override the default message by adding the *message* field
extend('required', {...required})
extend('email', {...email})
extend('min', {...min})
extend('max', {...max})
extend('confirmed', {...confirmed})
extend('image', {...image})
extend('size', {...size})

//**CUSTOM RULES**
extend('unique', {
  validate: async (value) => {
    let available = true
    try {
      available = await store.dispatch('handleEmailAvailability', value) //para san po ito? -lei
    } catch (err) {
      console.error(err)
    }

    return available
  }
})

extend('must_exist', {
  validate: async (value) => {
    let available = true

    try {
      available = await store.dispatch('handleEmailAvailability', value)
    } catch (err) {
      console.error(err)
    }

    return !available
  }
})

extend('valid_date', {
  validate: (value) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/ //regular expression to check format if "YYYY-MM-DD"

    return value.match(regEx)
  }
})

extend('valid_mobile_number', {
  validate: (value) => {
    const regEx = /^(\+639)\d{9}$$/ //regular expression to check format if "+639XXXXXXXXX"

    return value.match(regEx)
  }
})

Vue.component('ValidationProvider', ValidationProvider)
