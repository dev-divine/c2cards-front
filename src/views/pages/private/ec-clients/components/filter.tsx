import { Button } from '@views/components/button'
import { Input } from '@views/components/input'
import { SelectFilters, SelectProps } from '@views/components/select-filters'

interface Props {
  filter: SelectProps
  setFilter: (filter: SelectProps) => void
}

export function Filter({ filter, setFilter }: Props) {
  return (
    <div className="mt-10 rounded bg-white px-5 py-8 shadow">
      <h3 className="mb-3 text-xl font-semibold">Selecione um filtro:</h3>

      <SelectFilters
        options={[
          { id: 'document', name: 'CPF/CNPJ', hidden: 'CPF/CNPJ' },
          { id: 'email', name: 'E-mail', hidden: 'E-mail' },
        ]}
        selected={filter}
        onChange={setFilter}
      />

      {filter.id === 'document' && (
        <Input
          type="text"
          label="CPF/CNPJ:"
          placeholder="Digite o seu CPF/CNPJ..."
          className="ml-px max-w-[382px]"
          name="document"
        />
      )}

      {filter.id === 'email' && (
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
  )
}
