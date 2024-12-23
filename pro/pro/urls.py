"""
URL configuration for pro project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app.views import *
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('tickets/create/', TicketCreateView.as_view(), name='create_ticket'),
    path('tickets/', TicketListView.as_view(), name='list_tickets'),
    path('tickets/assigned/', TicketAssignedListView.as_view(), name='ticket-assigned-list'),
    path('diagrams/', TicketStatsView.as_view(), name='diagrams' ),
    path('users/', UserListView.as_view(), name='user-list'),
    path('tickets/assigned/<int:pk>/', TicketAssignedDetailUpdateView.as_view(), name='ticket-assigned-detail-update'),
]
