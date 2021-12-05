from django.urls import path

from . import views

# add a namespace
app_name = 'polls'
urlpatterns = [
  path('', views.index, name='index'), # the path is '/polls', connected to the index view, name is index
  path('<int:question_id>/', views.detail, name='detail'),
  path('<int:question_id>/results/', views.results, name='results'),
  path('<int:question_id>/vote/', views.vote, name='vote')
]
