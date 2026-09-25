import { CircleCheck } from "lucide-react";
import { getPerfil } from "@/lib/models/perfil";
import { getAdmin } from "@/lib/models/admin";
import { Field, TextInput, TextArea, SubmitButton } from "@/components/admin/Field";
import ImagePicker from "@/components/admin/ImagePicker";
import { salvarPerfil, salvarMensagens, salvarAcesso } from "@/app/admin/actions/perfil";

export default async function PerfilPage({ searchParams }) {
  const [perfil, admin] = await Promise.all([getPerfil(), getAdmin()]);
  const { erro, ok } = (await searchParams) || {};

  return (
    <div className="grid gap-10">
      <h2 className="text-[1.3rem] font-semibold">Meu perfil</h2>

      {ok ? (
        <p className="flex max-w-[640px] items-center gap-2 rounded-xl bg-whatsapp/10 p-4 text-[.88rem] text-whatsapp-dark">
          <CircleCheck size={18} /> Salvo com sucesso!
        </p>
      ) : null}
      {erro ? <p className="max-w-[640px] rounded-xl bg-rose-soft/60 p-4 text-[.88rem] text-rose-dark">{erro}</p> : null}

      <form action={salvarPerfil} className="grid max-w-[640px] gap-5">
        <ImagePicker name="fotoPerfil" label="Trocar minha foto principal" valorAtual={perfil.fotoPerfil} />
        <Field label="Nome de exibição">
          <TextInput name="nome" required defaultValue={perfil.nome} />
        </Field>
        <Field label="Nome da marca">
          <TextInput name="marca" required defaultValue={perfil.marca} />
        </Field>
        <Field label="Frase de efeito">
          <TextInput name="frase" required defaultValue={perfil.frase} />
        </Field>
        <Field label="Descrição / sobre mim">
          <TextArea name="descricao" required defaultValue={perfil.descricao} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Cidade">
            <TextInput name="cidade" required defaultValue={perfil.cidade} />
          </Field>
          <Field label="WhatsApp (com DDI e DDD)">
            <TextInput name="whatsapp" placeholder="5571999999999" required defaultValue={perfil.whatsapp} />
          </Field>
        </div>
        <Field label="Link do Instagram">
          <TextInput type="url" name="instagram" defaultValue={perfil.instagram} />
        </Field>
        <SubmitButton>Salvar informações</SubmitButton>
      </form>

      <form action={salvarMensagens} className="grid max-w-[640px] gap-5 border-t border-cream-deep pt-10">
        <h3 className="text-[1.1rem] font-semibold">Mensagens automáticas do WhatsApp</h3>
        <Field label="Mensagem de encomenda geral">
          <TextArea name="tplEncomenda" defaultValue={perfil.tplEncomenda} />
        </Field>
        <Field label="Mensagem ao pedir um sabor (use {nome})">
          <TextArea name="tplProduto" defaultValue={perfil.tplProduto} />
        </Field>
        <Field label="Mensagem sobre um evento (use {evento})">
          <TextArea name="tplEvento" defaultValue={perfil.tplEvento} />
        </Field>
        <SubmitButton>Salvar mensagens</SubmitButton>
      </form>

      <form action={salvarAcesso} className="grid max-w-[640px] gap-5 border-t border-cream-deep pt-10">
        <h3 className="text-[1.1rem] font-semibold">Acesso ao painel</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Usuário">
            <TextInput name="usuario" defaultValue={admin?.usuario} />
          </Field>
          <Field label="Nova senha">
            <TextInput type="password" name="novaSenha" placeholder="Deixe em branco para manter" />
          </Field>
        </div>
        <SubmitButton secondary>Atualizar acesso</SubmitButton>
      </form>
    </div>
  );
}
