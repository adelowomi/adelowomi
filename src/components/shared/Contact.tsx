/* eslint-disable react/no-unknown-property */
import React from "react";
import Button from "../ui/Button";
import { SendIcon, PhoneIcon, EmailIcon, AddressIcon } from "@/icons";

const Contact = () => {
  return (
    <div className="flex flex-row gap-20 px-28 py-24">
      <div className="w-[500px]">
        <h1 className="w-[500px] h-auto font-semibold text-3xl uppercase text-primary font-besley pb-2">
          Let’s Build Something Amazing Together
        </h1>
        <hr className="horizontal-line" />

        <div className="mt-20 flex flex-col gap-y-4">
          <div className="flex items-center gap-4 text-primary font-normal text-xl">
            <span className="w-12 h-12 p-2 flex items-center justify-center rounded-full purple-gradient font-archivo">
              <PhoneIcon />
            </span>
            +2340867547854
          </div>

          <div className="flex items-center gap-4 text-primary font-normal text-xl">
            <span className="w-12 h-12 p-2 flex items-center justify-center rounded-full purple-gradient font-archivo">
              <EmailIcon />
            </span>
            Abcdefg@gmail.com
          </div>

          <div className="flex items-center gap-4 text-primary font-normal text-xl">
            <span className="w-12 h-12 p-2 flex items-center justify-center rounded-full purple-gradient font-archivo">
              <AddressIcon />
            </span>
            Lagos, Nigeria
          </div>
        </div>
      </div>
      <div className="inline-flex w-[630px] items-center rounded-lg border-[0.5px] border-solid border-secondary/30 bg-gradient-to-br from-secondary/5 to-accent/10 px-12 pt-12 pb-20">
        <form>
          <div className="flex flex-col mb-4">
            <label className="text-lg font-medium font-archivo text-primary">
              Name
            </label>
            <input
              type="text"
              placeholder="Full name"
              className="rounded-lg bg-surface mt-2 py-2 px-2 flex items-center w-[500px] border-[0.5px] border-solid border-secondary/30 font-archivo text-primary focus:border-secondary/60 focus:outline-none transition-colors duration-300"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-lg font-medium font-archivo text-primary">
              Email
            </label>
            <input
              type="text"
              placeholder="Email address"
              className="rounded-lg bg-surface mt-2 py-2 px-2 flex items-center w-[500px] border-[0.5px] border-solid border-secondary/30 font-archivo text-primary focus:border-secondary/60 focus:outline-none transition-colors duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium font-archivo text-primary">
              Message
            </label>
            <textarea
              placeholder="Type message here"
              className="rounded-lg h-[100px] bg-surface mt-2 py-2 px-2 flex items-center w-[500px] border-[0.5px] border-solid border-secondary/30 font-archivo text-primary focus:border-secondary/60 focus:outline-none transition-colors duration-300"
            ></textarea>
          </div>

          <div className="mt-20">
            <Button text="Send Message" svg={<SendIcon />} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
