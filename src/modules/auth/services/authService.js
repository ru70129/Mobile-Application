import User from '../models/User';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const mockUsers = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const validateEmail = (email) => {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim().toLowerCase());
};

export const validatePassword = (password) => {
  return typeof password === 'string' && password.length >= MIN_PASSWORD_LENGTH;
};

export const login = async ({ email, password }) => {
  await delay(500);

  if (!validateEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!validatePassword(password)) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = mockUsers.find((item) => item.email.toLowerCase() === normalizedEmail);

  if (!existingUser || existingUser.password !== password) {
    throw new Error('Invalid email or password.');
  }

  return new User({ id: existingUser.id, name: existingUser.name, email: existingUser.email });
};

export const signup = async ({ email, password }) => {
  await delay(500);

  if (!validateEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!validatePassword(password)) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = mockUsers.find((item) => item.email.toLowerCase() === normalizedEmail);

  if (existingUser) {
    throw new Error('An account with this email already exists.');
  }

  const newUser = {
    id: `${Date.now()}`,
    name: normalizedEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') || 'User',
    email: normalizedEmail,
    password,
  };

  mockUsers.push(newUser);

  return new User({ id: newUser.id, name: newUser.name, email: newUser.email });
};

export const forgotPassword = async (email) => {
  await delay(500);

  if (!validateEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = mockUsers.find((item) => item.email.toLowerCase() === normalizedEmail);

  if (!existingUser) {
    throw new Error('No account found with that email address.');
  }

  return { message: 'A password reset link was sent to your email address.' };
};
