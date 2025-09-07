"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGallery } from "@/hooks/useGallery";
import Image from "next/image";

const Gallery = () => {
  const router = useRouter();
  const { images, loading, error } = useGallery({ limit: 5 });

  const redirectUser = () => {
    router.push("/gallery");
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8 mx-28 my-10">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-primary text-[40px] font-semibold font-besley">
              Gallery
            </h1>
            <hr className="horizontal-line" />
          </div>
          <p className="text-primary text-[20px] font-normal font-archivo">
            Get a glimpse into my past meetups, where students and tech
            enthusiasts came together to learn, connect, and get inspired.
          </p>
        </div>
        <div className="flex justify-center items-center h-[716px]">
          <p className="text-primary text-xl">Loading gallery images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8 mx-28 my-10">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-primary text-[40px] font-semibold font-besley">
              Gallery
            </h1>
            <hr className="horizontal-line" />
          </div>
          <p className="text-primary text-[20px] font-normal font-archivo">
            Get a glimpse into my past meetups, where students and tech
            enthusiasts came together to learn, connect, and get inspired.
          </p>
        </div>
        <div className="flex justify-center items-center h-[716px]">
          <p className="text-red-500 text-xl">Error loading gallery: {error}</p>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col gap-8 mx-28 my-10">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-primary text-[40px] font-semibold font-besley">
              Gallery
            </h1>
            <hr className="horizontal-line" />
          </div>
          <p className="text-primary text-[20px] font-normal font-archivo">
            Get a glimpse into my past meetups, where students and tech
            enthusiasts came together to learn, connect, and get inspired.
          </p>
        </div>
        <div className="flex justify-center items-center h-[716px]">
          <p className="text-primary text-xl">
            No gallery images available yet.
          </p>
        </div>
      </div>
    );
  }

  // Get the first image for the large display and up to 4 for the grid
  const featuredImage = images[0];
  const gridImages = images.slice(1, 5);

  return (
    <div className="flex flex-col gap-8 mx-28 my-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-primary text-[40px] font-semibold font-besley">
            Gallery
          </h1>
          <hr className="horizontal-line" />
        </div>
        <p className="text-primary text-[20px] font-normal font-archivo">
          Get a glimpse into my past meetups, where students and tech
          enthusiasts came together to learn, connect, and get inspired.
        </p>
      </div>

      <div className="grid grid-cols-2 h-[716px] gap-4">
        {/* Featured Image */}
        <div className="col-span-1 rounded-lg bg-[#8f8c8c] relative overflow-hidden">
          <Image
            src={
              featuredImage.imageUrl ||
              featuredImage.driveUrl ||
              featuredImage.thumbnailUrl
            }
            alt={featuredImage.title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 flex flex-col w-full py-5 px-5 bg-[#0D090080] gap-4">
            <h1 className="text-primary text-xl font-semibold font-archivo">
              {featuredImage.title}
            </h1>
            <p
              className="text-secondary text-lg font-normal font-besley cursor-pointer"
              onClick={redirectUser}
            >
              View all images
            </p>
          </div>
        </div>

        {/* Grid Images */}
        <div className="col-span-1 grid grid-cols-2 grid-rows-2 gap-4">
          {gridImages.map((image, index) => (
            <div
              key={image.id}
              className="rounded-lg bg-[#8f8c8c] relative overflow-hidden"
            >
              <Image
                src={image.imageUrl || image.driveUrl || image.thumbnailUrl}
                alt={image.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 flex flex-col w-full py-3 px-3 bg-[#0D090080] gap-2">
                <h1 className="text-primary text-sm font-semibold font-archivo line-clamp-1">
                  {image.title}
                </h1>
                <p
                  className="text-secondary text-sm font-normal font-besley cursor-pointer"
                  onClick={redirectUser}
                >
                  View all images
                </p>
              </div>
            </div>
          ))}

          {/* Fill empty slots with placeholder if needed */}
          {Array.from({ length: Math.max(0, 4 - gridImages.length) }).map(
            (_, index) => (
              <div
                key={`placeholder-${index}`}
                className="rounded-lg bg-[#8f8c8c] relative"
              >
                <div className="absolute bottom-0 left-0 flex flex-col w-full py-3 px-3 bg-[#0D090080] gap-2">
                  <h1 className="text-primary text-sm font-semibold font-archivo">
                    More Images
                  </h1>
                  <p
                    className="text-secondary text-sm font-normal font-besley cursor-pointer"
                    onClick={redirectUser}
                  >
                    View all images
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
