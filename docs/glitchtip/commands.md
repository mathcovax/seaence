# Create user

```bash
docker compose exec glitchtip python manage.py createsuperuser
```

# List users

```bash
docker compose exec glitchtip python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); print(User.objects.all())"
```