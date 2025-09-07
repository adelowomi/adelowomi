import React from "react";
import Button from "./Button";

const ViewIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_125_856)">
      <path
        d="M20.3635 12.707C20.5509 12.5194 20.6562 12.2651 20.6562 12C20.6562 11.7348 20.5509 11.4805 20.3635 11.293L14.7065 5.63598C14.6142 5.54047 14.5039 5.46428 14.3819 5.41188C14.2599 5.35947 14.1286 5.33188 13.9959 5.33073C13.8631 5.32957 13.7314 5.35487 13.6085 5.40516C13.4856 5.45544 13.374 5.52969 13.2801 5.62358C13.1862 5.71747 13.1119 5.82913 13.0616 5.95202C13.0114 6.07492 12.9861 6.2066 12.9872 6.33938C12.9884 6.47216 13.016 6.60338 13.0684 6.72538C13.1208 6.84739 13.197 6.95773 13.2925 7.04998L17.2425 11H3.99946C3.73425 11 3.47989 11.1053 3.29236 11.2929C3.10482 11.4804 2.99946 11.7348 2.99946 12C2.99946 12.2652 3.10482 12.5195 3.29236 12.7071C3.47989 12.8946 3.73425 13 3.99946 13H17.2425L13.2925 16.95C13.1103 17.1386 13.0095 17.3912 13.0118 17.6534C13.0141 17.9156 13.1192 18.1664 13.3046 18.3518C13.4901 18.5372 13.7409 18.6424 14.0031 18.6447C14.2653 18.6469 14.5179 18.5461 14.7065 18.364L20.3635 12.707Z"
        fill="#FCFCFC"
      />
    </g>
    <defs>
      <clipPath id="clip0_125_856">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="matrix(0 1 -1 0 24 0)"
        />
      </clipPath>
    </defs>
  </svg>
);

const AdminGalleryCard = () => {
  return (
    <div className="border-[0.5px] border-solid border-[#FCFCFC33] rounded-lg p-6 flex flex-col gap-4">
      <h1 className="font-besley text-primary text-[20px] font-semibold">
        Event Title
      </h1>
      <div className="grid grid-cols-2 gap-12">
        <h1 className="text-primary text-[16px] font-light font-archivo">
          Date: 25th November, 2024{" "}
        </h1>
        <h1 className="text-primary text-[16px] font-light font-archivo">
          Time: 11am WAT
        </h1>
        <h1 className="text-primary text-[16px] font-light font-archivo">
          Venue: venue of the event
        </h1>
      </div>
      <Button text="View Gallery" svg={<ViewIcon />} />
    </div>
  );
};

export default AdminGalleryCard;
