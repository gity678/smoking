from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
import os

app = Flask(__name__)
ACCESS_CODE = "m123t"
DATA_FILE = "timers_data.json"

def load_timers():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_timers(timers):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(timers, f, ensure_ascii=False, indent=2)

@app.route('/', methods=['GET', 'POST'])
def index():
    error = None
    if request.method == 'POST':
        code = request.form.get('code')
        if code == ACCESS_CODE:
            return redirect(url_for('data_page'))
        else:
            error = "الكود غير صحيح"
    return render_template('index.html', error=error)

@app.route('/data')
def data_page():
    return render_template('data.html')

@app.route('/api/timers', methods=['GET', 'POST', 'PUT', 'DELETE'])
def api_timers():
    timers = load_timers()

    if request.method == 'GET':
        return jsonify(timers)

    data = request.get_json()

    if request.method == 'POST':
        timers.append(data)
        save_timers(timers)
        return jsonify({"status": "added", "timers": timers})

    if request.method == 'PUT':
        index = data.get("index")
        if index is not None and 0 <= index < len(timers):
            timers[index] = data.get("timer", timers[index])
            save_timers(timers)
            return jsonify({"status": "updated", "timers": timers})
        return jsonify({"status": "error", "message": "Invalid index"}), 400

    if request.method == 'DELETE':
        index = data.get("index")
        if index is not None and 0 <= index < len(timers):
            timers.pop(index)
            save_timers(timers)
            return jsonify({"status": "deleted", "timers": timers})
        return jsonify({"status": "error", "message": "Invalid index"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
