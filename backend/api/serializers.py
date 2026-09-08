from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Project, ContactMessage

class UserSerializer(serializers.ModelSerializer):
    # نحدد أن كلمة المرور تُكتب فقط عند التسجيل ولا يمكن قراءتها عبر الـ API للأمان
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def create(self, validated_data):
        # 💡 حاسم جداً: استخدام create_user لتشفير كلمة المرور في قاعدة البيانات وليس create العادية
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user


class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'image', 'gh_link',
            'demo_link', 'tech_stack', 'featured',
        ]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            url = obj.image.url
            if request:
                url = request.build_absolute_uri(url)
            return url
        return None


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']