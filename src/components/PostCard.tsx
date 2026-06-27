import type { Post } from '../api/postsApi';

type PostCardProps = {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
};

function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  return (
    <article className="trip-card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <div className="trip-card__actions">
        <button
          type="button"
          onClick={() => onEdit(post)}
        >
          Редактировать
        </button>

        <button
          type="button"
          onClick={() => onDelete(post.id)}>
          Удалить
        </button>
      </div>
    </article>
  );
}

export default PostCard;