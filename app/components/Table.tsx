import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Contact = {
  id: string;
  properties: {
    email: string;
    firstname: string;
    lastname: string;
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
  };
};

export default function TableContact() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/hubspot');
        const result = await response.json();

        if (response.ok) {
          setContacts(result.contacts);
        } else {
          setError(result.error.message || 'Failed to fetch contacts');
        }
      } catch (err) {
        setError('An error occurred while fetching contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Zip</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.properties.email}</TableCell>
              <TableCell>
                {contact.properties.firstname} {contact.properties.lastname}
              </TableCell>
              <TableCell>{contact.properties.address || 'N/A'}</TableCell>
              <TableCell>{contact.properties.city || 'N/A'}</TableCell>
              <TableCell>{contact.properties.zip || 'N/A'}</TableCell>
              <TableCell>{contact.properties.country || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
