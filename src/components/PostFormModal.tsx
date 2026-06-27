import { useEffect, useState } from 'react';

import type { Post } from '../api/postsApi';

type PostFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, body: string) => void;
  editingPost?: Post | null;
};

function PostFormModal({
  isOpen,
  onClose,
  onSave,
  editingPost,
}: PostFormModalProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [editingPost, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    onSave(title, body);

    setTitle('');
    setBody('');

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {editingPost
            ? 'Редактировать запись'
            : 'Добавить запись'}
        </h2>

        <form
          className="modal-form"
          onSubmit={handleSubmit}
        >

          <label>
            Название

            <input
              type="text"
              value={title}
              placeholder="Введите название"
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />
          </label>

          <label>
            Описание

            <textarea
              value={body}
              placeholder="Введите описание"
              onChange={(event) =>
                setBody(event.target.value)
              }
            />
          </label>

          <div className="modal-buttons">
            <button type="submit">
              Сохранить
            </button>
            <button
              type="button"
              onClick={onClose}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostFormModal;