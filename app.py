from flask import Flask, render_template, request, redirect, flash, url_for

app = Flask(__name__)
app.secret_key = "secret"

# الكود الصحيح (يمكنك تغييره لاحقًا)
SECRET_CODE = "m123t"

@app.route("/")
def home():
    return redirect(url_for("login"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        code = request.form["code"]
        if code == SECRET_CODE:
            return "✅ تم تسجيل الدخول بنجاح!"
        else:
            flash("❌ الرمز غير صحيح")
            return redirect(url_for("login"))

    return render_template("login.html")

if __name__ == "__main__":
    app.run(debug=True)
