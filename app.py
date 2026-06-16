from flask import Flask, render_template, request, redirect, url_for, flash, session
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for flash messages and session management

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="tours"
    )

@app.route("/")
@app.route("/h1")
def home():
    return render_template("h1.html")

@app.route('/explore')
def explore():
    return render_template("explore.html")



@app.route('/aboutus')
def aboutus():
    return render_template("aboutus.html")

@app.route('/contactus')
def contactus():
    return render_template("contactus.html")

@app.route('/ahmedabad')
def ahmedabad():
    return render_template('ahmedabad.html')

@app.route('/surat')
def surat():
    return render_template('surat.html')

@app.route('/baroda')
def baroda():
    return render_template('baroda.html')

@app.route('/dwarka')
def dwarka():
    return render_template('dwarka.html')

@app.route('/rajkot')
def rajkot():
    return render_template('rajkot.html')

@app.route('/somnath')
def somnath():
    return render_template('somnath.html')

@app.route('/bhuj')
def bhuj():
    return render_template('bhuj.html')

@app.route('/gandhinagar')
def gandhinagar():
    return render_template('gandhinagar.html')

@app.route('/kutch')
def kutch():
    return render_template('kutch.html')

@app.route('/hotelabad')
def hotelabad():
    # You can pass any data to the template if needed
    return render_template('hotelabad.html')


def get_hotels_by_city(city=None):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Fetch all hotels
    if city:
        hotel_query = """
            SELECT hotel_id, hotel_name, city, price, rating, amenities, image_url, hotel_link, location 
            FROM hotel WHERE city = %s
        """
        cursor.execute(hotel_query, (city,))
    else:
        hotel_query = """
            SELECT hotel_id, hotel_name, city, price, rating, amenities, image_url, hotel_link, location 
            FROM hotel
        """
        cursor.execute(hotel_query)
    
    hotels = cursor.fetchall()

    # Get hotel IDs
    hotel_ids = [hotel['hotel_id'] for hotel in hotels]
    
    # If no hotels, skip image fetch
    if not hotel_ids:
        return []

    # Fetch extra images in one query
    format_strings = ','.join(['%s'] * len(hotel_ids))
    image_query = f"SELECT hotel_id, image_url FROM hotel_images WHERE hotel_id IN ({format_strings})"
    cursor.execute(image_query, hotel_ids)
    image_rows = cursor.fetchall()

    # Organize extra images by hotel_id
    extra_images_map = {}
    for row in image_rows:
        extra_images_map.setdefault(row['hotel_id'], []).append(row['image_url'])

    # Attach all 4 images (main + extra) to each hotel
    for hotel in hotels:
        main_image = hotel['image_url']
        extra_images = extra_images_map.get(hotel['hotel_id'], [])
        hotel['images'] = [main_image] + extra_images[:3]  # Limit to 4 total images

    conn.close()
    return hotels


@app.route('/hotel')
def hotel():
    hotels = get_hotels_by_city()
    
    hotels_by_city = {}
    for hotel in hotels:
        city = hotel['city']
        if city not in hotels_by_city:
            hotels_by_city[city] = []
        hotels_by_city[city].append(hotel)
    
    return render_template('hotel.html', hotels_by_city=hotels_by_city)


# Route for Signup
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        mobile = request.form['mobile']
        password = request.form['password']
        
        # Hash the password
        hashed_password = generate_password_hash(password)

        try:
            db = get_db_connection()
            cursor = db.cursor()
            cursor.execute("INSERT INTO users (username, email, mobile, password) VALUES (%s, %s, %s, %s)", 
                           (username, email, mobile, hashed_password))
            db.commit()
            cursor.close()
            db.close()
            flash("Signup successful!", "success")
            return redirect(url_for('login'))

        except mysql.connector.Error as err:
            flash(f"Error: {err}", "danger")
            return redirect(url_for('signup'))

    return render_template('signup.html')

# Route for Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        try:
            db = get_db_connection()
            cursor = db.cursor(dictionary=True)
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()
            cursor.close()
            db.close()

            if user and check_password_hash(user['password'], password):
                session['user_id'] = user['id']
                session['username'] = user['username']
                flash("Login successful!", "success")
                return redirect(url_for('home'))

            else:
                flash("Invalid email or password", "danger")
                return redirect(url_for('login'))

        except mysql.connector.Error as err:
            flash(f"Error: {err}", "danger")
            return redirect(url_for('login'))

    return render_template('login.html')    

