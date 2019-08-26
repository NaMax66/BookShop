SPA приложение BookShop для TR Logic LLC
---------------------------------

>Реализовано на фреймворке Vue.js
>
>Оформление c помощью Bootstrap
>
### Основные файлы:

Название файла                    | Содержание файла
----------------------------------|------------------------------------------------------------
src/App.vue                       | Файл-обертка, так же в нем происходят все изменения данных
src/router.js                     | Здесь прописаны маршруты
src/views/Cart.vue                | Родительский элемент для Book.vue
src/views/Shop.vue                | Родительский элемент для CartBook.vue
src/components/Book.vue           | Компонент книга с изображением, названием и ценой
src/components/CartBook.vue       | Компонент "книга в корзине" с возможностью изменять кол-во
src/components/layout/Header.vue  | Шапка с ссылками на магазин и корзину

### Структура данных:

>В приложении два массива данных: books: [], booksInCart: []
>
>books - загружается с сервера, содержит: id, img(название изображения), title(название книги), 
>
>booksInCart - формируется на клиенте. В него добавлен элемент из books и свойство: amount(кол-во в корзине)
>
>booksInCart синхронизируется с localStorage

