<%@ Page Language="C#" AutoEventWireup="true" CodeFile="attendance.aspx.cs" Inherits="attendance" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Students</title>
    <link rel="shortcut icon" href="./icon/std-favicon.svg" type="image/x-icon"/>
    <link rel="stylesheet" href="./css/style.css"/>
    <link rel="stylesheet" href="./css/attend.css"/>
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
    <form id="form1" runat="server">
<!--     ADD LECTURE INPUT      -->
        <div class="add-lecture">
            <asp:TextBox ID="TextBox1" CssClass="form-control input add-lecture-field" placeholder="start new lecture" runat="server"></asp:TextBox>
            <asp:Button ID="startLecBtn" CssClass="form-control btn" runat="server" Text="start" />
        </div>

        <!--     FILTER BAR      -->
        <section class="filter-bar hidecontrol">
            <div class="sortCon">
                <label for="AtoZ" class="filter-btn active-btn">a-z &#x2193;<asp:RadioButton ID="AtoZ" runat="server" name="sort" CssClass="hide-control" Enabled="True" /></label>
                <label for="ZtoA" class="filter-btn ">z-a &#x2191;<asp:RadioButton runat="server" name="sort" ID="ZtoA" CssClass="hide-control"/></label>
            </div>
            <div class="groupCon">
                <label for="gA" class="filter-btn ">a<asp:CheckBox runat="server" name="group" ID="gA" CssClass="hide-control"/></label>
                <label for="gB" class="filter-btn ">b<asp:CheckBox runat="server" name="group" ID="gB" CssClass="hide-control"/></label>
                <label for="gC" class="filter-btn ">c<asp:CheckBox runat="server" name="group" ID="gC" CssClass="hide-control"/></label>
                <label for="gD" class="filter-btn ">d<asp:CheckBox runat="server" name="group" ID="gD" CssClass="hide-control"/></label>
                <label for="gE" class="filter-btn ">e<asp:CheckBox runat="server" name="group" ID="gE" CssClass="hide-control"/></label>
            </div>
            <div class="statusCon">
                <label for="continuous" class="filter-btn ">continuous<asp:CheckBox runat="server" name="dspstatus" ID="continuous" CssClass="hide-control"/></label>
                <label for="warning" class="filter-btn ">warning<asp:CheckBox runat="server" name="dspstatus" ID="warning" CssClass="hide-control"/></label>
                <label for="separation" class="filter-btn ">separation<asp:CheckBox runat="server" name="dspstatus" ID="separation" CssClass="hide-control"/></label>
            </div>
        </section>

        <!--     TABLE SECTION      -->
        <div class="table-container hidecontrol">
            <table class="table">
                <tr>
                    <th>photo</th>
                    <th class="name-header">full name</th>
                    <th>attend</th>
                </tr>
                <tr>
                    <td><asp:Image ID="Image1" runat="server" src="./image/profile_photo.svg" alt="profile photo"/></td>
                    <td id="stdName" runat="server" class="name-cell">sajjad hasan salman</td>
                    <td><asp:CheckBox ID="CheckBox1" runat="server" /></td>
                </tr>
                
            </table>
            <asp:Button ID="saveTableBtn" runat="server" CssClass="form-control btn svTbl" Text="finish" />
        </div>
        </form>
    </main>

    <!-- FOTTER  -->
    <footer-component></footer-component>
</body>
</html>
