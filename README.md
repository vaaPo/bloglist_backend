# bloglist_backend
Simple bloglist backend API /api/blogs
## bloglist_frontend
Will be built to build-directory from the bloglist_frontend repository.
## directory
```
build
controllers
├── ES7
│   ├── ASYNCblogscontroller.js
│   └── ASYNCuserscontroller.js
└── login.js
models
├── blog.js
└── user.js
requests
├── api_blogs
│   ├── delete_api_blogs_id.rest
│   ├── get_api_blogs_id.rest
│   ├── get_api_blogs.rest
│   ├── post_api_blogs_bearer_auth.rest
│   ├── post_api_blogs_likes_isnull.rest
│   ├── post_api_blogs_likes_missing.1.rest
│   ├── post_api_blogs.rest
│   └── put_api_blogs.rest
├── api_users
│   ├── delete_api_user_id.rest
│   ├── get_api_users_id.rest
│   ├── get_api_users.rest
│   └── post_api_users.rest
└── login.rest
tests
├── average.test.js
├── blog_api.test.js
├── list.test.js
├── user_api.test.js
└── user_test_helper.js
utils
├── config.js
├── for_testing.js
├── list_helper.js
├── middleware.js
├── stackoverflow.1.js
└── stackoverflow.js
```

## github
<https://github.com/vaaPo/bloglist_backend>

## Homeworks covered:
- [x] 4.1 blogilista, osa 1
- [x] 4.2 blogilista, osa 2
- [x] 4.3 apufunktioita ja yksikkötestejä, osa 1
- [x] 4.4 apufunktioita ja yksikkötestejä, osa 2
- [x] 4.5* apufunktioita ja yksikkötestejä, osa 3
- [x] 4.6* apufunktioita ja yksikkötestejä, osa 4
- [x] 4.7* apufunktioita ja yksikkötestejä, osa 5
- [x] 4.8 blogilistan testit, osa 1
- [x] 4.9 blogilistan testit, osa 2
- [x] 4.10* blogilistan testit, osa 3
- [x] 4.11* blogilistan testit, osa 4
- [x] 4.12* blogilistan laajennus, osa 1
- [x] 4.13 blogilistan laajennus, osa 2
- [x] 4.14* blogilistan laajennus, osa 3
- [x] 4.15 blogilistan laajennus, osa 4
- [x] 4.16* blogilistan laajennus, osa 5
- [x] 4.17 blogilistan laajennus, osa 6
- [x] 4.18 blogilistan laajennus, osa 7
- [x] 4.19 blogilistan laajennus, osa 8
- [] 4.20* blogilistan laajennus, osa 9
- [] 4.21* blogilistan laajennus, osa 10

### npm installs
### directories + .env login.js / login.rest
```
$ cp ../fullstack_part3_backend/package.json .
$ cp ../fullstack_part3_backend/.env .
$ mkdir build
$ cd build
/build$ mkdir static
/build$ cd ..
$ mkdir controllers
$ mkdir controllers/ES7
$ cp ../fullstack_part3_backend/controllers/login.js controllers/
$ mkdir models
$ mkdir requests
$ mkdir requests/api_blogs
$ cp ../fullstack_part3_backend/requests/login.rest ./requests/
$ mkdir tests
$ mkdir utils
```
### npm installs
```
$ npm install
```

### some files + letter from hw4.1 to index.js for refactoring
```
$ touch index.js
$ cp ../fullstack_part3_backend/utils/* utils/
$ touch ./controllers/ES7/ASYNCblogscontroller.js
$ touch ./models/blog.js
$ cp ../fullstack_part3_backend/models/user.js models/
```

### git log and try test environment
```
git log --oneline --decorate --color
npm rum watchtest
```

### pathological server hangs EADDRINUSE
```
lsof -i :3003
```



