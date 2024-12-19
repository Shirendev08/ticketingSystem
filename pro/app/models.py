from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('User', 'User'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.role}"


class Ticket(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=[('Open', 'Open'), ('Closed', 'Closed')], default='Open')
    priority = models.CharField(max_length=10, choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')], default='Low')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, related_name='created_tickets', on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(User, related_name='assigned_tickets', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.title
