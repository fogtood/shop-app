const firebaseErrorMessages = {
  // General Errors
  "auth/network-request-failed":
    "Network issue occurred. Please check your connection and try again.",
  "auth/operation-not-allowed":
    "This operation is not allowed. Please contact support.",
  "auth/too-many-requests": "Too many requests. Please try again later.",
  "auth/internal-error": "An internal error occurred. Please try again later.",

  // Sign-In Errors
  "auth/user-not-found": "No user found with the provided credentials.",
  "auth/wrong-password": "The password is incorrect. Please try again.",
  "auth/invalid-email":
    "The email address is not valid. Please check and try again.",
  "auth/user-disabled":
    "The user account has been disabled by an administrator.",
  "auth/requires-recent-login":
    "This operation requires recent authentication. Please log in again.",

  // Sign-Up Errors
  "auth/email-already-in-use":
    "The email address is already associated with another account.",
  "auth/weak-password":
    "The password is too weak. Please choose a stronger password.",

  // Social Authentication Errors
  "auth/popup-closed-by-user":
    "Sign-in popup was closed before completing the sign-in. Please try again.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email address but different sign-in credentials.",
  "auth/credential-already-in-use":
    "This credential is already associated with a different account.",
  "auth/unauthorized-domain":
    "This domain is not authorized for OAuth operations. Please contact support.",

  // Verification & Reset Errors
  "auth/missing-email":
    "No email address was provided. Please enter your email and try again.",
  "auth/invalid-action-code": "The link provided is invalid or has expired.",
  "auth/user-token-expired":
    "The user's token has expired. Please log in again.",
  "auth/email-not-verified":
    "The email address has not been verified. Please verify your email and try again.",

  // Miscellaneous
  "auth/invalid-credential":
    "The provided credential is not valid. Please try again.",
  "auth/user-mismatch":
    "The provided credentials do not match the existing user.",
  "auth/provider-already-linked":
    "This account is already linked to a different provider.",
  "auth/captcha-check-failed":
    "The reCAPTCHA verification failed. Please try again.",
  "auth/invalid-verification-code":
    "The verification code is invalid. Please check and try again.",
  "auth/invalid-verification-id":
    "The verification ID is invalid. Please try again.",

  // Add additional error codes as needed for your use case
};

export { firebaseErrorMessages };
