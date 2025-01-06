import { useEffect, useState } from "react";
import Container from "../layout/Container";

const Client = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "https://202.44.12.87:1337/api/clients?populate=uploadfiles"
        );
        const data = await response.json();
        setClients(data.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="flex flex-col justify-center py-8">
      <div className="text-center font-bold text-gray-400 text-xl">
        Trusted by the biggest companies
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-10 items-center">
        {clients.map((client) => (
          <div
            key={client.id}
            className="pt-2 text-gray-400 dark:text-gray-400 px-6"
          >
            <img
              src={`https://202.44.12.87:1337${client.attributes.uploadfiles.data.attributes.url}`}
              alt={client.attributes.name_en}
              width={client.attributes.uploadfiles.data.attributes.width}
              height={client.attributes.uploadfiles.data.attributes.height}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
