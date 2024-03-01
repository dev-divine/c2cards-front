import { Dialog } from "@headlessui/react";
import React from "react";

interface ModalContentHeadingTitleProps {
  title: string;
}

export function ModalContentHeadingTitle({
  title,
}: ModalContentHeadingTitleProps) {
  return (
    <div className="mt-3 text-center sm:ml-4 sm:mt-px sm:text-left">
      <Dialog.Title
        as="h3"
        className="text-base font-semibold leading-6 text-zinc-900"
      >
        {title}
      </Dialog.Title>
    </div>
  );
}
