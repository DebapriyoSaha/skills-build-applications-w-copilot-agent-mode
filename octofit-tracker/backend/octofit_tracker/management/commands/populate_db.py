from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the database with test data'

    def handle(self, *args, **kwargs):
        # Users
        user1 = User.objects.create(email='alice@example.com', name='Alice', password='alicepass')
        user2 = User.objects.create(email='bob@example.com', name='Bob', password='bobpass')
        user3 = User.objects.create(email='carol@example.com', name='Carol', password='carolpass')

        # Teams
        team1 = Team.objects.create(name='Team Alpha', members=[user1.email, user2.email])
        team2 = Team.objects.create(name='Team Beta', members=[user3.email])

        # Activities
        Activity.objects.create(user_email=user1.email, activity_type='Running', duration=30)
        Activity.objects.create(user_email=user2.email, activity_type='Walking', duration=45)
        Activity.objects.create(user_email=user3.email, activity_type='Strength Training', duration=20)

        # Leaderboard
        Leaderboard.objects.create(team_name=team1.name, points=150)
        Leaderboard.objects.create(team_name=team2.name, points=100)

        # Workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups', suggested_for='Strength')
        Workout.objects.create(name='Jogging', description='Jog for 15 minutes', suggested_for='Cardio')
        Workout.objects.create(name='Plank', description='Hold plank for 1 minute', suggested_for='Core')

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
