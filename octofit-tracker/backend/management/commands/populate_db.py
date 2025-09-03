from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import timedelta


class Command(BaseCommand):
    help = 'Populate the database with sample data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create sample users (models use `username`)
        user1 = User.objects.create(username='alice', email='alice@example.com', password='password')
        user2 = User.objects.create(username='bob', email='bob@example.com', password='password')

        # Create sample teams
        team1 = Team.objects.create(name='Team Alpha')
        team2 = Team.objects.create(name='Team Beta')

        # Assign users to teams (ArrayReferenceField supports .add in this project pattern)
        try:
            team1.members.add(user1)
            team2.members.add(user2)
        except Exception:
            # Fallback: if members.add is not supported, directly set members list
            team1.members = [user1]
            team1.save()
            team2.members = [user2]
            team2.save()

        # Create sample activities (models use `activity_type` and DurationField)
        Activity.objects.create(user=user1, activity_type='Running', duration=timedelta(minutes=30))
        Activity.objects.create(user=user2, activity_type='Cycling', duration=timedelta(minutes=45))

        # Create sample workouts (Workout model has name & description)
        Workout.objects.create(name='Morning Run', description='Easy 30 minute run')
        Workout.objects.create(name='Evening Ride', description='45 minute cycling session')

        # Create sample leaderboard entries
        Leaderboard.objects.create(user=user1, score=100)
        Leaderboard.objects.create(user=user2, score=80)

        self.stdout.write(self.style.SUCCESS('Database populated with sample data.'))