import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const FALLBACK_SERVICES = [
  {
    id: "svc-1",
    topic: "rCloud / HPC",
    description: "บริการประมวลผลสมรรถนะสูงและระบบจัดเก็บข้อมูล",
    imageUrl: "/img/services/rcloud.jpg",
  },
  {
    id: "svc-2",
    topic: "Design & UX",
    description: "ออกแบบประสบการณ์และหน้าเว็บสำหรับระบบภายใน",
    imageUrl: "/img/services/design.jpg",
  },
  {
    id: "svc-3",
    topic: "Development",
    description: "พัฒนาเว็บแอป/ระบบสารสนเทศสำหรับหน่วยงานมหาวิทยาลัย",
    imageUrl: "/img/services/dev.jpg",
  },
  {
    id: "svc-4",
    topic: "Training",
    description: "อบรม/ถ่ายทอดเทคโนโลยีให้บุคลากรและนิสิตนักศึกษา",
    imageUrl: "/img/services/training.jpg",
  },
];

const Slider = () => {
  const [services, setServices] = useState([]);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // ⛔️ อย่าแตะ fetch URL
        const response = await fetch(
          "https://innosoft.kmutt.ac.th/api/services?populate=uploadfiles.fileupload"
        );
        const data = await response.json();

        if (Array.isArray(data?.data) && data.data.length > 0) {
          const formatted = data.data.map((service) => {
            const attrs = service.attributes || {};

            // ของเดิมคุณอ่านจาก uploadfiles.data
            let imageUrl =
              attrs.uploadfiles?.data?.attributes?.url
                ? `https://innosoft.kmutt.ac.th${attrs.uploadfiles.data.attributes.url}`
                : "";

            // เผื่อบาง service อัปโหลดที่ uploadfiles.fileupload
            const fileupload = attrs.uploadfiles?.fileupload?.data;
            if (!imageUrl) {
              if (Array.isArray(fileupload) && fileupload[0]) {
                imageUrl = `https://innosoft.kmutt.ac.th${fileupload[0].attributes.url}`;
              } else if (fileupload && !Array.isArray(fileupload)) {
                imageUrl = `https://innosoft.kmutt.ac.th${fileupload.attributes.url}`;
              }
            }

            return {
              id: service.id,
              topic: attrs.topic,
              description:
                attrs.content_en ||
                attrs.content_th ||
                "บริการด้านซอฟต์แวร์และระบบสารสนเทศ",
              imageUrl,
            };
          });

          setServices(formatted);
        } else {
          setHasError(true);
          setServices(FALLBACK_SERVICES);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setHasError(true);
        setServices(FALLBACK_SERVICES);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (serviceTopic) => {
    router.push({
      pathname: "/service",
      query: { scrollTo: serviceTopic },
    });
  };

  return (
    <div>
      {/* header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Our Services</h2>
          <p className="text-sm text-gray-600">
            Stay in the know with insights from industry experts.
          </p>
        </div>
        <button
          onClick={() => router.push("/service")}
          className="mt-4 md:mt-0 inline-flex items-center gap-1 px-3 py-2 rounded-md bg-primary text-white text-sm"
        >
          View all
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path d="m9 18 6-6-6-6" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* grid cards (รูปเล็กลง) */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col"
            onClick={() => handleServiceClick(service.topic)}
          >
            <div className="h-36 bg-gray-100">
              {service.imageUrl ? (
                <img
                  src={service.imageUrl}
                  alt={service.topic}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                  no image
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {service.topic}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-3">
                {service.description}
              </p>
              <span className="mt-auto pt-3 inline-flex items-center gap-1 text-primary text-sm">
                ดูรายละเอียด
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path d="m9 18 6-6-6-6" strokeWidth="2" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* {hasError ? (
        <p className="mt-4 text-xs text-gray-400">
          * showing local sample services (CORS blocked on localhost)
        </p>
      ) : null} */}
    </div>
  );
};

export default Slider;
