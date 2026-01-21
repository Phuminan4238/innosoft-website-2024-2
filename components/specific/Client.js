import { useEffect, useState } from "react";
import Container from "../layout/Container";

const DEFAULT_CLIENT_LOGO = "/img/innosoft-logo.png";

// ถ้าดึงจากของจริงไม่ได้ (ติด CORS / ไม่มี data) จะใช้ชุดนี้แทน
const FALLBACK_CLIENTS = [
  {
    id: "fb-1",
    name: "KMUTT",
    logo: DEFAULT_CLIENT_LOGO,
  },
  {
    id: "fb-2",
    name: "CPE",
    logo: DEFAULT_CLIENT_LOGO,
  },
  {
    id: "fb-3",
    name: "RIPO",
    logo: DEFAULT_CLIENT_LOGO,
  },
  {
    id: "fb-4",
    name: "Informatics",
    logo: DEFAULT_CLIENT_LOGO,
  },
  {
    id: "fb-5",
    name: "KMUTT Partner",
    logo: DEFAULT_CLIENT_LOGO,
  },
];

const Client = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // ✅ เรียกของตัวเอง (proxy) เพื่อตัดปัญหา CORS เวลาอยู่ localhost
        // อย่าลืมมี /pages/api/clients.js ตามที่บอกไว้ก่อนหน้านี้
        const response = await fetch("/api/clients");
        const data = await response.json();

        if (Array.isArray(data?.data) && data.data.length > 0) {
          // map ให้เป็นรูปแบบที่ใช้ render ได้เลย
          const mapped = data.data.map((client) => {
            const attrs = client.attributes || {};
            const media = attrs.uploadfiles?.data;

            let logo = "";

            // เคส Strapi ส่ง object เดียว
            if (media && !Array.isArray(media)) {
              logo = `https://innosoft.kmutt.ac.th${media.attributes.url}`;
            }
            // เคส Strapi ส่ง array
            else if (Array.isArray(media) && media[0]) {
              logo = `https://innosoft.kmutt.ac.th${media[0].attributes.url}`;
            }

            return {
              id: client.id,
              name: attrs.name_en || attrs.name_th || "Client",
              logo: logo || DEFAULT_CLIENT_LOGO,
            };
          });

          setClients(mapped);
        } else {
          // ถ้าเรียกได้แต่ไม่มี data -> ใช้ fallback
          setClients(FALLBACK_CLIENTS);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        // ❗️โดน CORS / fetch fail -> ใช้ของในโปรเจ็กต์แทน
        setClients(FALLBACK_CLIENTS);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="flex flex-col justify-center py-8">
      <Container>
        <div className="text-center font-bold text-gray-400 text-sm uppercase tracking-wide">
          ORGANIZATIONS WE’VE WORKED WITH
        </div>
        <div className="text-center text-gray-700 text-base mt-1">
          Trusted by the biggest companies
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-10 items-center">
          {clients.map((client) => (
            <div
              key={client.id}
              className="pt-2 px-6 flex justify-center items-center"
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_CLIENT_LOGO;
                  }}
                  className="max-h-14 object-contain w-auto" // ✅ กัน warning รูปยืด
                />
              ) : (
                <span className="text-gray-400 text-xs">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Client;
