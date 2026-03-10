import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from './firebaseConfig';

const AUTH_ERROR_MESSAGES = {
  'auth/invalid-email': 'O e-mail informado e invalido.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/user-disabled': 'Este usuario foi desativado.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns instantes e tente novamente.',
  'auth/network-request-failed': 'Falha de conexao. Verifique sua internet e tente novamente.'
};

export function observeAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function signInAdmin(email, password) {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
}

export async function signOutAdmin() {
  await signOut(auth);
}

export function getAuthErrorMessage(error) {
  return AUTH_ERROR_MESSAGES[error?.code] || 'Nao foi possivel autenticar. Tente novamente.';
}