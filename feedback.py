from flask import Flask, request, render_template, redirect
import mysql.connector
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'travels'  # Required for  flash messages

# Connect to MySQL database
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="tours"
)
conn.ping(reconnect=True)
cursor = conn.cursor()

@app.route("/h1")
def home():
    return render_template("h1.html")  # Fixed filename with underscore
@app.route('/explore')
def explore():
    return "Explore Page"

@app.route('/hotels')
def hotels():
    return "Hotels Page"

@app.route('/aboutus')
def aboutus():
    return "About Us Page"

@app.route('/contactus')
def contactus():
    return "Contact Us Page"

@app.route('/submit', methods=['POST'])
def submit_form():
    username = request.form.get('username')  # Get form data
    email = request.form.get('email')
    return f"Form Submitted! Name: {username}, Email: {email}"

@app.route("/submit-feedback", methods=["POST"])  # Fixed route name with proper URL format
@app.route("/submit-feedback", methods=["POST"])  
def submit_feedback():
    try:
        name = request.form.get("name")
        email = request.form.get("email") 
        message = request.form.get("message")
        rating = request.form.get("rating")
        submit_date = datetime.today().strftime('%Y-%m-%d')

        # Assuming a dummy user_id for now (replace with actual logic)
        user_id = 1  

        # Insert feedback into database
        query = "INSERT INTO feedback (user_id, message, rating, submit_date) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (user_id, message, rating, submit_date))
        conn.commit()

        print("Feedback inserted successfully!")  # Debugging purpose

    except mysql.connector.Error as e:
        print(f"Error: {e}")  # Debugging purpose

    finally:
        cursor.close()

    return redirect("/h1")  # Redirect back to homepage after form submission

if __name__ == "__main__":
    app.run(debug=True)