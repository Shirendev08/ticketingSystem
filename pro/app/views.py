from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

@api_view(['POST'])
def register(request):
    if request.method == "POST":
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": f"Хэрэглэгч {username} бүртгэлтэй байна."})
        if User.objects.filter(email=email).exists():
            return Response({"error": f"Хэрэглэгч {email} бүртгэлтэй байна."})
        
        user = User.objects.create_user(username=username,email=email, password=password)
        return Response({"message": "User registered successfully"}, status=201)

class MyTokenObtainPairView(TokenObtainPairView):
    pass

# Token refresh view
class MyTokenRefreshView(TokenRefreshView):
    pass