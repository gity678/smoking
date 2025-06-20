from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# الكود السري المطلوب للدخول
ACCESS_CODE = "m123t"

@app.route('/', methods=['GET', 'POST'])
def index():
    error = None
    if request.method == 'POST':
        code = request.form.get('code')
        if code == ACCESS_CODE:
            return redirect(url_for('data'))
        else:
            error = "الكود غير صحيح، حاول مرة أخرى."
    return render_template('index.html', error=error)

@app.route('/data')
def data():
    # هنا تضع البيانات التي تريد عرضها
    sample_data = {
        "message": "مرحباً بك في صفحة البيانات!",
        "info": "يمكنك هنا إضافة أي محتوى تريده."
    }
    return render_template('data.html', data=sample_data)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
