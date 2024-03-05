import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import { Button } from "@views/components/button";
import { Controller } from "react-hook-form";
import { useResetPasswordController } from "./use-reset-password-controller";

import { cn } from "@app/utils/cn";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { number } from "zod";

export function ResetPassword() {
  const { control, handleSubmit, isPending } = useResetPasswordController();

  return (
    <div className="max-w-2xl items-center">
      <h1 className="pb-4 pl-3 text-2xl">Recuperar senha</h1>
      {/* <img src={logoImage} alt="alt" />
      <p>desfrute da melhor tecnologia para o Fomento Comercial</p> */}

      <form id="login" onSubmit={handleSubmit} className="mt-4 space-y-8 px-3">
        <div className="relative flex items-end">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-l border border-r-0 border-main-text bg-lighter-blue">
            <EnvelopeIcon className="h-5" />
          </div>
          <label
            htmlFor="email-login"
            className="absolute bottom-[52px] text-sm font-medium leading-6 text-main-text"
          >
            Endereço de e-mail:
          </label>
          <div className="flex flex-1 flex-col">
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field: { value, onChange } }) => (
                <input
                  value={value}
                  onChange={onChange}
                  type="text"
                  placeholder="exemplo@gmail.com"
                  id="email-login"
                  className={cn(
                    "h-[52px] w-full rounded-r border border-main-text bg-white px-3 text-main-text shadow outline-none",
                    // errors && '!border-red-600',
                  )}
                />
              )}
            />

            {/* {error && (
              <div className="mt-2 flex items-center gap-1.5 text-red-600">
                <XCircleIcon className="h-5" />
                <span className="text-xs">{error}</span>
              </div>
            )} */}
          </div>
        </div>
      </form>
      <div className="px-3">
        <Button
          form="login"
          type="submit"
          className="my-6 w-full bg-dark-blue px-3"
          isLoading={isPending}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}
