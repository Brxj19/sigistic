import json
import random
import string
from faker import Faker

# Initialize specifically for Indian names and context
fake = Faker('en_IN')
Faker.seed(11)
random.seed(11)

# Configuration
NUM_AGENTS = 1000
FILE_NAME = "delivery_agents_seed.json"

# Common email providers in India
EMAIL_PROVIDERS = ["gmail.com", "yahoo.co.in", "hotmail.com", "outlook.com", "icloud.com"]

# Using the exact same mapping as your shipment script for data integrity
CITY_SUBREGIONS = {
    "Bengaluru": ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "Electronic City", "Jayanagar"],
    "Mumbai": ["Andheri", "Bandra", "Powai", "Colaba", "Borivali", "Worli"],
    "Delhi": ["Dwarka", "Saket", "Connaught Place", "Hauz Khas", "Rohini", "Karol Bagh"],
    "Hyderabad": ["Gachibowli", "Jubilee Hills", "Banjara Hills", "Kukatpally", "Madhapur"],
    "Chennai": ["Adyar", "T. Nagar", "Velachery", "Anna Nagar", "Mylapore", "Guindy"],
    "Pune": ["Kothrud", "Hinjewadi", "Viman Nagar", "Baner", "Kalyani Nagar"],
    "Lucknow": ["Gomti Nagar", "Alambagh", "Hazratganj", "Indira Nagar"],
    "Ahmedabad": ["Satellite", "Navrangpura", "Prahlad Nagar", "Bodakdev"],
    "Kolkata": ["Salt Lake", "New Town", "Park Street", "Ballygunge", "Behala"]
}

INDIAN_CITIES = list(CITY_SUBREGIONS.keys())

def generate_strong_password():
    """Generate a strong password matching validator.isStrongPassword"""
    upper = random.choice(string.ascii_uppercase)
    lower = random.choice(string.ascii_lowercase)
    digit = random.choice(string.digits)
    special = random.choice("!@#$%^&*")
    
    others = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    
    password = upper + lower + digit + special + others
    return ''.join(random.sample(password, len(password)))

agents = []
used_phones = set()

for i in range(NUM_AGENTS):
    full_name = fake.name()
    
    # 1. Randomized Email Provider Logic
    email_name = full_name.lower().replace(" ", "")
    provider = random.choice(EMAIL_PROVIDERS)
    email = f"{email_name}{i}@{provider}"
    
    # 2. Unique Indian Mobile Number
    phone = f"{random.randint(7, 9)}{random.randint(100000000, 999999999)}"
    while phone in used_phones:
        phone = f"{random.randint(7, 9)}{random.randint(100000000, 999999999)}"
    used_phones.add(phone)

    # 3. Location Logic (City first, then Subregion)
    city = random.choice(INDIAN_CITIES)
    subregion = random.choice(CITY_SUBREGIONS[city])

    # 4. Status and Workload Logic
    is_active = True if random.random() < 0.85 else False

    agent_entry = {
        "name": full_name,
        "email": email,
        "password_hash": generate_strong_password(),
        "phone": phone,
        "city": city,
        "subregion": subregion, # Added subregion
        "availability_status": random.choice(['available', 'busy', 'offline']),
        "active_shipments_count": random.randint(0, 5) if is_active else 0,
        "rating": round(random.uniform(3.5, 5.0), 1),
        "is_active": is_active,
        "otp_hash": None,
        "otp_expiry": None
    }
    agents.append(agent_entry)

# Export to JSON
with open(FILE_NAME, 'w', encoding='utf-8') as f:
    json.dump(agents, f, indent=2)

print(f"Done! {FILE_NAME} is ready with {NUM_AGENTS} unique Indian agents and subregions.")