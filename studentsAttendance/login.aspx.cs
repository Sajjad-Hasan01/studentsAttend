using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;

public partial class login : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection();
    SqlCommand cmd = new SqlCommand();
    Utilities method = new Utilities();

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetNoStore();
        HttpCookie logCookie = Request.Cookies["user_login"];
        if (logCookie != null)
        {
            Session["email"] = logCookie["email"];
            Response.Redirect("default.aspx");
        }
    }

    protected void submitBtn_Click(object sender, EventArgs e)
    {
        con.ConnectionString = ConfigurationManager.ConnectionStrings["testDB"].ToString();
        cmd.Connection = con;
        cmd.CommandType = CommandType.Text;

        if (email.Text != "" && password.Text != "")
        {
            if (method.IsValidEmail(email.Text))
            {
                con.Open();
                cmd.CommandText = "SELECT * FROM Accounts WHERE Email = '" + email.Text + "' AND Password = '" + method.GenerateHash(password.Text) + "'";
                int tmp = Convert.ToInt32(cmd.ExecuteScalar());
                //SqlDataReader AcReader = cmd.ExecuteReader();
                if (tmp > 0)
                {
                    if (svLogCheck.Checked)
                    {
                        HttpCookie logCookie = new HttpCookie("user_login");
                        logCookie["email"] = email.Text;
                        logCookie.Expires = DateTime.Now.AddMonths(1);
                        Response.Cookies.Add(logCookie);
                    }
                    Session["email"] = email.Text;
                    Response.Redirect("default.aspx");
                }
                else errMsg.Text = "sorry! try Again"; 
            }
            else errMsg.Text = "the email must be from babylon university"; 
        }
        else errMsg.Text = "all fields are required, try again"; 
        con.Close();
    }
}