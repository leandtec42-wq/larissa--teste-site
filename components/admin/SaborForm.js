import { Field, TextInput, TextArea, CheckboxField, SubmitButton } from "./Field";
import ImagePicker from "./ImagePicker";

export default function SaborForm({ sabor, action }) {
  return (
    <form action={action} className="grid max-w-[640px] gap-5">
      <Field label="Nome do sabor">
        <TextInput name="nome" required defaultValue={sabor?.nome} />
      </Field>
      <Field label="Descrição curta">
        <TextArea name="descricao" defaultValue={sabor?.descricao || ""} />
      </Field>
      <Field label="Preço (R$)">
        <TextInput type="number" step="0.01" min="0" name="preco" required defaultValue={sabor?.preco} />
      </Field>
      <ImagePicker name="foto" label="Foto do sabor" valorAtual={sabor?.foto} />
      <CheckboxField name="disponivel" label="Disponível no site" defaultChecked={sabor?.disponivel ?? true} />
      <div className="flex gap-3">
        <SubmitButton>Salvar</SubmitButton>
      </div>
    </form>
  );
}