# Route for Logout
@app.route('/logout')
def logout():
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for('login'))

# Feedback Submission Route
@app.route("/submit_feedback", methods=["POST"])
def submit_feedback():
    if 'user_id' not in session:
        flash("Please log in first to submit feedback", "warning")
        return redirect(url_for("login"))
    
    message = request.form.get("message")
    rating = request.form.get("rating")
    submit_date = datetime.today().strftime('%Y-%m-%d')
    user_id = session['user_id']

    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("INSERT INTO feedback (user_id, message, rating, submit_date) VALUES (%s, %s, %s, %s)", 
                       (user_id, message, rating, submit_date))
        db.commit()
        cursor.close()
        db.close()
        flash("Feedback submitted successfully!", "success")
    except mysql.connector.Error as err:
        flash(f"Error: {err}", "danger")
    
    return redirect(url_for("home"))
    

@app.route('/store_history', methods=['POST'])
def store_history():
    if request.method == 'POST':
        destination = request.form.get('destination')
        days = request.form.get('days')
        total_amount = request.form.get('total_amount')
        start_date = request.form.get('start_date')
        end_date = request.form.get('end_date')
        user_id = session.get('user_id')

        if not user_id:
            flash("Please log in first.", "warning")
            return redirect(url_for("login"))

        try:
            db = get_db_connection()
            cursor = db.cursor()
            cursor.execute("""
                INSERT INTO history (user_id, destination, days, total_amount, start_date, end_date) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (user_id, destination, days, total_amount, start_date, end_date))
            db.commit()
            cursor.close()
            db.close()

            flash("Search stored successfully!", "success")

            # Redirect to results page
            return redirect(url_for('show_hotels', destination=destination, amount=total_amount, days=days))

        except mysql.connector.Error as err:
            flash(f"Database Error: {err}", "danger")
            return redirect(url_for("home"))
        

@app.route('/show_hotels')
def show_hotels():
    destination = request.args.get('destination')
    amount = request.args.get('amount')
    days = request.args.get('days')

    if not destination or not amount or not days:
        flash("Invalid search parameters.", "danger")
        return redirect(url_for("home"))

    try:
        amount = float(amount)
        days = int(days)

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Get hotels for the city
        query = """
            SELECT * FROM hotel 
            WHERE city = %s 
            ORDER BY price ASC
        """
        cursor.execute(query, (destination,))
        hotels = cursor.fetchall()

        selected_hotels = []
        remaining_budget = amount

        for hotel in hotels:
            hotel_price = float(hotel['price'])
            if hotel_price <= remaining_budget:
                selected_hotels.append(hotel)
                remaining_budget -= hotel_price
            if remaining_budget <= 0:
                break

        # Get all images for the selected hotels in one query
        if selected_hotels:
            hotel_ids = [str(hotel['hotel_id']) for hotel in selected_hotels]
            placeholders = ','.join(['%s'] * len(hotel_ids))
            
            cursor.execute(
                f"SELECT hotel_id, image_url FROM hotel_images WHERE hotel_id IN ({placeholders})",
                tuple(hotel_ids)
            )
            images_data = cursor.fetchall()

            # Group images by hotel_id
            hotel_images = {}
            for row in images_data:
                hotel_id = row['hotel_id']
                if hotel_id not in hotel_images:
                    hotel_images[hotel_id] = []
                hotel_images[hotel_id].append(row['image_url'])

            # Attach images to each hotel
            for hotel in selected_hotels:
                hotel['images'] = hotel_images.get(hotel['hotel_id'], [])

        cursor.close()
        db.close()

        return render_template(
            'show_hotels.html',
            hotels=selected_hotels,
            days=days,
            amount=amount,
            destination=destination
        )

    except mysql.connector.Error as err:
        flash(f"Database Error: {err}", "danger")
        return redirect(url_for("home"))

    # ---------------- Admin Panel ----------------
@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        try:
            db = get_db_connection()
            cursor = db.cursor(dictionary=True)
            cursor.execute("SELECT * FROM admin WHERE username = %s", (username,))
            admin = cursor.fetchone()
            cursor.close()
            db.close()

            if admin and admin['password'] == password:
                session['admin_id'] = admin['id']
                session['admin_username'] = admin['username']
                flash("Admin login successful!", "success")
                return redirect(url_for('admin_dashboard'))
            else:
                flash("Invalid credentials", "danger")
        except Exception as e:
            flash(f"Error: {e}", "danger")

    return render_template('admin.html')  # ✅ Corrected here



@app.route('/admin-dashboard')
def admin_dashboard():
    if 'admin_id' not in session:
        flash("Please log in as admin", "warning")
        return redirect(url_for('admin_login'))

    return render_template('admin_dashboard.html')


@app.route('/admin-logout')
def admin_logout():
    session.pop('admin_id', None)
    session.pop('admin_username', None)
    flash("Logged out successfully", "info")
    return redirect(url_for('admin'))




# Route to display all hotels
@app.route('/manage-hotels')
def manage_hotels():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM hotel")
    hotels = cursor.fetchall()
    cursor.close()
    db.close()
    return render_template('manage_hotels.html', hotels=hotels)

# Add hotel
@app.route('/add-hotel', methods=['POST'])
def add_hotel():
    hotel_name = request.form['hotel_name']
    city = request.form['city']
    price = request.form['price']
    rating = request.form['rating']
    location = request.form['location']
    image_url = request.form['image_url']
    hotel_link = request.form['hotel_link']

    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("""INSERT INTO hotel 
                      (hotel_name, city, price, rating, location, image_url, hotel_link) 
                      VALUES (%s, %s, %s, %s, %s, %s, %s)""",
                   (hotel_name, city, price, rating, location, image_url, hotel_link))
    db.commit()
    cursor.close()
    db.close()

    flash("Hotel added successfully!", "success")
    return redirect(url_for('manage_hotels'))

# Edit hotel
@app.route('/edit-hotel/<int:hotel_id>', methods=['POST'])
def edit_hotel(hotel_id):
    try:
        hotel_name = request.form['hotel_name']
        city = request.form['city']
        price = request.form['price']
        rating = request.form['rating']
        location = request.form['location']
        image_url = request.form['image_url']
        hotel_link = request.form['hotel_link']

        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("""
            UPDATE hotel 
            SET hotel_name=%s, city=%s, price=%s, rating=%s, 
                location=%s, image_url=%s, hotel_link=%s 
            WHERE hotel_id=%s
        """, (hotel_name, city, price, rating, location, image_url, hotel_link, hotel_id))
        db.commit()
        cursor.close()
        db.close()

        flash("Hotel updated successfully!", "info")
    except Exception as e:
        flash(f"Error updating hotel: {str(e)}", "danger")

    return redirect(url_for('manage_hotels'))


# Delete hotel
@app.route('/delete-hotel/<int:hotel_id>', methods=['POST'])
def delete_hotel(hotel_id):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM hotel WHERE hotel_id = %s", (hotel_id,))
    db.commit()
    cursor.close()
    db.close()

    flash("Hotel deleted successfully!", "danger")
    return redirect(url_for('manage_hotels'))

# Manage Feedback Page
@app.route('/manage-feedback')
def manage_feedback():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM feedback ORDER BY submit_date DESC")
    feedback = cursor.fetchall()
    cursor.close()
    db.close()
    return render_template('manage_feedback.html', feedback=feedback)

# Delete Feedback
@app.route('/delete-feedback/<int:feedback_id>', methods=['POST'])
def delete_feedback(feedback_id):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM feedback WHERE feedback_id = %s", (feedback_id,))
    db.commit()
    cursor.close()
    db.close()
    flash("Feedback deleted successfully.", "warning")
    return redirect(url_for('manage_feedback'))


@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form.get('email')

    if not email:
        flash("Email is required.", "danger")
        return redirect(url_for('home'))

    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("INSERT INTO newsletter_subscribers (email) VALUES (%s)", (email,))
        db.commit()
        cursor.close()
        db.close()
        flash("Thank you for subscribing to our newsletter!", "success")
    except mysql.connector.Error as err:
        if err.errno == 1062:  # Duplicate entry error
            flash("This email is already subscribed.", "warning")
        else:
            flash(f"Error: {err}", "danger")
    
    return redirect(url_for('home'))


# Run the application
if __name__ == '__main__':
    app.run(debug=True)