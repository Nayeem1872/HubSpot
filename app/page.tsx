"use client";

import { useState, useEffect } from "react";
import TableContact from "./components/Table";
import AddContactDialog from "./components/AddContactDialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const HUBSPOT_OAUTH_URL = `https://app.hubspot.com/oauth/authorize?client_id=65f1d874-f9db-49fd-8d40-80d0697a5abf&redirect_uri=http://localhost:3000/api/hubspot-callback&scope=crm.objects.contacts.read%20crm.objects.contacts.write%20oauth`;

  useEffect(() => {
    const checkConnection = async () => {
      const response = await fetch("/api/check-hubspot-connection");
      const result = await response.json();
      setIsConnected(result.isConnected);
    };

    checkConnection();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        {!isConnected ? (
          <Button onClick={() => (window.location.href = HUBSPOT_OAUTH_URL)}>
            Connect to HubSpot
          </Button>
        ) : (
          <p className="text-green-500">Connected to HubSpot</p>
        )}
      </div>

      {isConnected && (
        <>
          <div className="flex justify-between items-center mb-6">
            <AddContactDialog />
          </div>
          <TableContact />
        </>
      )}
    </div>
  );
}
