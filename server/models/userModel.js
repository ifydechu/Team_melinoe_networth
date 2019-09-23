class User {
  constructor(id, firstName, lastName, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    //TODO: encrypt password
    this.password = encryptedPassword(password);
  }
}

export default User;
