# Utiliser l'image Python officielle
FROM python:3.11-slim

# Variables d'environnement pour Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Créer et se placer dans le dossier de l'app
WORKDIR /app

# Installer pip et dépendances système
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copier requirements et installer
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copier le projet
COPY . .

# Exposer le port pour Render
EXPOSE 8000

# Exécuter les migrations, collecter les fichiers statiques puis démarrer gunicorn en liant à $PORT (port par défaut 8000)
ENTRYPOINT ["/bin/sh","-c","python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn backend.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3"]
