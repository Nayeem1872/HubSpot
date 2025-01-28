import { NextResponse } from "next/server";
import { getHubspotAccessToken } from "../hubspot-callback/route";

export async function GET() {
  const token = getHubspotAccessToken();
  const isConnected = !!token; // Check if the token is not null or undefined
  return NextResponse.json({ isConnected });
}
