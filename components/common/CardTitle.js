// components/common/CardTitle.jsx
import Link from "next/link";

export default function CardTitle({
  title,
  subtitle,
  actionLabel = "View all",
  actionHref = "#",
}) {
  return (
    <div className="w-full bg-[#F6F7FA] rounded-xl px-6 py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
        ) : null}
      </div>
      {actionHref ? (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-md text-sm"
        >
          {actionLabel}
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path d="m9 18 6-6-6-6" strokeWidth="2" />
          </svg>
        </Link>
      ) : null}
    </div>
  );
}
