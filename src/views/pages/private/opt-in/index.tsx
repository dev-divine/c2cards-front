import { useState } from "react";
import { endOfMonth, startOfMonth, subHours } from "date-fns";

import { SelectFilters, SelectProps } from "@views/components/select-filters";
import { Input } from "@views/components/input";
import { Button } from "@views/components/button";
import { Pagination } from "@views/components/pagination";
import {
  CheckCircleIcon,
  DocumentMinusIcon,
  DocumentPlusIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Format } from "@app/utils/format";
import { useOptInController } from "./use-opt-in-controller";
import { Modal } from "@views/components/modal";
import { InputPhone } from "@views/components/input-phone";
import { DatePickerInput } from "./components/date-picker-input";
import { useNavigate } from "react-router-dom";
import { ModalContent } from "@views/components/ModalContent";
import { OptInReceipt } from "../opt-in-receipt/components/opt-in";
import { OptOutReceipt } from "../opt-in-receipt/components/opt-out";

export function OptIn() {
  const navigate = useNavigate();

  const { register, errors } = useOptInController();

  const [filter, setFilter] = useState<SelectProps>({
    id: "",
    name: "Selecione o tipo de filtro",
    hidden: "Selecione o tipo de filtro",
  });

  const people = [
    {
      status: "success",
      document: "12345678900",
      name: "Lindsay Walton",
      email: "lindsay.walton@example.com",
      createdAt: new Date("2023-05-19").toISOString(),
    },
    {
      status: "error",
      document: "12345678900",
      name: "Lindsay Walton Paula",
      email: "lindsay.walton@example.com",
      createdAt: new Date("2024-01-15").toISOString(),
    },
  ];

  const optin = {
    document: "298.608.778-74",
    nome_empresa: "Cesar Galvão",
    nome_representante: "Cesar",
    cpf_representante: "298.608.778-74",
    whatsapp_representante: "(11) 99999-9999",
    email: "cesardefranca@yahoo.com.br",
    data_assinatura: "20.02.2024",
    data_encerramento: "20.02.2025",
    external_code: "12346516956",
    b3_protocol: "1234fgre5efgez15656",
  };

  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(subHours(endOfMonth(new Date()), 3));

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReceiptOptInModal, setOpenReceiptOptInModal] = useState(false);
  const [openReceiptOptOutModal, setOpenReceiptOptOutModal] = useState(false);

  return (
    <>
      <Modal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        type="title"
        title="Solicitar Opt-in"
        confirmText="Solicitar opt-in"
      >
        {/* Input document com controller */}
        <div className="mb-2 flex flex-1 gap-3">
          <Input
            label="Empresa:"
            value={optin.nome_empresa}
            error={errors.company?.message}
            {...register("company")}
          />

          <Input
            label="CPF/CNPJ:"
            value={Format.document(optin.document)}
            error={errors.document?.message}
            {...register("document")}
          />
        </div>

        {/* Input document com controller */}
        <div className="mb-2 flex flex-1 gap-3">
          <Input
            label="Nome do representante:"
            value={optin.nome_representante}
            error={errors.responsible_name?.message}
            {...register("responsible_name")}
          />

          <Input
            label="CPF do representante:"
            value={Format.document(optin.cpf_representante)}
            error={errors.responsible_document?.message}
            {...register("responsible_document")}
          />
        </div>

        <div className="mb-2 flex flex-1 gap-3">
          <InputPhone
            label="WhatsApp do representante:"
            value={Format.phone(optin.whatsapp_representante)}
            error={errors.responsible_phone?.message}
            {...register("responsible_phone")}
          />

          <Input
            label="E-mail do representante:"
            value={optin.email}
            error={errors.responsible_email?.message}
            {...register("responsible_email")}
          />
        </div>

        <div className="mb-1 flex w-full flex-1 gap-3">
          <div className="w-full">
            <p className="block w-full text-sm font-medium leading-6 text-zinc-900">
              Data inicial:
            </p>
            <DatePickerInput
              value={startDate}
              onChange={setStartDate}
              className="w-full px-3 text-left"
            />
          </div>

          <div className="w-full">
            <p className="block w-full text-sm font-medium leading-6 text-zinc-900">
              Data final:
            </p>
            <DatePickerInput
              value={endDate}
              onChange={setEndDate}
              className="w-full px-3 text-left"
            />
            <div className="mt-1 flex items-center gap-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                <ExclamationTriangleIcon
                  className="h-4 w-4 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <p className="w-full text-xs text-red-700">
                Data de encerramento precisa ser maior que a data de hoje!
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        type="title"
        title="Solicitar Opt-out"
        confirmText="Solicitar opt-out"
      >
        {/* Input document com controller */}
        <div className="mb-2 flex flex-1 gap-3">
          <Input
            label="Empresa:"
            value={optin.nome_empresa}
            error={errors.company?.message}
            {...register("company")}
          />

          <Input
            label="CPF/CNPJ:"
            value={Format.document(optin.document)}
            error={errors.document?.message}
            {...register("document")}
          />
        </div>

        {/* Input document com controller */}
        <div className="mb-2 flex flex-1 gap-3">
          <Input
            label="Nome do representante:"
            value={optin.nome_representante}
            error={errors.responsible_name?.message}
            {...register("responsible_name")}
          />

          <Input
            label="CPF do representante:"
            value={Format.document(optin.cpf_representante)}
            error={errors.responsible_document?.message}
            {...register("responsible_document")}
          />
        </div>

        <div className="mb-2 flex flex-1 gap-3">
          <InputPhone
            label="WhatsApp do representante:"
            value={Format.phone(optin.whatsapp_representante)}
            error={errors.responsible_phone?.message}
            {...register("responsible_phone")}
          />

          <Input
            label="E-mail do representante:"
            value={optin.email}
            error={errors.responsible_email?.message}
            {...register("responsible_email")}
          />
        </div>

        <div className="mb-2 flex flex-1 gap-3">
          <Input
            label="Código externo:"
            value={optin.email}
            error={errors.external_code?.message}
            {...register("external_code")}
          />

          <Input
            label="Protocolo B3:"
            value={optin.email}
            error={errors.b3_protocol?.message}
            {...register("b3_protocol")}
          />
        </div>
      </Modal>
      {/* Optin Modal */}
      <ModalContent.Root
        className="max-w-5xl"
        open={openReceiptOptInModal}
        setOpen={() => {
          setOpenReceiptOptInModal(true);
        }}
      >
        <ModalContent.Header
          actionCloseButton={() => {
            setOpenReceiptOptInModal(false);
          }}
        />
        <ModalContent.Body>
          <OptInReceipt />
        </ModalContent.Body>
      </ModalContent.Root>

      {/* OptOut Modal */}
      <ModalContent.Root
        className="max-w-5xl"
        open={openReceiptOptOutModal}
        setOpen={() => {
          setOpenReceiptOptOutModal(true);
        }}
      >
        <ModalContent.Header
          actionCloseButton={() => {
            setOpenReceiptOptOutModal(false);
          }}
        />
        <ModalContent.Body>
          <OptOutReceipt />
        </ModalContent.Body>
      </ModalContent.Root>

      <div className="mt-10 rounded bg-white px-5 py-8 shadow">
        <h3 className="mb-3 text-xl font-semibold">Selecione um filtro:</h3>

        <SelectFilters
          options={[
            { id: "document", name: "CPF/CNPJ", hidden: "CPF/CNPJ" },
            // { id: 'date', name: 'Data', hidden: 'Data' },
            // { id: 'name', name: 'Nome', hidden: 'Nome' },
            { id: "email", name: "E-mail", hidden: "E-mail" },
          ]}
          selected={filter}
          onChange={setFilter}
        />

        {/* {filter.id === 'date' && (
          <Datepicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            className="ml-px max-w-[382px]"
          />
        )} */}

        {filter.id === "document" && (
          <Input
            type="text"
            label="CPF/CNPJ:"
            placeholder="Digite o seu CPF/CNPJ..."
            className="ml-px max-w-[382px]"
            name="document"
          />
        )}

        {/* {filter.id === 'name' && (
          <Input
            type="text"
            label="Nome:"
            placeholder="Digite o seu nome..."
            className="ml-px max-w-[382px]"
            name="name"
          />
        )} */}

        {filter.id === "email" && (
          <Input
            type="email"
            label="E-mail:"
            placeholder="Digite o seu e-mail..."
            className="ml-px max-w-[382px]"
            name="email"
          />
        )}

        {filter.id && (
          <Button type="button" className="ml-px mt-8 max-w-[382px]">
            <span>Pesquisar</span>
          </Button>
        )}
      </div>

      <div className="mt-10 rounded bg-white px-5 pb-8 pt-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-dark-blue">
          Registrar OPT-In
        </h1>
        <table className="mt-3 min-w-full divide-y divide-gray-300 overflow-hidden rounded-t shadow">
          <thead className="bg-semi-gray">
            <tr>
              <th
                scope="col"
                className="w-[10%] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                STATUS
              </th>
              <th
                scope="col"
                className="w-[12%] px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                CPF/CNPJ
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                NOME
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                E-MAIL
              </th>
              <th
                scope="col"
                className="w-[18%] px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                DATA DE EXPIRAÇÃO
              </th>
              <th
                scope="col"
                className="w-[10%] px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                AÇÕES
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {people.map((person) => (
              <tr key={person.email}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {person.status === "success" ? (
                    <CheckCircleIcon
                      className="w-7 text-green-hover"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <XCircleIcon
                      className="w-7 text-red-400"
                      strokeWidth={1.5}
                    />
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {Format.document(person.document)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {Format.name(person.name)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {person.email}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {Format.parseIso(person.createdAt)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <button
                    type="button"
                    onClick={() => setOpenCreateModal(true)}
                  >
                    <PencilSquareIcon className="w-6 text-dark-blue" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpenDeleteModal(true)}
                  >
                    <TrashIcon className="w-6 text-dark-blue" />
                  </button>

                  <button
                    type="button"
                    onClick={
                      () => setOpenReceiptOptInModal(true)
                      /* navigate("/opt_in_receipt", { state: "opt-in" }) */
                    }
                  >
                    <DocumentPlusIcon className="w-6 text-dark-blue" />
                  </button>

                  <button
                    type="button"
                    onClick={
                      () => setOpenReceiptOptOutModal(true)
                      /* navigate("/opt_in_receipt", { state: "opt-out" }) */
                    }
                  >
                    <DocumentMinusIcon className="ml-1 w-6 text-dark-blue" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </>
  );
}
