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
            Session["privilege"] = logCookie["privilege"];
            Response.Redirect("./");
        }
    }

    protected void submitBtn_Click(object sender, EventArgs e)
    {
        if (email.Text != "" && password.Text != "")
        {
            if (method.IsValidEmail(email.Text))
            {
                con.ConnectionString = ConfigurationManager.ConnectionStrings["testDB"].ToString();
                cmd.Connection = con;
                cmd.CommandType = CommandType.Text;
                con.Open();
                cmd.CommandText = "SELECT FullName, Email, Password FROM Accounts WHERE Email = '" + email.Text.ToLower() + "' AND Password = '" + method.GenerateHash(password.Text) + "'";
                if (cmd.ExecuteScalar() != null)
                {
                    if (svLogCheck.Checked)
                    {
                        HttpCookie logCookie = new HttpCookie("user_login");
                        logCookie["email"] = email.Text.ToLower();
                        logCookie["privilege"] = method.GetPrivilege(email.Text.ToLower());
                        logCookie.Expires = DateTime.Now.AddMonths(1);
                        Response.Cookies.Add(logCookie);
                    }
                    Session["email"] = email.Text.ToLower();
                    Session["privilege"] = method.GetPrivilege(email.Text.ToLower());
                    Response.Redirect("./");
                }
                else errMsg.Text = "user not found, try again or sign up";
            }
            else errMsg.Text = "the email must be from babylon university";
        }
        else errMsg.Text = "all fields are required, try again";
        con.Close();
    }
}