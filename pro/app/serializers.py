# serializers.py
from rest_framework import serializers
from .models import Ticket, Profile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class TicketSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'status', 'priority', 'created_at', 'updated_at', 'created_by', 'assigned_to']
        read_only_fields = ['created_at', 'updated_at', 'created_by']

    def create(self, validated_data):
        # If 'assigned_to' is not provided, set it to None
        assigned_to = validated_data.get('assigned_to', None)
        ticket = Ticket.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            priority=validated_data.get('priority', 'Low'),
            status=validated_data.get('status', 'Open'),
            created_by=validated_data['created_by'],
            assigned_to=assigned_to
        )
        return ticket
