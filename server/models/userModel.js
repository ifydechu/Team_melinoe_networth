class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    //TODO: encrypt password
    this.password = encryptedPassword(password);
  }
}

export default User;
