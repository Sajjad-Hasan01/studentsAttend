using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Profile;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class students : System.Web.UI.Page
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

        sqlQueryCommand = "SELECT Students.Std_Email, Students.Std_Group, Students.Std_Status, Accounts.Photo, Accounts.FullName FROM Students JOIN Accounts ON Accounts.Email = Students.Std_Email Where Std_Group in ('" + groubA + "','" + groubB + "','" + groubC + "','" + groubD + "','" + groubE + "') AND Std_Status in ('" + continuousStatus + "', '" + warningStatus + "', '" + separationStatus + "') ORDER BY FullName " + order;
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
        var html = "<table class='table dspAllStd'><tr><th>photo</th><th class='name-header'>full name</th><th class='email-header'>email</th><th>status</th></tr>";
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            html += "<tr><td><div><img src='./profile_image/" + dt.Rows[i]["Photo"].ToString() + "'/></div></td><td class='name-cell'>" + dt.Rows[i]["FullName"].ToString() + "</td><td class='email-cell'>" + dt.Rows[i]["Std_Email"].ToString() + "</td><td><div class='dspStatus " + dt.Rows[i]["Std_Status"].ToString() + "'></div></td></tr>";
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
        if (Session["email"] == null)
        {
            Response.Redirect("./login.aspx");
        }
        else
        {
            if (!IsPostBack)
            {
                AtoZ.Checked = checked(true);
                gA.Checked = checked(true);
                gB.Checked = checked(true);
                gC.Checked = checked(true);
                gD.Checked = checked(true);
                gE.Checked = checked(true);
                continuous.Checked = checked(true);
                warning.Checked = checked(true);
                separation.Checked = checked(true);

                displayStudents(sqlQuery());
                filterBarColoring();
            }
        }
    }
    protected void displayStudentsChange(object sender, EventArgs e)
    {
        displayStudents(sqlQuery());
        filterBarColoring();
    }
}