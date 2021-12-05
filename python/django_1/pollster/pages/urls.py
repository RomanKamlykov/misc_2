from django.urls import path

from . import views

# add a namespace
urlpatterns = [
  path('', views.index, name='index') # the path is '/polls', connected to the index view, name is index
]
