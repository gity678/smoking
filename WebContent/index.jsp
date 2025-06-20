<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>مرحبا بك</title>
</head>
<body style="text-align: center; font-family: Arial;">
  <h2>مرحباً بك في موقع العدادات</h2>
  <form action="LoginServlet" method="post">
    <label>أدخل كود الدخول:</label><br><br>
    <input type="text" name="accessCode" required /><br><br>
    <button type="submit">دخول</button>
  </form>
</body>
</html>
