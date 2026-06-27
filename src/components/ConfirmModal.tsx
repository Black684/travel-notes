type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmModal({
  isOpen,
  title,
  text,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal confirm-modal">
        <h2>{title}</h2>

        <p>{text}</p>

        <div className="modal-buttons">
          <button type="button" onClick={onConfirm}>
            Удалить
          </button>

          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;