import { Button, Card, Modal } from '../../lib'

export function ModalPreview({ isPt }: { isPt: boolean }) {
  return (
    <Card className="p-2" variant="subtle">
      <p className="font-medium text-[color:var(--text-main)]">{isPt ? 'Preview interativo do modal' : 'Interactive modal preview'}</p>
      <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">
        {isPt
          ? 'Clique no botao para abrir o dialog e ver como o componente se comporta.'
          : 'Click the button to open the dialog and see how the component behaves.'}
      </p>
      <Modal.Root>
        <div className="mt-4">
          <Modal.Trigger asChild>
            <Button>{isPt ? 'Abrir modal' : 'Open modal'}</Button>
          </Modal.Trigger>
        </div>

        <Modal.Content>
          <Modal.Header>
            <Modal.Title>{isPt ? 'Detalhes do workspace' : 'Workspace details'}</Modal.Title>
            <Modal.Description>
              {isPt ? 'Estrutura pensada para confirmacao, edicao e detalhes.' : 'Structure designed for confirmation, editing and details.'}
            </Modal.Description>
          </Modal.Header>

          <Modal.Body>
            <p className="text-sm leading-6 text-[color:var(--text-soft)]">
              {isPt
                ? 'Esse modal mostra o comportamento real do componente dentro da propria docs.'
                : 'This modal shows the real behavior of the component inside the docs itself.'}
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Close asChild>
              <Button>{isPt ? 'Fechar' : 'Close'}</Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </Card>
  )
}
