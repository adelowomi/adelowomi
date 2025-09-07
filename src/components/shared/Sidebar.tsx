"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/icons";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  return (
    <div className="flex flex-col items-center my-20 mx-10 gap-28">
      <div className="ml-6">
        <LogoIcon />
      </div>
      <div className="flex flex-col gap-5">
        <Link href="/admin/dashboard">
          <span
            className={`flex flex-row gap-2.5 text-[16px] font-archivo font-normal items-center p-2.5 rounded-lg cursor-pointer w-[168px] ${
              isActive("/admin/dashboard")
                ? "bg-white text-secondary"
                : "bg-none text-primary"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1111 6.66667V0H20V6.66667H11.1111ZM0 11.1111V0H8.88889V11.1111H0ZM11.1111 20V8.88889H20V20H11.1111ZM0 20V13.3333H8.88889V20H0ZM2.22222 8.88889H6.66667V2.22222H2.22222V8.88889ZM13.3333 17.7778H17.7778V11.1111H13.3333V17.7778ZM13.3333 4.44444H17.7778V2.22222H13.3333V4.44444ZM2.22222 17.7778H6.66667V15.5556H2.22222V17.7778Z"
                fill={isActive("/admin/dashboard") ? "#732383" : "#FCFCFC"}
              />
            </svg>
            Dashboard
          </span>
        </Link>
        <Link href="/admin/events">
          <span
            className={`flex flex-row gap-2.5 text-[16px] font-archivo font-normal items-center p-2.5 rounded-lg cursor-pointer w-[168px] ${
              isActive("/admin/events")
                ? "bg-white text-secondary"
                : "bg-none text-primary"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.1818 14.5455V6.36364H5.45455V14.5455H18.1818ZM18.1818 1.81818C18.664 1.81818 19.1265 2.00974 19.4675 2.35071C19.8084 2.69169 20 3.15415 20 3.63636V14.5455C20 15.0277 19.8084 15.4901 19.4675 15.8311C19.1265 16.1721 18.664 16.3636 18.1818 16.3636H5.45455C4.97233 16.3636 4.50987 16.1721 4.1689 15.8311C3.82792 15.4901 3.63636 15.0277 3.63636 14.5455V3.63636C3.63636 3.15415 3.82792 2.69169 4.1689 2.35071C4.50987 2.00974 4.97233 1.81818 5.45455 1.81818H6.36364V0H8.18182V1.81818H15.4545V0H17.2727V1.81818H18.1818ZM1.81818 18.1818H14.5455V20H1.81818C1.33597 20 0.873508 19.8084 0.532533 19.4675C0.191558 19.1265 0 18.664 0 18.1818V7.27273H1.81818V18.1818ZM16.3636 12.7273H12.7273V9.09091H16.3636V12.7273Z"
                fill={isActive("/admin/events") ? "#732383" : "#FCFCFC"}
              />
            </svg>
            Events
          </span>
        </Link>
        <Link href="/admin/gallery">
          <span
            className={`flex flex-row gap-2.5 text-[16px] font-archivo font-normal items-center p-2.5 rounded-lg cursor-pointer w-[168px] ${
              isActive("/admin/gallery")
                ? "bg-white text-secondary"
                : "bg-none text-primary"
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11C1 6.286 1 3.929 2.464 2.464C3.93 1 6.286 1 11 1C15.714 1 18.071 1 19.535 2.464C21 3.93 21 6.286 21 11C21 15.714 21 18.071 19.535 19.535C18.072 21 15.714 21 11 21C6.286 21 3.929 21 2.464 19.535C1 18.072 1 15.714 1 11Z"
                stroke={isActive("/admin/gallery") ? "#732383" : "#FCFCFC"}
                strokeWidth="1.91667"
              />
              <path
                d="M15 9.00006C16.1046 9.00006 17 8.10463 17 7.00006C17 5.89549 16.1046 5.00006 15 5.00006C13.8954 5.00006 13 5.89549 13 7.00006C13 8.10463 13.8954 9.00006 15 9.00006Z"
                stroke={isActive("/admin/gallery") ? "#732383" : "#FCFCFC"}
                strokeWidth="1.91667"
              />
              <path
                d="M1 11.5L2.752 9.96702C3.19114 9.58309 3.75974 9.38035 4.34272 9.39985C4.9257 9.41934 5.47949 9.65961 5.892 10.072L10.182 14.362C10.5149 14.6949 10.9546 14.8996 11.4235 14.9402C11.8925 14.9808 12.3608 14.8547 12.746 14.584L13.045 14.374C13.6006 13.9838 14.2721 13.7936 14.9498 13.8345C15.6275 13.8753 16.2713 14.1449 16.776 14.599L20 17.5"
                stroke={isActive("/admin/gallery") ? "#732383" : "#FCFCFC"}
                strokeWidth="1.91667"
                strokeLinecap="round"
              />
            </svg>
            Gallery
          </span>
        </Link>
        <Link href="/admin/video">
          <span
            className={`flex flex-row gap-2.5 text-[16px] font-archivo font-normal items-center p-2.5 rounded-lg cursor-pointer w-[168px] ${
              isActive("/admin/video")
                ? "bg-white text-secondary"
                : "bg-none text-primary"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 8H2V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H16V20H4V8Z"
                fill={isActive("/admin/video") ? "#732383" : "#FCFCFC"}
              />
              <path
                d="M20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2ZM11 14V6L18 10L11 14Z"
                fill={isActive("/admin/video") ? "#732383" : "#FCFCFC"}
              />
            </svg>
            Videos
          </span>
        </Link>
        <Link href="/admin/volunteers">
          <span
            className={`flex flex-row gap-2.5 text-[16px] font-archivo font-normal items-center p-2.5 rounded-lg cursor-pointer w-[168px] ${
              isActive("/admin/volunteers")
                ? "bg-white text-secondary"
                : "bg-none text-primary"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10ZM10 12.5C6.66875 12.5 0 14.175 0 17.5V20H20V17.5C20 14.175 13.3312 12.5 10 12.5Z"
                fill={isActive("/admin/volunteers") ? "#732383" : "#FCFCFC"}
              />
            </svg>
            Volunteers
          </span>
        </Link>
        <Link href="/admin/users">
          <span
            className={`flex flex-row gap-2.5 text-[16px] font-archivo font-normal items-center p-2.5 rounded-lg cursor-pointer w-[168px] ${
              isActive("/admin/users")
                ? "bg-white text-secondary"
                : "bg-none text-primary"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 7C13 8.10457 12.1046 9 11 9C9.89543 9 9 8.10457 9 7C9 5.89543 9.89543 5 11 5C12.1046 5 13 5.89543 13 7Z"
                fill={isActive("/admin/users") ? "#732383" : "#FCFCFC"}
              />
              <path
                d="M11 11C8.79086 11 7 12.7909 7 15V16H15V15C15 12.7909 13.2091 11 11 11Z"
                fill={isActive("/admin/users") ? "#732383" : "#FCFCFC"}
              />
              <path
                d="M6 7C6 7.55228 5.55228 8 5 8C4.44772 8 4 7.55228 4 7C4 6.44772 4.44772 6 5 6C5.55228 6 6 6.44772 6 7Z"
                fill={isActive("/admin/users") ? "#732383" : "#FCFCFC"}
              />
              <path
                d="M5 9C3.34315 9 2 10.3431 2 12V13H6.26756C6.09533 12.3625 6 11.6927 6 11C6 10.3073 6.09533 9.6375 6.26756 9H5Z"
                fill={isActive("/admin/users") ? "#732383" : "#FCFCFC"}
              />
              <path
                d="M16 7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7C14 6.44772 14.4477 6 15 6C15.5523 6 16 6.44772 16 7Z"
                fill={isActive("/admin/users") ? "#732383" : "#FCFCFC"}
              />
              <path
                d="M15 9C16.6569 9 18 10.3431 18 12V13H13.7324C13.9047 12.3625 14 11.6927 14 11C14 10.3073 13.9047 9.6375 13.7324 9H15Z"
                fill={isActive("/admin/users") ? "#732383" : "#FCFCFC"}
              />
            </svg>
            Admin Users
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
