const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

export function validateUser(user) {
  return {
    FirstName: !validateRequired(user.FirstName)
      ? "First Name is Required"
      : "",
    LastName: !validateRequired(user.LastName) ? "Last Name is Required" : "",
    Email: !validateEmail(user.Email) ? "Incorrect Email Format" : "",
  };
}
