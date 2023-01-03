using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data;
using System.Web.Profile;

public partial class Signup : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection();
    SqlCommand cmd = new SqlCommand();
    Utilities method = new Utilities();

    protected void Page_Load(object sender, EventArgs e)
    {
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
        con.ConnectionString = ConfigurationManager.ConnectionStrings["testDB"].ToString();
        cmd.Connection = con;
        cmd.CommandType = CommandType.Text;
        con.Open();

        if (name.Text != "" && email.Text != "" && password.Text != "")
        {
            if (method.IsValidEmail(email.Text))
            {
                string privilege = method.GetPrivilege(email.Text.ToLower());

                if (photoUp.HasFile)
                {
                    string photoName = photoUp.FileName,
                        extension = System.IO.Path.GetExtension(photoName),
                        photoPath = Server.MapPath("profile_image/");

                    if (extension == ".jpg" || extension == ".png" || extension == ".jpeg")
                    {
                        photoUp.SaveAs(photoPath + photoName);
                        cmd.CommandText = "INSERT INTO Accounts (FullName, Email, Photo, Privilege, Password) VALUES ('" + name.Text.ToLower() + "', '" + email.Text.ToLower() + "', '" + photoUp.FileName + "', '" + privilege + "', '" + method.GenerateHash(password.Text) + "')";

                        int row = cmd.ExecuteNonQuery();
                        if (row > 0)
                        {
                            if (svLogCheck.Checked)
                            {
                                HttpCookie logCookie = new HttpCookie("user_login");
                                logCookie["email"] = email.Text.ToLower();
                                logCookie.Expires = DateTime.Now.AddMonths(1);
                                Response.Cookies.Add(logCookie);
                            }

                            Session["email"] = email.Text.ToLower();
                            Response.Redirect("./profile.aspx");
                        }
                        else
                        {
                            errMsg.Text = "sorry! try Again";
                        }
                    }
                    else errMsg.Text = "only .jpg, .png, .jpeg images allowed";
                }
                else
                {
                    cmd.CommandText = "INSERT INTO Accounts (FullName, Email, Privilege, Password) VALUES ('" + name.Text.ToLower() + "', '" + email.Text.ToLower() + "', '" + privilege + "', '" + method.GenerateHash(password.Text) + "')";
                    int row = cmd.ExecuteNonQuery();
                    if (row > 0)
                    {
                        if (svLogCheck.Checked)
                        {
                            HttpCookie logCookie = new HttpCookie("user_login");
                            logCookie["email"] = email.Text.ToLower();
                            logCookie.Expires = DateTime.Now.AddMonths(1);
                            Response.Cookies.Add(logCookie);
                        }
                        Session["email"] = email.Text.ToLower();
                        Response.Redirect("./profile.aspx");
                    }
                    else errMsg.Text = "sorry! try Again";
                }
            }
            else errMsg.Text = "the email must be from babylon university";
        }
        else errMsg.Text = "all fields are required, try again";
        con.Close();
    }
}