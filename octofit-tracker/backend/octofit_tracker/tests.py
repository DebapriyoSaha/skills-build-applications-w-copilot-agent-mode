from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(email="test@example.com", name="Test User", password="testpass")
    def test_user_email(self):
        user = User.objects.get(email="test@example.com")
        self.assertEqual(user.name, "Test User")

class TeamTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(email="team@example.com", name="Team User", password="teampass")
        team = Team.objects.create(name="Team A")
        team.members.add(user)
    def test_team_name(self):
        team = Team.objects.get(name="Team A")
        self.assertEqual(team.name, "Team A")

class ActivityTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(email="activity@example.com", name="Activity User", password="activitypass")
        Activity.objects.create(user=user, activity_type="Running", duration=30)
    def test_activity_type(self):
        activity = Activity.objects.get(activity_type="Running")
        self.assertEqual(activity.duration, 30)

class LeaderboardTestCase(TestCase):
    def setUp(self):
        team = Team.objects.create(name="Leaderboard Team")
        Leaderboard.objects.create(team=team, points=100)
    def test_leaderboard_points(self):
        leaderboard = Leaderboard.objects.get(points=100)
        self.assertEqual(leaderboard.team.name, "Leaderboard Team")

class WorkoutTestCase(TestCase):
    def setUp(self):
        Workout.objects.create(name="Pushups", description="Do 20 pushups", suggested_for="Strength")
    def test_workout_name(self):
        workout = Workout.objects.get(name="Pushups")
        self.assertEqual(workout.suggested_for, "Strength")
