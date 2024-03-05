import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

export function ModalContentHeaderSuccess() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
    </div>
  );
}
