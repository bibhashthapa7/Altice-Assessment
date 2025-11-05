# Altice-Assessment

## Setup Intructions:

### Python backend setup (Django framework):
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
Run migrations and start Django server:
```bash
python manage.py migrate
python manage.py runserver
```
The backend will run at `http://localhost:8000`

### React frontend setup:
Open a new terminal window:
```bash
# Navigate to frontend folder
cd react-frontend

# Install dependencies
npm install

# Start React development server
npm start
```

The frontend will run at `http://localhost:3000`
