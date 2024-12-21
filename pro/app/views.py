# views.py
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import Ticket
from .serializers import UserSerializer, TicketSerializer
from rest_framework.decorators import api_view
from django.db.models import Count
from django.db.models.functions import TruncMonth
from rest_framework.views import APIView
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": f"User {username} already exists."}, status=400)
        if User.objects.filter(email=email).exists():
            return Response({"error": f"Email {email} is already registered."}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=201)

class MyTokenObtainPairView(TokenObtainPairView):
    pass

class MyTokenRefreshView(TokenRefreshView):
    pass

class TicketCreateView(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Get the assigned_to user from the request data, if it exists
        assigned_to = self.request.data.get('assigned_to')

        if assigned_to:
            # Ensure the assigned user is valid (optional: add validation if needed)
            try:
                assigned_user = User.objects.get(id=assigned_to)
                serializer.save(created_by=self.request.user, assigned_to=assigned_user)
            except User.DoesNotExist:
                raise serializer.ValidationError("Assigned user not found.")
        else:
            # If no assigned user is provided, it will be None (the default behavior)
            serializer.save(created_by=self.request.user)
        

class TicketListView(generics.ListAPIView):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return  Ticket.objects.filter(created_by=self.request.user)


class TicketAssignedListView(generics.ListAPIView):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Get all tickets assigned to the current user
        return Ticket.objects.filter(assigned_to=self.request.user)
    


class TicketStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        # Tickets created by the user
        tickets_created_by_user = (
            Ticket.objects.filter(created_by=user)
            .values("status")
            .annotate(count=Count("status"))
        )

        tickets_created_by_user_per_month = (
            Ticket.objects.filter(created_by=user)
            .annotate(month=TruncMonth("created_at"))
            .values("month")
            .annotate(count=Count("id"))
            .order_by("month")
        )

        tickets_created_by_user_by_priority = (
            Ticket.objects.filter(created_by=user)
            .values("priority")
            .annotate(count=Count("priority"))
        )

        # Tickets assigned to the user
        tickets_assigned_to_user = (
            Ticket.objects.filter(assigned_to=user)
            .values("status")
            .annotate(count=Count("status"))
        )

        tickets_assigned_to_user_per_month = (
            Ticket.objects.filter(assigned_to=user)
            .annotate(month=TruncMonth("created_at"))
            .values("month")
            .annotate(count=Count("id"))
            .order_by("month")
        )

        tickets_assigned_to_user_by_priority = (
            Ticket.objects.filter(assigned_to=user)
            .values("priority")
            .annotate(count=Count("priority"))
        )

        # Overall stats
        total_created = Ticket.objects.filter(created_by=user).count()
        total_assigned = Ticket.objects.filter(assigned_to=user).count()

        return Response({
            "created_by_user": {
                "tickets_by_status": tickets_created_by_user,
                "tickets_per_month": tickets_created_by_user_per_month,
                "tickets_by_priority": tickets_created_by_user_by_priority,
                "total_tickets": total_created,
            },
            "assigned_to_user": {
                "tickets_by_status": tickets_assigned_to_user,
                "tickets_per_month": tickets_assigned_to_user_per_month,
                "tickets_by_priority": tickets_assigned_to_user_by_priority,
                "total_tickets": total_assigned,
            }
        })    