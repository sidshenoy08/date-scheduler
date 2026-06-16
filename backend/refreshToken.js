import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar"
];

const auth = await authenticate({
  scopes: SCOPES,
  keyfilePath: path.join(process.cwd(), "credentials.json"),
});

const client = auth;

const tokens = client.credentials;

console.log("Refresh token:");
console.log(tokens.refresh_token);