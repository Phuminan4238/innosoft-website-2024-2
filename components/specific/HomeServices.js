// components/specific/HomeServices.jsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const HomeServices = () => {
  const [services, setServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // ✅ เรียกผ่าน proxy ของเราเอง (ไม่โดน CORS)
        const res = await fetch("/api/services");
        const data = await res.json();

        const formatted = (data?.data || []).map((service) => {
          const attrs = service.attributes || {};

          let imageUrl = null;
          if (attrs.uploadfiles?.data?.attributes?.url) {
            imageUrl = `https://innosoft.kmutt.ac.th${attrs.uploadfiles.data.attributes.url}`;
          } else if (
            attrs.uploadfiles?.fileupload?.data?.[0]?.attributes?.url
          ) {
            imageUrl = `https://innosoft.kmutt.ac.th${attrs.uploadfiles.fileupload.data[0].attributes.url}`;
          }

          return {
            id: service.id,
            title: attrs.topic || "Unnamed service",
            desc:
              attrs.content_th ||
              attrs.content_en ||
              "พัฒนาระบบ ออกแบบ UX/UI บริการประมวลผล และอบรมบุคลากร",
            imageUrl: imageUrl || "/img/default-image.jpg",
          };
        });

        setServices(formatted);
      } catch (err) {
        console.error("services error:", err);
        setServices([
          {
            id: "fb-1",
            title: "Development",
            desc: "พัฒนาระบบสารสนเทศและเว็บแอปให้หน่วยงานภายใน/ภายนอก",
            imageUrl: "/img/default-image.jpg",
          },
          {
            id: "fb-2",
            title: "Design & UX/UI",
            desc: "ออกแบบประสบการณ์ผู้ใช้และหน้าจอ",
            imageUrl: "/img/default-image.jpg",
          },
          {
            id: "fb-3",
            title: "rCloud / HPC",
            desc: "บริการประมวลผลและโครงสร้างพื้นฐาน",
            imageUrl: "/img/default-image.jpg",
          },
          {
            id: "fb-4",
            title: "Training",
            desc: "อบรม/ถ่ายทอดเทคโนโลยีให้บุคลากร",
            imageUrl: "/img/default-image.jpg",
          },
        ]);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            OUR SERVICES
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            พัฒนาระบบ ออกแบบ UX/UI บริการประมวลผล และอบรมบุคลากร
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            ให้บริการพัฒนาระบบสารสนเทศทั้งโครงการภายในและโครงการภายนอก
            ครอบคลุมงานมหาวิทยาลัย ภาครัฐ และอุตสาหกรรม
          </p>
        </div>
        <button
          onClick={() => router.push("/service")}
          className="hidden sm:inline-flex items-center gap-1 px-3 py-2 bg-primary text-white text-sm rounded-md"
        >
          ดูบริการทั้งหมด
          <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="m9 18 6-6-6-6" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((svc) => (
          <div
            key={svc.id}
            onClick={() =>
              router.push({
                pathname: "/service",
                query: { scrollTo: svc.title },
              })
            }
            className="group cursor-pointer bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition flex flex-col"
          >
            <div className="h-32 bg-gray-100">
              <img
                src={svc.imageUrl}
                alt={svc.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary">
                {svc.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                {svc.desc}
              </p>
              <span className="mt-auto pt-3 text-primary text-sm inline-flex items-center gap-1">
                ดูรายละเอียด
                <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="m9 18 6-6-6-6" strokeWidth="2" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="sm:hidden flex justify-center mt-6">
        <button
          onClick={() => router.push("/service")}
          className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-white text-sm rounded-md"
        >
          ดูบริการทั้งหมด
          <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="m9 18 6-6-6-6" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomeServices;
