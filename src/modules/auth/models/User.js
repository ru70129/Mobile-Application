export default class User {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static fromEmail(email) {
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const localPart = normalizedEmail.split('@')[0] || 'User';
    return new User({
      id: normalizedEmail,
      name: localPart.charAt(0).toUpperCase() + localPart.slice(1),
      email: normalizedEmail,
    });
  }
}
