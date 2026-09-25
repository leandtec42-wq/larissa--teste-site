import { Field, TextInput, TextArea, CheckboxField, SubmitButton } from "./Field";
import ImagePicker from "./ImagePicker";

export default function DepoimentoForm({ depoimento, action }) {
  return (
    <form action={action} className="grid max-w-[640px] gap-5">
      <ImagePicker name="foto" label="Print da conversa (opcional, mas convence muito mais!)" valorAtual={depoimento?.foto} />
      <Field label="Mensagem do depoimento">
        <TextArea name="descricao" required placeholder="Cole aqui o que a cliente escreveu pra você" defaultValue={depoimento?.descricao} />
      </Field>
      <Field label="Nome da cliente (opcional)">
        <TextInput name="autor" placeholder="Ex: Lai" defaultValue={depoimento?.autor || ""} />
      </Field>
      <CheckboxField name="ativo" label="Mostrar no site" defaultChecked={depoimento?.ativo ?? true} />
      <div className="flex gap-3">
        <SubmitButton>Salvar</SubmitButton>
      </div>
    </form>
  );
}
