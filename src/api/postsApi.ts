import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const destinations = [
  'Япония',
  'Италия',
  'Норвегия',
  'Исландия',
  'Франция',
  'Испания',
  'Канада',
  'Австралия',
  'Бразилия',
  'Швейцария',
];

const travelDescriptions = [
  'Маршрут по Токио, Киото и парку Нара с заметками о местах, которые стоит посетить.',
  'План поездки по Риму, Флоренции и Венеции с акцентом на архитектуру и местную кухню.',
  'Путешествие по фьордам, северным городам и живописным природным маршрутам.',
  'Заметки о поездке к водопадам, вулканическим пляжам и горячим источникам.',
  'Маршрут по Парижу, музеям, старинным кварталам и уютным кафе.',
  'План отдыха в Барселоне, Мадриде и прибрежных городах.',
  'Путешествие по национальным паркам, озёрам и крупным городам Канады.',
  'Заметки о поездке к океану, природным паркам и современным районам Сиднея.',
  'Маршрут по Рио-де-Жанейро, пляжам и природным достопримечательностям.',
  'План поездки по Альпам, озёрам и небольшим швейцарским городам.',
];

export type Post = {
  id: number;
  userId?: number;
  title: string;
  body: string;
};

export type PostFormData = {
  title: string;
  body: string;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(API_URL);

  return response.data.slice(0, 10).map((post, index) => ({
    ...post,
    title: destinations[index],
    body: travelDescriptions[index],
  }));
};

export const createPost = async (data: PostFormData): Promise<Post> => {
  const response = await axios.post<Post>(API_URL, {
    ...data,
    userId: 1,
  });

  return response.data;
};

export const updatePost = async (
  id: number,
  data: PostFormData
): Promise<Post> => {
  const response = await axios.put<Post>(`${API_URL}/${id}`, {
    id,
    ...data,
    userId: 1,
  });

  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};