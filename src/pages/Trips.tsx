import { useState } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../api/postsApi';

import type {
  Post,
  PostFormData,
} from '../api/postsApi';

import { useAuthStore } from '../store/authStore';

import PostCard from '../components/PostCard';
import PostFormModal from '../components/PostFormModal';
import ConfirmModal from '../components/ConfirmModal';

function Trips() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const createMutation = useMutation({
    mutationFn: createPost,

    onSuccess: (newPost) => {
      queryClient.setQueryData<Post[]>(['posts'], (oldPosts) => {
        if (!oldPosts) {
          return [newPost];
        }

        return [newPost, ...oldPosts];
      });
    },

    onError: () => {
      alert('Не удалось добавить запись.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: PostFormData;
    }) => updatePost(id, data),

    onSuccess: (updatedPost) => {
      queryClient.setQueryData<Post[]>(['posts'], (oldPosts) => {
        if (!oldPosts) {
          return [updatedPost];
        }

        return oldPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Post[]>(['posts'], (oldPosts) => {
        if (!oldPosts) {
          return [];
        }

        return oldPosts.filter(
          (post) => post.id !== deletedId
        );
      });
    },
    onError: () => {
      alert('Не удалось удалить запись.');
    },
  });

  const handleAdd = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeletingPostId(id);
  };

  const confirmDelete = () => {
    if (deletingPostId === null) {
      return;
    }

    deleteMutation.mutate(deletingPostId);
    setDeletingPostId(null);
  };

  const handleSave = (title: string, body: string) => {
    const data = {
      title,
      body,
    };

    if (editingPost) {
      updateMutation.mutate({
        id: editingPost.id,
        data,
      });
    } else {
      createMutation.mutate(data);
    }

    setEditingPost(null);
  };


  return (
    <main className="trips-page">

      <section className="trips-section">
        <div className="trips-section__top">
          <h2>Мои путешествия</h2>

          <button
            type="button"
            onClick={handleAdd}
            disabled={createMutation.isPending}
          >
            Добавить
          </button>
        </div>

        {isLoading && <p>Загрузка записей...</p>}

        {isError && <p>Не удалось загрузить записи.</p>}

        {!isLoading && !isError && (
          <div className="trips-list">
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      <PostFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSave}
        editingPost={editingPost}
      />

      <ConfirmModal
        isOpen={deletingPostId !== null}
        title="Удалить запись?"
        text="Это действие нельзя будет отменить."
        onConfirm={confirmDelete}
        onCancel={() => setDeletingPostId(null)}
      />
    </main>
  );
}

export default Trips;