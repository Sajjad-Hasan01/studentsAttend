<%@ Page Language="C#" AutoEventWireup="true" CodeFile="students.aspx.cs" Inherits="students" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Students</title>
    <link rel="shortcut icon" href="./icon/std-favicon.svg" type="image/x-icon"/>
    <link rel="stylesheet" href="./css/style.css"/>
    <link rel="stylesheet" href="./css/students.css"/>
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
        <form runat="server" method="post" action="./students.aspx">
        <!--     FILTER BAR      -->
        <section class="filter-bar">
            <div class="sortCon">
                <label for="AtoZ" id="lblAtoZ" runat="server" class="filter-btn active-btn">a-z &#x2193;<asp:RadioButton ID="AtoZ" runat="server" CssClass="hide-control"  OnCheckedChanged="displayStudentsChange" AutoPostBack="true" GroupName="sort" /></label>
                <label for="ZtoA" id="lblZtoA" runat="server" class="filter-btn active-btn">z-a &#x2191;<asp:RadioButton runat="server" ID="ZtoA" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="true" GroupName="sort" /></label>
            </div>
            <div class="groupCon">
                <label for="gA" id="lblgA" runat="server" class="filter-btn active-btn">a<asp:CheckBox runat="server" name="group" ID="gA" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="true"/></label>
                <label for="gB" id="lblgB" runat="server" class="filter-btn active-btn">b<asp:CheckBox runat="server" name="group" ID="gB" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="true"/></label>
                <label for="gC" id="lblgC" runat="server" class="filter-btn active-btn">c<asp:CheckBox runat="server" name="group" ID="gC" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="true"/></label>
                <label for="gD" id="lblgD" runat="server" class="filter-btn active-btn">d<asp:CheckBox runat="server" name="group" ID="gD" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="true"/></label>
                <label for="gE" id="lblgE" runat="server" class="filter-btn active-btn">e<asp:CheckBox runat="server" name="group" ID="gE" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="true"/></label>
            </div>
            <div class="statusCon">
                <label for="continuous" id="lblContinuous" runat="server" class="filter-btn Continuous">continuous<asp:CheckBox runat="server" name="dspstatus" ID="continuous" CssClass="hide-control" checked="true" OnCheckedChanged="displayStudentsChange" AutoPostBack="True" /></label>
                <label for="warning" id="lblWarning" runat="server" class="filter-btn Warning">warning<asp:CheckBox runat="server" name="dspstatus" ID="warning" CssClass="hide-control" checked="true" OnCheckedChanged="displayStudentsChange" AutoPostBack="True" /></label>
                <label for="separation" id="lblSeparation" runat="server" class="filter-btn Separation">separation<asp:CheckBox runat="server" name="dspstatus" ID="separation" CssClass="hide-control" checked="true"  OnCheckedChanged="displayStudentsChange" AutoPostBack="True"/></label>
            </div>
        </section>
        

        <!--     TABLE SECTION   -->
        <section class="table-container dspAllStdCon" id="stdTable" runat="server">

        </section>

        <!-- STUDENT MODAL  -->
        <section class="modal-bg hide-control">
            <div class="modal">
                <span class="modal-close">&#10005;</span>
                <div class="modal-content">
                    <div class="std-info">
                        <asp:Image ID="Image2" CssClass="modal-img" runat="server" src="./image/profile_photo.svg" alt="profile photo"/>
                        <div class="std-title">
                            <h2 class="std-name">sajjad hasan salman</h2>
                            <div class="std-subTitle">
                                <a class="std-email" target="_blank" href="mailto:sajjadhasan@student.uobabylon.edu.iq">sajjadhasan@student.uobabylon.edu.iq</a>
                                <p id="stdGroup" runat="server" class="std-group">c</p>
                                <div id="stdStatus" runat="server" class="dspStatus Separation"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="attend-log">
                        <div class="lec-log">
                            <div class="lec-title">lec 1</div>
                            <div class="lec-attend">&#10004;</div>
                        </div>
                    </div>

                </div>
<%--                <div class="modal-footer">
                    <asp:Button ID="deleteBtn" class="form-control btn Separation" runat="server" Text="delete" />
                </div>--%>
            </div>
        </section>
        </form>
    </main>

    <!-- FOOTER  -->
    <footer-component></footer-component>
</body>
</html>
