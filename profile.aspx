<%@ Page Language="C#" AutoEventWireup="true" CodeFile="profile.aspx.cs" Inherits="profile" %>

<!DOCTYPE html lang="en">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Profile</title>
    <link rel="shortcut icon" href="./icon/log-favicon.svg" type="image/x-icon"/>
    <link rel="stylesheet" href="./css/style.css"/>
    <link rel="stylesheet" href="./css/profile.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin"/>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet"/>
    <script defer="defer" src="./js/script.js"></script> 
</head>
<body>
    <!-- NAVIGATION BAR -->
    <header-component></header-component>

    <!-- MAIN PAGE CONTENT -->
    <main>
        <form id="profileForm" runat="server">
        <section class="profile-sec">
            <div class="profile-img-con">
                <asp:Image ID="profileImg" CssClass="profile-img" runat="server" alt="profile photo"/>
            </div>
            <div class="profile-title">
                <h2 class="profile-name" id="profileName" runat="server"></h2>
                <asp:HyperLink CssClass="profile-email" target="_blank" id="profileEmail" runat="server"></asp:HyperLink>
                <p class="std-group" id="groupAndStatus" runat="server">group <label id="stdGroup" runat="server"></label> status <label class="dspStatus " id="stdStatus" runat="server"></label></p> <%--Separation--%>
                <asp:Label ID="hvToEditMsg" CssClass="errMsg" runat="server" AssociatedControlID="editProfileBtn"></asp:Label>
            </div>
            <div class="modal-footer">
                <asp:Button ID="editProfileBtn" class="form-control btn secBtn" runat="server" Text="edit profile" OnClick="editProfileBtn_Click"/>
                <asp:Button ID="logOutBtn" class="form-control btn Separation" runat="server" Text="log out" OnClick="logOutBtn_Click"/>
            </div>
        </section>

        <!-- Edit Profile -->
        <section class="add-std-sec" id="editProfile" runat="server">
            <h3 class="sec-title">edit profile</h3>
            <div class="add-std-form">
                <asp:TextBox ID="editName" CssClass="form-control input" placeholder="full name" autocomplete="off" runat="server"></asp:TextBox>
                <asp:DropDownList ID="editGroup" CssClass="form-control input" runat="server">
                    <asp:ListItem Selected="True" Value="0">group</asp:ListItem>
                    <asp:ListItem>a</asp:ListItem>
                    <asp:ListItem>b</asp:ListItem>
                    <asp:ListItem>c</asp:ListItem>
                    <asp:ListItem>d</asp:ListItem>
                    <asp:ListItem>e</asp:ListItem>
                </asp:DropDownList>
                <asp:FileUpload ID="photoUp" CssClass="file-input" accept=".png,.jpg,.jpeg" runat="server" />
                <label id="imageName"></label>
                <div class="modal-footer">
                    <asp:Button ID="saveProfileBtn" runat="server" CssClass="form-control btn secBtn" Text="save" OnClick="saveProfileBtn_Click"/>
                    <asp:Button ID="cancelProfileBtn" class="form-control btn Separation" runat="server" Text="cancel" OnClick="cancelProfileBtn_Click"/>
                </div>
                <asp:Label ID="errMsg" CssClass="errMsg" runat="server"></asp:Label>
            </div>
        </section>
        </form>
    </main>

    <!-- FOTTER  -->
    <footer-component></footer-component>
</body>
</html>
