import { Field, TextInput, TextArea, CheckboxField, SubmitButton } from "./Field";
import ImagePicker from "./ImagePicker";
import { toDateInputValue } from "@/lib/format";

export default function EventoForm({ evento, action }) {
  return (
    <form action={action} className="grid max-w-[640px] gap-5">
      <Field label="Nome do evento">
        <TextInput name="nome" required defaultValue={evento?.nome} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Data">
          <TextInput type="date" name="data" required defaultValue={evento ? toDateInputValue(evento.data) : ""} />
        </Field>
        <Field label="Horário">
          <TextInput name="horario" placeholder="Ex: 16h às 20h" required defaultValue={evento?.horario} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Local">
          <TextInput name="local" required defaultValue={evento?.local} />
        </Field>
        <Field label="Cidade">
          <TextInput name="cidade" required defaultValue={evento?.cidade} />
        </Field>
      </div>
      <Field label="Endereço completo">
        <TextInput name="endereco" defaultValue={evento?.endereco || ""} />
      </Field>
      <Field label="Link do Google Maps" hint="Cole o link de compartilhamento do Google Maps.">
        <TextInput type="url" name="mapsLink" defaultValue={evento?.mapsLink || ""} />
      </Field>
      <Field label="Descrição">
        <TextArea name="descricao" defaultValue={evento?.descricao || ""} />
      </Field>
      <ImagePicker name="imagem" label="Imagem (opcional)" valorAtual={evento?.imagem} />
      <CheckboxField name="ativo" label="Evento ativo (visível no site)" defaultChecked={evento?.ativo ?? true} />
      <div className="flex gap-3">
        <SubmitButton>Salvar</SubmitButton>
      </div>
    </form>
  );
}
