// DSS (Digital Signature Standard) utility functions

/**
 * Modular exponentiation: (base^exp) % mod
 */
export function modPow(base, exp, mod) {
  let result = 1n;
  base = BigInt(base) % BigInt(mod);
  exp = BigInt(exp);
  mod = BigInt(mod);

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return Number(result);
}

/**
 * Modular inverse using Extended Euclidean Algorithm
 */
export function modInverse(a, m) {
  a = ((a % m) + m) % m;
  
  // Using simple method for small numbers
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return null;
}

/**
 * Check if a number is prime
 */
export function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

/**
 * Validate DSS parameters
 */
export function validateParams(p, q, g, x) {
  const errors = [];

  if (!isPrime(p)) {
    errors.push('p must be a prime number');
  }
  
  if (!isPrime(q)) {
    errors.push('q must be a prime number');
  }
  
  if ((p - 1) % q !== 0) {
    errors.push('q must divide (p - 1)');
  }
  
  if (!(x > 0 && x < q)) {
    errors.push('Private key x must satisfy 0 < x < q');
  }

  return errors;
}

/**
 * Generate DSS keys
 */
export function generateKeys(p, q, g, x) {
  const y = modPow(g, x, p);
  return { p, q, g, x, y };
}

/**
 * Sign a message using DSS
 */
export function signMessage(message, params, k = 7) {
  const { p, q, g, x } = params;
  const H = message.length % q; // Simple hash function for demo
  
  const r = modPow(g, k, p) % q;
  const kInv = modInverse(k, q);
  const s = (kInv * (H + x * r)) % q;
  
  return { r, s };
}

/**
 * Verify a DSS signature
 */
export function verifySignature(message, signature, params) {
  const { p, q, g, y } = params;
  const { r, s } = signature;
  const H = message.length % q;
  
  // Validate r and s are in valid range
  if (r <= 0 || r >= q || s <= 0 || s >= q) {
    return { valid: false, error: 'r or s out of valid range' };
  }
  
  const w = modInverse(s, q);
  const u1 = (H * w) % q;
  const u2 = (r * w) % q;
  const v = ((modPow(g, u1, p) * modPow(y, u2, p)) % p) % q;
  
  return { valid: v === r, v, r };
}
