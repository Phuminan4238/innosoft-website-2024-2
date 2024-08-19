import React from "react";

const BlogCard = () => {
  return (
    <div className="max-w-[85rem] px-0 py-10 lg:py-14 mx-auto">
      {/* Grid */}
      <div className="grid sm:grid-cols-2 sm:items-end gap-8">
        {/* Image */}
        <div className="sm:order-2">
          <div className="relative pt-[50%] sm:pt-[100%] rounded-lg">
            <img
              className="size-full absolute top-0 start-0 object-cover rounded-lg"
              src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1981&q=80"
              alt="Image Description"
            />
          </div>
        </div>
        {/* End Col */}

        {/* Content */}
        <div className="sm:order-1 px-16">
          {/* Category */}
          <p className="mb-5 inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-neutral-200">
            Business insight
          </p>

          {/* Title */}
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight text-gray-800 dark:text-neutral-200">
            <a
              href="#"
              className="hover:text-blue-600 dark:text-neutral-300 dark:hover:text-white"
            >
              Vision
            </a>
          </h2>
          <div>
            <p>
              มุ่งสู่ความเป็นเลิศด้านวิทยาศาสตร์ เทคโนโลยี และนวัตกรรม (STI)
              ของมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี เพื่อผลิตผลงาน
              และกําลังบุคคลที่มีคุณภาพสูง ตอบโจทย์ภาคธุรกิจ อุตสาหกรรม และสังคม
              ตลอดจนขับเคลื่อนมหาวิทยาลัยด้วยข้อมูล (Data Driven University)
            </p>
          </div>
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
    /* End Card Blog */
  );
};

export default BlogCard;
