```
> docker build -t myapp-dev .
> docker run -it --name myapp --rm \
  --volume $(pwd):/usr/src/app \
  --net=host myapp-dev:latest \
  sh
> uvicorn app.main:app --reload
```