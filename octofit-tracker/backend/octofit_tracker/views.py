
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

# Custom API root endpoint with codespace and localhost URLs
@api_view(['GET'])
def api_root(request, format=None):
    codespace_url = "https://redesigned-telegram-rx9w4r7q77jfxp7p-8000.app.github.dev/api/"
    localhost_url = "http://localhost:8000/api/"
    return Response({
        'users': [f'{codespace_url}users/', f'{localhost_url}users/'],
        'teams': [f'{codespace_url}teams/', f'{localhost_url}teams/'],
        'activity': [f'{codespace_url}activity/', f'{localhost_url}activity/'],
        'leaderboard': [f'{codespace_url}leaderboard/', f'{localhost_url}leaderboard/'],
        'workouts': [f'{codespace_url}workouts/', f'{localhost_url}workouts/'],
    })
