import * as yup from 'yup';

export const postSchema = yup.object({
  title: yup
    .string()
    .required('Введите название поездки')
    .min(3, 'Минимум 3 символа')
    .max(50, 'Максимум 50 символов'),

  body: yup
    .string()
    .required('Введите описание')
    .min(10, 'Минимум 10 символов')
    .max(300, 'Максимум 300 символов'),
});

export type PostFormValues = yup.InferType<typeof postSchema>;