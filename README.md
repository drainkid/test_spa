## Задача

Реализовать небольшое SPA-приложение взаимодействующие с сервером.

## Приложение должно состоять из:

Страница авторизации

Таблица с данными полученными с сервера

Таблица должна предоставлять CRUD операции

## Описание поведения функций приложения:
Неавторизованный пользователь, открывая приложения должен получить предложение авторизоваться

После успешной авторизации пользователь должен увидеть таблицу с данными.

После перезагрузки страницы пользователь должен оставаться авторизован

Возможность добавить в таблицу новую запись

Новая записать в таблице должна появляться сразу

Возможность удалить запись

Удаленная записать должна сразу исчезнуть из таблицы

Возможность изменить запись

Изменения должны сразу отображаться в таблице

Приложение должно корректно сообщать пользователю об ошибках заполнения форм или неудачных запросах к серверу

Во время получения и отправки данных на сервер пользователю должны быть показаны индикаторы процесса загрузки/отправки (прогресс бары, спиннеры) данных

## Данные для авторизации:
"username": user{N}
"password": password

user{N} – где вместо N нужно ввести число, например user1, user2… user33. Данные в таблице для каждого сохраняются индивидуально.
password – одинаков для всех логинов, в случае его отличия сервер вернёт ошибку.


## Развернуть проект:
    npm i
    npm run dev


