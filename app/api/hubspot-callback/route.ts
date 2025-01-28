// app/api/hubspot-callback/route.ts
import { NextResponse } from "next/server";

let hubspotAccessToken: string | null = null;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Authorization code not provided" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.hubapi.com/oauth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_SECRET!,
        redirect_uri: "http://localhost:3000/api/hubspot-callback",
        code: code,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      return NextResponse.json({ error: errorDetails }, { status: response.status });
    }

    const data = await response.json();
    hubspotAccessToken = data.access_token;

    return NextResponse.redirect("http://localhost:3000");
  } catch (error) {
    return NextResponse.json({ error: "Failed to exchange code for token" }, { status: 500 });
  }
}
export function getHubspotAccessToken() {
  return hubspotAccessToken;
}
