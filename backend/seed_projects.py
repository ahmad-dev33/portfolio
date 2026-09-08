import os, django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import Project

projects = [
    {
        "title": "MovieMate",
        "description": "MovieMate is a sleek and intuitive mobile app built with Expo React Native, designed to bring the magic of cinema to your fingertips. Users can browse trending movies, view detailed information including cast, trailers, and ratings, and create personalized watchlists. With a responsive design and smooth navigation, MovieMate offers a seamless experience across both Android and iOS devices - perfect for movie lovers on the go",
        "image": "projects/chatify.png",
        "gh_link": "https://github.com/ahmad-dev33/Movie_App",
        "tech_stack": "React Native, Expo, API Integration",
        "order": 1,
    },
    {
        "title": "Bits-0f-C0de",
        "description": "My personal telegram news bot which is build with python-telegram-bot api. It fetches the news from various news sources and send it to the user on telegram. The user can also choose the category of news he wants to receive. The bot is deployed on heroku and is running 24/7.",
        "image": "projects/blog.png",
        "gh_link": "https://github.com/ahmad-dev33/news",
        "tech_stack": "Python, python-telegram-bot, Heroku",
        "order": 2,
    },
    {
        "title": "Editor.io",
        "description": "My personal forex trading bot which is build with python. It uses the forex-python library to fetch the real-time forex data and then uses a simple algorithm to make buy/sell decisions. The bot is deployed on heroku and is running 24/7.",
        "image": "projects/codeEditor.png",
        "gh_link": "https://github.com/ahmad-dev33/forex",
        "tech_stack": "Python, forex-python, Heroku",
        "order": 3,
    },
    {
        "title": "Mapping AI",
        "description": "A python based bot that works with tensorflow and opencv to create a mapping of the place based on drone pictures.",
        "image": "projects/mapping.png",
        "gh_link": "https://github.com/ahmad-dev33/mapping",
        "tech_stack": "Python, TensorFlow, OpenCV",
        "order": 4,
    },
    {
        "title": "Facial Recognition Tool",
        "description": "facial recognizer python_Tensorflow based.",
        "image": "projects/face_recognition.png",
        "gh_link": "https://github.com/ahmad-dev33/Facial_recognition_tool",
        "tech_stack": "Python, TensorFlow, OpenCV",
        "order": 5,
    },
    {
        "title": "Kucoin Trading Bot",
        "description": "python kucoin trading app trained to trade with the signals it receives from telegram signal channel and works when it receives an email from the user.",
        "image": "projects/trading.png",
        "tech_stack": "Python, Kucoin API, Telegram API",
        "order": 6,
    },
]

created = 0
for p in projects:
    obj, was_created = Project.objects.get_or_create(title=p["title"], defaults=p)
    created += 1 if was_created else 0

print(f"Done. {created} project(s) created, {len(projects) - created} already existed.")