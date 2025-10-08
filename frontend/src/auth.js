// Simple front-only auth utility using localStorage
// Replace with real API calls later if needed

const AUTH_KEY = 'musee_auth_token';
const USERS_KEY = 'musee_users'; // array of { email, password, role }
const CURRENT_EMAIL_KEY = 'musee_current_email';

// Super admin seed (front-only demo)
const SUPER_ADMIN_EMAIL = 'admin@gmail.com';
const SUPER_ADMIN_PASSWORD = '1234';

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function ensureSeedAdmin() {
  const users = getUsers();
  const exists = users.some(u => u.email.toLowerCase() === SUPER_ADMIN_EMAIL);
  if (!exists) {
    users.push({ email: SUPER_ADMIN_EMAIL, password: SUPER_ADMIN_PASSWORD, role: 'admin' });
    saveUsers(users);
  }
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(AUTH_KEY));
}

export async function signup(email, password) {
  if (!email || !password) {
    throw new Error('Veuillez saisir un email et un mot de passe.');
  }
  const formatOk = /.+@.+\..+/.test(email) && password.length >= 4;
  if (!formatOk) {
    throw new Error('Format invalide (email ou mot de passe trop court).');
  }
  // Simulate API latency
  await new Promise(r => setTimeout(r, 400));
  const users = getUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    const e = new Error('Un compte avec cet email existe déjà.');
    e.code = 'USER_EXISTS';
    throw e;
  }
  users.push({ email, password, role: 'user' }); // In real app, hash password.
  saveUsers(users);
}

export async function login(email, password) {
  if (!email || !password) {
    throw new Error('Veuillez saisir un email et un mot de passe.');
  }
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  await new Promise(r => setTimeout(r, 300));
  if (!user) {
    const e = new Error("Aucun compte trouvé pour cet email. Veuillez vous inscrire.");
    e.code = 'USER_NOT_FOUND';
    throw e;
  }
  if (user.password !== password) {
    const e = new Error('Mot de passe incorrect.');
    e.code = 'WRONG_PASSWORD';
    throw e;
  }
  localStorage.setItem(AUTH_KEY, 'demo-token');
  localStorage.setItem(CURRENT_EMAIL_KEY, user.email);
  window.dispatchEvent(new Event('auth-changed'));
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(CURRENT_EMAIL_KEY);
  window.dispatchEvent(new Event('auth-changed'));
}

export function onAuthChange(cb) {
  const handler = () => cb(isAuthenticated());
  window.addEventListener('auth-changed', handler);
  return () => window.removeEventListener('auth-changed', handler);
}

export function getCurrentEmail() {
  return localStorage.getItem(CURRENT_EMAIL_KEY) || '';
}

export function isAdmin() {
  const email = getCurrentEmail();
  if (!email) return false;
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  return Boolean(user && user.role === 'admin');
}
