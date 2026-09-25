import { Field, TextInput, TextArea, CheckboxField, SubmitButton } from "./Field";
import ImagePicker from "./ImagePicker";
import { toDateInputValue } from "@/lib/format";

export default function PublicacaoForm({ publicacao, action }) {
  const hoje = new Date().toISOString().slice(0, 10);
  return (
    <form action={action} className="grid max-w-[640px] gap-5">
      <ImagePicker name="foto" label="Foto" valorAtual={publicacao?.foto} />
      <Field label="Título">
        <TextInput name="titulo" required placeholder="Ex: Hoje tem fatia de chocolate" defaultValue={publicacao?.titulo} />
      </Field>
      <Field label="Descrição">
        <TextArea name="descricao" defaultValue={publicacao?.descricao || ""} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Data">
          <TextInput type="date" name="data" required defaultValue={publicacao ? toDateInputValue(publicacao.data) : hoje} />
        </Field>
        <Field label="Categoria">
          <TextInput name="categoria" placeholder="Ex: Novidade, Sabores, Bastidores" defaultValue={publicacao?.categoria || ""} />
        </Field>
      </div>
      <CheckboxField name="status" label="Publicar no site (senão fica como rascunho)" defaultChecked={publicacao ? publicacao.status === "publicado" : true} />
      <div className="flex gap-3">
        <SubmitButton>Salvar</SubmitButton>
      </div>
    </form>
  );
}
