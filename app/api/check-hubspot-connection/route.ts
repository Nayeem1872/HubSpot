import { NextResponse } from "next/server";
import { getHubspotAccessToken } from "../hubspot-callback/route";

export async function GET() {
  const token = getHubspotAccessToken();
  const isConnected = !!token; 
  return NextResponse.json({ isConnected });
}
