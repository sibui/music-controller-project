from django.urls import path
from .views import AuthURL, IsAuthenticated

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', AuthURL.spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view())
]