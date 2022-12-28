<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Login</title>
    <link rel="shortcut icon" href="./icon/log-favicon.svg" type="image/x-icon"/>
    <link rel="stylesheet" href="./css/style.css"/>
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
        <h1 class="p-title">students' attendance</h1>
        <p class="p-suptitle">login, view and check your attend</p>
        <!-- Sign Form  -->
        <section class="add-std-sec">
            <form id="logInForm" runat="server" class="add-std-form">
                <asp:TextBox ID="email" CssClass="form-control input" placeholder="email" autocomplete="off" runat="server" TextMode="SingleLine"></asp:TextBox>
                <asp:TextBox ID="password" CssClass="form-control input" placeholder="password" autocomplete="off" runat="server" TextMode="Password"></asp:TextBox>
                <div class="form-row">
                    <label class="chboxlbl"><asp:CheckBox ID="svLogCheck" CssClass="checkbox" runat="server" />keep login</label>
                    <asp:Button ID="submitBtn" CssClass="form-control btn" runat="server" Text="login" Onclick="submitBtn_Click"/>
                </div>
                <a href="./signup.aspx" class="errMsg" runat="server">don't have account ? sign up</a>
                <asp:Label ID="errMsg" CssClass="" runat="server"></asp:Label>
            </form>
        </section>
    </main>

    <!-- FOTTER  -->
    <footer-component></footer-component>
</body>
</html>
