<%@ page import="kong.unirest.*" %>
<%
  String code = request.getParameter("code");
  String API_URL = "https://brwzjtzvdvqjynhrtdod.supabase.co/rest/v1/timers?code=eq." + code;
  String API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // المفتاح الكامل هنا

  HttpResponse<String> result = Unirest.get(API_URL)
    .header("apikey", API_KEY)
    .header("Authorization", "Bearer " + API_KEY)
    .header("Accept", "application/json")
    .asString();

  String data = result.getBody();
%>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>البيانات المحفوظة</title>
</head>
<body style="font-family: Arial; text-align: center;">
  <h2>بيانات الكود: <%= code %></h2>
  <pre style="background: #eee; padding: 10px;"><%= data %></pre>
</body>
</html>
