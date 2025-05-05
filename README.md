# 🚀 API Endpoints

## 🔐 Аутентификация
| Метод | Путь       | Описание                | Аутентификация |
|-------|------------|-------------------------|----------------|
| POST  | /register  | Регистрация пользователя | Нет           |
| POST  | /login     | Вход в систему          | Нет           |
| POST  | /verify    | Подтверждение email     | Нет           |

## 👥 Пользователи
| Метод | Путь                     | Описание                          | Аутентификация |
|-------|--------------------------|-----------------------------------|----------------|
| GET   | /profile/:id            | Получить профиль пользователя     | Да (JWT)      |
| GET   | /get-random-users       | Получить случайных пользователей  | Да (JWT)      |
| GET   | /user/me                | Получить текущий профиль          | Да (JWT)      |
| PUT   | /profile/edit           | Редактировать профиль             | Да (JWT)      |
| POST  | /upload                 | Загрузить аватар                  | Да (JWT)      |

## 👫 Друзья
| Метод | Путь                     | Описание                          | Аутентификация |
|-------|--------------------------|-----------------------------------|----------------|
| PUT   | /friends/accept         | Принять заявку в друзья           | Да (JWT)      |
| POST  | /friends/request        | Отправить заявку в друзья         | Да (JWT)      |
| DELETE| /friends/cancel         | Отменить заявку в друзья          | Да (JWT)      |
| DELETE| /friends/reject         | Отклонить заявку в друзья         | Да (JWT)      |
| DELETE| /friends/remove         | Удалить из друзей                 | Да (JWT)      |
| GET   | /friends/request/sent   | Получить отправленные заявки      | Да (JWT)      |
| GET   | /friends/request/received| Получить полученные заявки       | Да (JWT)      |
| GET   | /friends                | Получить всех друзей              | Да (JWT)      |

## 📝 Посты
| Метод | Путь                     | Описание                          | Аутентификация |
|-------|--------------------------|-----------------------------------|----------------|
| POST  | /post/create            | Создать пост                     | Да (JWT)      |
| GET   | /post/get/:id           | Получить посты пользователя       | Да (JWT)      |
| GET   | /feed                   | Получить ленту постов             | Да (JWT)      |
| GET   | /post/:id               | Получить детали поста             | Да (JWT)      |
| GET   | /liked-posts            | Получить понравившиеся посты      | Да (JWT)      |
| POST  | /post/:postId/toggleLike| Поставить/убрать лайк             | Да (JWT)      |
| POST  | /post/:postId/toggleDislike| Поставить/убрать дизлайк       | Да (JWT)      |

## 💬 Комментарии
| Метод | Путь             | Описание                | Аутентификация |
|-------|------------------|-------------------------|----------------|
| POST  | /comment/create | Создать комментарий     | Да (JWT)      |
| GET   | /comments/get    | Получить комментарии    | Да (JWT)      |

## 🔔 Уведомления
| Метод | Путь               | Описание                | Аутентификация |
|-------|--------------------|-------------------------|----------------|
| GET   | /notifications     | Получить все уведомления| Да (JWT)      |
| GET   | /get-notifications | Получить уведомления    | Да (JWT)      |

Страница профиля 
![image](https://github.com/user-attachments/assets/1e23e6c6-055c-4101-a9c8-e022327faf93)

Список друзей
![image](https://github.com/user-attachments/assets/ddb4385c-b554-4d68-a4f4-8966344aed50)

Отправленные запросы 
![image](https://github.com/user-attachments/assets/f9363482-fad8-4178-b105-aa1c674ad91c)

Запросы в друзья 
![image](https://github.com/user-attachments/assets/942578ce-af6b-4a82-a357-c60e9a745e75)

Поиск друзей 
![image](https://github.com/user-attachments/assets/959e5562-9969-497f-8798-3a23eacfd0d8)

Страница создания поста
![image](https://github.com/user-attachments/assets/8de59fa1-4c31-49be-80bb-d368a14b4b64)

Лента новостей (посты друзей)
![image](https://github.com/user-attachments/assets/2bf70331-a112-48be-ada3-a0360f0336d7)

Страница входа
![image](https://github.com/user-attachments/assets/66893bab-8b20-45c7-8976-8905865efa84)

Страница регистрации
![image](https://github.com/user-attachments/assets/e905986d-fe3a-4e69-b1b0-bd88d604dbeb)

