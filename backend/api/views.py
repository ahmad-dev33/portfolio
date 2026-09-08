from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework import generics
from django.contrib.auth.models import User
from django.conf import settings
from django.core.mail import send_mail
from .serializers import UserSerializer, ProjectSerializer, ContactMessageSerializer
from .models import Project, ContactMessage

# 1. فئة إنشاء الحساب التي يشتكي دجانغو من عدم وجودها 💡
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] # السماح للجميع بإنشاء حساب

# 2. تخصيص تسجيل الدخول لحقن الكوكي (طريقة الشركات)
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            refresh_token = response.data.pop('refresh')
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=refresh_token,
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAME_SITE']
            )
        return response

# 3. تسجيل الخروج وتدمير الكوكي
class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        response = Response({"detail": "تم تسجيل الخروج بنجاح"}, status=status.HTTP_200_OK)
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        return response

# 4. قائمة المشاريع - عامة ولا تحتاج تسجيل دخول
class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.filter(active=True)
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

# 5. استقبال رسائل التواصل - عامة
class CreateContactMessageView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        message = serializer.save()
        self._notify(message)

    def _notify(self, message):
        """أرسل إشعار البريد الإلكتروني إن كان الإعداد مكتملاً."""
        if not (settings.EMAIL_HOST_USER and settings.CONTACT_EMAIL_TO):
            return
        subject = f"New contact message from {message.name}"
        body = (
            f"Name: {message.name}\n"
            f"Email: {message.email}\n\n"
            f"Message:\n{message.message}\n"
        )
        try:
            send_mail(
                subject,
                body,
                settings.EMAIL_HOST_USER,
                [settings.CONTACT_EMAIL_TO],
                fail_silently=False,
            )
        except Exception as exc:
            # لا نسقط الطلب بسبب فشل البريد؛ الرسالة محفوظة في قاعدة البيانات على أي حال
            import logging
            logging.getLogger(__name__).exception("Failed to email contact message: %s", exc)