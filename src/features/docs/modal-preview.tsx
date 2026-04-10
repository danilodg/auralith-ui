import { Link2, Mail, Users, UserPlus } from 'lucide-react'
import { Button, Card, Modal, Input, Select, Tag } from '../../lib'

export function ModalPreview({ isPt }: { isPt: boolean }) {
  return (
    <Card className="flex w-full flex-col items-center justify-center p-8 py-12 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.05)] border-0" variant="subtle" style={{ backgroundColor: 'transparent' }}>
      <div className="flex max-w-[420px] flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--surface-hover)] text-[color:var(--accent-line)] shadow-[inset_0px_1px_1px_rgba(255,255,255,0.1)]">
          <Users size={26} strokeWidth={1.8} />
        </div>
        <p className="font-[Space_Grotesk,Trebuchet_MS,sans-serif] text-xl font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
          {isPt ? 'Preview Pro do Modal' : 'Pro Modal Preview'}
        </p>
        <p className="mt-3 text-sm leading-6 text-[color:var(--text-soft)] px-4">
          {isPt
            ? 'Um exemplo premium mostrando a flexibilidade de composicao com inputs, selects e listas customizadas dentro de um unico portal overlay.'
            : 'A premium example showing composition flexibility with inputs, selects and custom lists inside a single overlay portal.'}
        </p>
        
        <Modal.Root>
          <div className="mt-8">
            <Modal.Trigger asChild>
              <Button>
                <UserPlus size={16} className="-ml-1 mr-2 opacity-70" />
                {isPt ? 'Convidar membros' : 'Invite members'}
              </Button>
            </Modal.Trigger>
          </div>

          <Modal.Content className="w-full max-w-[500px]">
            <Modal.Header>
              <Modal.Title>{isPt ? 'Convidar pessoas' : 'Invite people'}</Modal.Title>
              <Modal.Description>
                {isPt ? 'Compartilhe este projeto adicionando um e-mail a equipe.' : 'Share this project by adding an email to the team.'}
              </Modal.Description>
            </Modal.Header>

            <Modal.Body className="space-y-6">
              {/* Form de convite */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <Input.Root>
                    <Input.Field icon={<Mail size={16} />} placeholder={isPt ? 'E-mail do membro...' : 'Member email...'} type="email" />
                  </Input.Root>
                </div>
                <div className="w-[125px]">
                  <Select defaultValue="viewer">
                    <Select.Option value="viewer" label={isPt ? 'Visualizador' : 'Can view'} />
                    <Select.Option value="editor" label={isPt ? 'Editor' : 'Can edit'} />
                  </Select>
                </div>
                <Button variant="secondary" className="px-4 shrink-0">
                  {isPt ? 'Enviar' : 'Send'}
                </Button>
              </div>

              <hr className="border-[color:var(--card-border)] opacity-60" />

              {/* Lista de Membros */}
              <div className="space-y-4">
                <p className="font-[IBM_Plex_Mono,Trebuchet_MS,monospace] text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                  {isPt ? 'Membros atuais' : 'Current members'}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[color:var(--accent-end)] text-white shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2)] font-[Space_Grotesk,sans-serif] font-medium text-xs">
                      DG
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[color:var(--text-main)]">Danilo Gomes</span>
                      <span className="text-xs text-[color:var(--text-muted)]">danilo@auralith.com</span>
                    </div>
                  </div>
                  <Tag className="bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.05)] text-[color:var(--text-soft)]">
                    {isPt ? 'Proprietario' : 'Owner'}
                  </Tag>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[color:var(--surface-panel-3)] border border-[color:var(--card-border)] text-[color:var(--text-main)] font-[Space_Grotesk,sans-serif] font-medium text-xs">
                      AR
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[color:var(--text-main)]">Alice Ribeiro</span>
                      <span className="text-xs text-[color:var(--text-muted)]">alice@example.com</span>
                    </div>
                  </div>
                  <div className="w-[125px]">
                    <Select defaultValue="editor" hint="">
                      <Select.Option value="viewer" label={isPt ? 'Visualizador' : 'Viewer'} />
                      <Select.Option value="editor" label={isPt ? 'Editor' : 'Editor'} />
                    </Select>
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="justify-between items-center rounded-b-[18px]">
              <Button variant="secondary" className="bg-transparent border-0 px-2 text-[color:var(--text-soft)] hover:text-[color:var(--text-main)] hover:bg-[color:var(--surface-hover)]">
                <Link2 size={16} className="-ml-1 mr-2 opacity-70" />
                {isPt ? 'Copiar link' : 'Copy link'}
              </Button>
              <Modal.Close asChild>
                <Button>{isPt ? 'Concluido' : 'Done'}</Button>
              </Modal.Close>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>
      </div>
    </Card>
  )
}
