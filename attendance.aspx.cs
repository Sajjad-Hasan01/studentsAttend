using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text.RegularExpressions;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;
using System.Web.Routing;

public partial class attendance : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection();
    SqlCommand cmd = new SqlCommand();
    Utilities method = new Utilities();
    Profile account = new Profile();

    public string sqlQuery()
    {
        string order = "ASC", sqlQueryCommand = "", groubA = "", groubB = "", groubC = "", groubD = "", groubE = "", continuousStatus = "", warningStatus = "", separationStatus = "";

        if (ZtoA.Checked) order = "DESC";
        if (gA.Checked) groubA = "a";
        if (gB.Checked) groubB = "b";
        if (gC.Checked) groubC = "c";
        if (gD.Checked) groubD = "d";
        if (gE.Checked) groubE = "e";
        if (continuous.Checked) continuousStatus = "Continuous";
        if (warning.Checked) warningStatus = "Warning";
        if (separation.Checked) separationStatus = "Separation";

        sqlQueryCommand = "SELECT Students.Std_Email, Accounts.Photo, Accounts.FullName FROM Students JOIN Accounts ON Accounts.Email = Students.Std_Email Where Std_Group in ('" + groubA + "','" + groubB + "','" + groubC + "','" + groubD + "','" + groubE + "') AND Std_Status in ('" + continuousStatus + "', '" + warningStatus + "', '" + separationStatus + "') ORDER BY FullName " + order;
        return sqlQueryCommand;
    }

    public void displayStudents(string sqlQuery)
    {
        con.ConnectionString = ConfigurationManager.ConnectionStrings["testDB"].ToString();
        cmd.Connection = con;
        cmd.CommandType = CommandType.Text;
        con.Open();
        cmd.CommandText = sqlQuery;
        SqlDataReader StdReader = cmd.ExecuteReader();
        DataTable dt = new DataTable();
        dt.Load(StdReader);
        var html = "<table class='table'><tr><th>photo</th><th class='name-header'>full name</th><th>attend</th></tr>";
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            html += "<tr><td><div><img src='./profile_image/" + dt.Rows[i]["Photo"].ToString() + "'/></div></td><td class='name-cell'>" + dt.Rows[i]["FullName"].ToString() + "</td><td><input type='checkbox' id='checkAttend" + i + "' runat='server' /></td></tr>";
        }
        html += "</table>";
        stdTable.InnerHtml = html;
        con.Close();
    }

    protected void filterBarColoring()
    {
        if (AtoZ.Checked) lblAtoZ.Style.Add("background-color", "#38A8AF");
        else lblAtoZ.Style.Add("background-color", "#A49999");
        if (ZtoA.Checked) lblZtoA.Style.Add("background-color", "#38A8AF");
        else lblZtoA.Style.Add("background-color", "#A49999");
        if (gA.Checked) lblgA.Style.Add("background-color", "#38A8AF");
        else lblgA.Style.Add("background-color", "#A49999");
        if (gB.Checked) lblgB.Style.Add("background-color", "#38A8AF");
        else lblgB.Style.Add("background-color", "#A49999");
        if (gC.Checked) lblgC.Style.Add("background-color", "#38A8AF");
        else lblgC.Style.Add("background-color", "#A49999");
        if (gD.Checked) lblgD.Style.Add("background-color", "#38A8AF");
        else lblgD.Style.Add("background-color", "#A49999");
        if (gE.Checked) lblgE.Style.Add("background-color", "#38A8AF");
        else lblgE.Style.Add("background-color", "#A49999");
        if (continuous.Checked) lblContinuous.Style.Add("background-color", "green");
        else lblContinuous.Style.Add("background-color", "#A49999");
        if (warning.Checked) lblWarning.Style.Add("background-color", "orange");
        else lblWarning.Style.Add("background-color", "#A49999");
        if (separation.Checked) lblSeparation.Style.Add("background-color", "red");
        else lblSeparation.Style.Add("background-color", "#A49999");
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["email"] == null || Session["privilege"] == null)
        {
            Response.Redirect("./");
        }
        else
        {
            if (Session["privilege"].ToString() == "student")
            {
                Response.Redirect("./");
            }
            if (!IsPostBack)
            {
                filterBar.Style.Add("display", "none");
                stdTable.Style.Add("display", "none");
                saveTimeBtn.Style.Add("display", "none");
                startTimeBtn.Style.Add("display", "block");

                AtoZ.Checked = checked(true);
                gA.Checked = checked(true);
                gB.Checked = checked(true);
                gC.Checked = checked(true);
                gD.Checked = checked(true);
                gE.Checked = checked(true);
                continuous.Checked = checked(true);
                warning.Checked = checked(true);
                separation.Checked = checked(true);
                filterBarColoring();

                DateTime date = DateTime.Today;
                lecDate.InnerText = date.ToString("dd,MM,yyyy");
            }
        }
    }

    DateTime startTime;
    public DateTime OnStart()
    {
        DateTime start = DateTime.Now;
        return start;
    }
    public DateTime OnEnd()
    {
        DateTime end = DateTime.Now;
        return end;
    }
    public TimeSpan durationTime(DateTime startTime)
    {
        return OnEnd() - startTime;
    }

    protected void startTimeClick(object sender, EventArgs e)
    {
        filterBar.Style.Add("display", "flex");
        stdTable.Style.Add("display", "block");
        saveTimeBtn.Style.Add("display", "block");
        startTimeBtn.Style.Add("display", "none");

        displayStudents(sqlQuery());

        startTime = OnStart();
    }

    public void insertAttend()
    {
        con.ConnectionString = ConfigurationManager.ConnectionStrings["testDB"].ToString();
        cmd.Connection = con;
        cmd.CommandType = CommandType.Text;
        con.Open();
        //cmd.CommandText = sqlQuery();
        //SqlDataReader StdReader = cmd.ExecuteReader();
        //DataTable dt = new DataTable();
        //dt.Load(StdReader);
        //con.Close();
        //con.Open();
        //for (int i = 0; i < dt.Rows.Count; i++)
        //{
        //if (checkAttend.Checked)
        //{ //" + dt.Rows[i]["Std_Email"].ToString() + "
        cmd.CommandText = "INSERT INTO Attendance (Std_Email, Lecture_Number, Start_Time, Finish_Time, Duration) VALUES ('sajjadhasan@student.uobabylon.edu.iq', default, '" + startTime + "', '" + OnEnd() + "', '" + durationTime(startTime).Minutes + "')";     
        //cmd.CommandText = "INSERT INTO Attendance (Std_Email, Lecture_Number, Start_Time, Finish_Time, Duration) VALUES ('sajjadhasanian@student.uobabylon.edu.iq', default, '" + startTime + "', '" + OnEnd() + "', '" + durationTime(startTime)+"')";  
        
        //}
        //}
        con.Close();
    }
    protected void saveTimeClick(object sender, EventArgs e)
    {
        insertAttend();
        // if (inserted) {
        lecDate.InnerText += " , lecture attendance saved ✔ , " + durationTime(startTime).ToString();

        filterBar.Style.Add("display", "none");
        stdTable.Style.Add("display", "none");
        saveTimeBtn.Style.Add("display", "none");
        startTimeBtn.Style.Add("display", "none");
        //}
    }
    
    protected void displayStudentsChange(object sender, EventArgs e)
    {
        displayStudents(sqlQuery());
        filterBarColoring();
    }
}
