import React from "react";
import Button from "../ui/Button";
import { VideoCategory } from "@prisma/client";

interface Video {
  id: string;
  title: string;
  description?: string;
  category: VideoCategory;
  driveUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
  event?: {
    id: string;
    title: string;
    date: string;
  };
}

interface AdminVideoContentProps {
  video?: Video;
}

const AdminVideoContent: React.FC<AdminVideoContentProps> = ({ video }) => {
  const handleView = () => {
    if (video?.driveUrl) {
      window.open(video.driveUrl, "_blank");
    }
  };

  if (!video) {
    return (
      <div className="w-[356px] rounded-lg border-[0.5px] border-solid border-[#FCFCFC33] bg-[#0D09000D]">
        <div className="bg-[#D9D9D9] w-full h-[350px] flex justify-center items-center rounded-lg">
          <h2 className="text-black">No Video</h2>
        </div>
        <div className="flex flex-col gap-5 py-5 px-4">
          <h2 className="text-gray-400">No content available</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[356px] rounded-lg border-[0.5px] border-solid border-[#FCFCFC33] bg-[#0D09000D]">
      <div className="bg-[#D9D9D9] w-full h-[350px] flex justify-center items-center rounded-lg overflow-hidden">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`${
            video.thumbnailUrl ? "hidden" : ""
          } text-black text-center`}
        >
          <div className="text-4xl mb-2">🎥</div>
          <div>Video Thumbnail</div>
        </div>
      </div>
      <div className="flex flex-col gap-5 py-5 px-4">
        <div>
          <h2 className="text-primary font-medium line-clamp-2">
            {video.title}
          </h2>
          {video.event && (
            <p className="text-gray-400 text-sm mt-1">
              Event: {video.event.title}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            text="View Video"
            width="w-[100px]"
            textStyle="text-[12px] font-medium font-archivo text-primary"
            padding="px-2.5 py-1"
            onClick={handleView}
          />
          <span className="px-2.5 py-1 text-[12px] bg-primary/20 text-primary rounded border border-primary/30">
            {video.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminVideoContent;
