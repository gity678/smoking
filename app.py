from flask import Flask, render_template, request, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = "secret"  # سر الجلسة

# الرمز السري الوحيد الصحيح
SECRET_CODE = "m123t"

@app.route("/")
def home():
    return redirect(url_for("login"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        code = request.form.get("code", "")

        if code == SECRET_CODE:
            return "✅ تم تسجيل الدخول بنجاح!"
        else:
            flash("❌ الرمز غير صحيح")
            return redirect(url_for("login"))

    return render_template("login.html")

# هذا السطر مهم جداً لعمل التطبيق على Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
