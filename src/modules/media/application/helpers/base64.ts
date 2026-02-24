// modules/media/application/helpers/base64.ts
import crypto from "crypto";

export function parseBase64(input: string) {
  const dataUrlMatch = input.match(/^data:(.+);base64,(.*)$/);

  const contentType = dataUrlMatch?.[1];
  const base64 = dataUrlMatch?.[2] ?? input;

  // valida base64 básico
  if (!/^[A-Za-z0-9+/=]+$/.test(base64)) {
    throw new Error("Invalid base64 payload");
  }

  const buffer = Buffer.from(base64, "base64");

  // limite simples (ex.: 10MB)
  const MAX_BYTES = 10 * 1024 * 1024;
  if (buffer.byteLength > MAX_BYTES) {
    throw new Error("File too large");
  }

  const hash = crypto.createHash("sha1").update(buffer).digest("hex");
  return { buffer, contentType, hash };
}

export function normalizeToArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}