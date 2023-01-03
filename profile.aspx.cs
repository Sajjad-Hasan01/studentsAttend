using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class profile : System.Web.UI.Page
{
    SqlConnection con = new SqlConnection();
    SqlCommand cmd = new SqlCommand();
    Utilities method = new Utilities();
    Profile account = new Profile();

    protected void Page_Load(object sender, EventArgs e)
    {
        editProfile.Style.Add("display", "none");

        if (Session["email"] == null)
        {
            Response.Redirect("./login.aspx");
        }
        else
        {
            con.ConnectionString = ConfigurationManager.ConnectionStrings["testDB"].ToString();
            cmd.Connection = con;
            cmd.CommandType = CommandType.Text;
            con.Open();
            cmd.CommandText = "SELECT FullName, Email, Photo, Privilege FROM Accounts WHERE Email ='" + Session["email"] + "'";
            SqlDataReader AcReader = cmd.ExecuteReader();

            if (AcReader.Read())
            {
                account.Name = AcReader[0].ToString();
                account.Email = AcReader[1].ToString();
                account.Photo = AcReader[2].ToString();
                account.Privilege = AcReader[3].ToString();

                profileName.InnerText = account.Name;
                profileEmail.Text = account.Email;
                profileEmail.NavigateUrl = "mailto:" + account.Email;
                profileImg.ImageUrl = "./profile_image/" + account.Photo;
                Session["privilege"] = account.Privilege;
                con.Close();

                if (account.Privilege == "student")
                {
                    con.Open();
                    cmd.CommandText = "SELECT Std_Group,Std_Status FROM Students WHERE Std_Email = '" + Session["email"] + "'";
                    SqlDataReader StdReader = cmd.ExecuteReader();

                    if (StdReader.Read())
                    {
                        account.Std_Group = StdReader[0].ToString();
                        account.Std_Status = StdReader[1].ToString();

                        groupAndStatus.Style.Add("display", "flex");
                        stdGroup.InnerText = account.Std_Group;
                        stdStatus.Style.Add("background-color", account.Std_Status);
                        hvToEditMsg.Style.Add("display", "none");
                    }
                    else
                    {
                        hvToEditMsg.Text = "edit your profile to be in a group";
                    }
                    con.Close();
                }
                else
                {
                    editGroup.Style.Add("display", "none");
                    hvToEditMsg.Style.Add("display", "none");
                }
            }
        }
    }

    protected void editProfileBtn_Click(object sender, EventArgs e)
    {
        editProfile.Style.Add("display","block");
        editName.Text = account.Name;
        editGroup.SelectedValue = account.Std_Group;
    }

    protected void logOutBtn_Click(object sender, EventArgs e)
    {
        Session.Clear();
        Session.Abandon();
        Response.Redirect("./login.aspx");
    }

    protected void saveProfileBtn_Click(object sender, EventArgs e)
    {
        if (editName.Text != "")
        {
            con.ConnectionString = ConfigurationManager.ConnectionStrings["testDB"].ToString();
            cmd.Connection = con;
            cmd.CommandType = CommandType.Text;

            if (editName.Text != account.Name)
            {
                con.Open();
                cmd.CommandText = "UPDATE Accounts SET FullName = '" + editName.Text + "' WHERE Email = '" + account.Email + "'";
                cmd.ExecuteNonQuery();
                con.Close();
            }
            if (photoUp.HasFile && photoUp.FileName != account.Photo)
            {
                string photoName = photoUp.FileName,
                    extension = System.IO.Path.GetExtension(photoName),
                    photoPath = Server.MapPath("profile_image/");

                if (extension == ".jpg" || extension == ".png" || extension == ".jpeg")
                {
                    photoUp.SaveAs(photoPath + photoName);
                    con.Open();
                    cmd.CommandText = "UPDATE Accounts SET Photo = '" + photoName + "' WHERE Email = '" + account.Email + "'";
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                else errMsg.Text = "only .jpg, .png, .jpeg images allowed";
            }
            if (account.Privilege == "student")
            {
                if (editGroup.SelectedValue != "0" || editGroup.SelectedValue != account.Std_Group)
                {
                    con.Open();
                    cmd.CommandText = "SELECT * FROM Students WHERE Std_Email = '" + account.Email + "'";
                    if (cmd.ExecuteScalar() != null || cmd.ExecuteScalar().ToString() != "")
                    {
                        con.Close();
                        con.Open();
                        cmd.CommandText = "UPDATE Students SET Std_Group = '" + editGroup.SelectedValue + "' WHERE Std_Email = '" + account.Email + "'";
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                    else
                    {
                        con.Close();
                        con.Open();
                        cmd.CommandText = "INSERT INTO Students (Std_Email, Std_Group, Std_Status) VALUES ('" + account.Email + "', '" + editGroup.SelectedValue + "', 'Continuous')";
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                }
                else if (editGroup.SelectedValue == "0") errMsg.Text = "you have to choice a groub";
            }
            else errMsg.Text = "profile updated";
        }
        else errMsg.Text = "fill in and try again";
    }

    protected void cancelProfileBtn_Click(object sender, EventArgs e)
    {
        Response.Redirect("./profile.aspx");
    }
}
