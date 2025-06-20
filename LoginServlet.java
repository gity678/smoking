import kong.unirest.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.IOException;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private static final String SUPABASE_URL = "https://brwzjtzvdvqjynhrtdod.supabase.co/rest/v1/timers";
    private static final String SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // استخدم المفتاح الكامل هنا
    private static final String SECRET_CODE = "m123t";

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        String inputCode = request.getParameter("accessCode");

        if (!SECRET_CODE.equals(inputCode)) {
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().println("<h3 style='color:red;'>الكود غير صحيح!</h3><a href='index.jsp'>العودة</a>");
            return;
        }

        HttpResponse<String> result = Unirest.get(SUPABASE_URL + "?code=eq." + inputCode)
            .header("apikey", SUPABASE_API_KEY)
            .header("Authorization", "Bearer " + SUPABASE_API_KEY)
            .header("Accept", "application/json")
            .asString();

        if (result.getBody().equals("[]")) {
            // إنشاء سجل جديد
            Unirest.post(SUPABASE_URL)
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .body("{\"code\": \"" + inputCode + "\", \"data\": {}}")
                .asJson();
        }

        response.sendRedirect("data.jsp?code=" + inputCode);
    }
}
