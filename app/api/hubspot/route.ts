import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, firstName, lastName, address, city, zipCode, country } = body;

    const response = await fetch('https://api.hubspot.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`, 
      },
      body: JSON.stringify({
        properties: {
          email,
          firstname: firstName,
          lastname: lastName,
          address, 
          city,    
          zip: zipCode, 
          country,
        },
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      return NextResponse.json({ error: errorDetails }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ message: 'Contact created successfully', data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}
export async function GET() {
  try {
    const response = await fetch(
      'https://api.hubspot.com/crm/v3/objects/contacts?properties=email,firstname,lastname,address,city,zip,country',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`, 
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      return NextResponse.json({ error: errorDetails }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ contacts: data.results });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}