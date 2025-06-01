from app.core.database import SessionLocal
from app.models import User, Blog 
from sqlalchemy.orm import Session
from app.utils.hashing import hash_password
from faker import Faker

fake = Faker()

def seed():
  print("Initializing database connection...")
  db: Session = SessionLocal()
  print("Connected to the database.")

  print("Deleting existing data...")
  # Clear the database
  users = db.query(User).all()
  for user in users: 
    db.delete(user)
  db.commit()
  
  blogs = db.query(Blog).all()
  for blog in blogs: 
    db.delete(blog)
  db.commit()

  print("Existing data deleted.")
  print("Seeding database with sample data...")
  # Create 5 sample users
  users = [
    User(first_name='Alice', last_name='Smith', email='alicesmith@example.com', password=hash_password('password123')),
    User(first_name='Bob', last_name='Johnson',email='bobjohnson@example.com', password=hash_password('password123')),
    User(first_name='Charlie', last_name='Brown', email='charliebrown@example.com', password=hash_password('password123')),
    User(first_name='Diana', last_name='Prince', email='dianaprince@example.com', password=hash_password('password123')),
    User(first_name='Ethan', last_name='Hunt', email='ethanhunt@example.com', password=hash_password('password123'))
  ]
  db.add_all(users)
  db.commit()
  
  # Create 5 sample blogs each users
  blogs = []
  for user in users:
    for _ in range(5):
      blog = Blog(
        title=fake.sentence(nb_words=15, variable_nb_words=True),
        content=fake.paragraphs(nb=7),
        author_id=user.id
      )
      blogs.append(blog)
      
  db.add_all(blogs)
  db.commit()

  print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
    print("Seeding completed.")