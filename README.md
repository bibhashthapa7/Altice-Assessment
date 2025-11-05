# Altice-Assessment

## Setup Intructions:

### Python cackend setup (Django framework):
```bash
cd django-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
Create a `.env` file in the `django-backend` folder with the API key:
```
TMDB_API_KEY=your_api_key_here
```
```bash
python manage.py migrate
python manage.py runserver
```