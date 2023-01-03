<%@ Page Language="C#" AutoEventWireup="true" CodeFile="attendance.aspx.cs" Inherits="attendance" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Attendance</title>
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
            <h1 class="sec-title" id="lecDate" runat="server"></h1>
            <asp:Button ID="startTimeBtn" CssClass="form-control btn" runat="server" Text="start" OnClick="startTimeClick"/>
        </div>

        <!--     FILTER BAR      -->
        <section class="filter-bar" id="filterBar" runat="server">
            <div class="sortCon">
                <label for="AtoZ" id="lblAtoZ" runat="server" class="filter-btn">a-z &#x2193;<asp:RadioButton ID="AtoZ" runat="server" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="true" GroupName="sort"/></label>
                <label for="ZtoA" id="lblZtoA" runat="server" class="filter-btn ">z-a &#x2191;<asp:RadioButton runat="server" ID="ZtoA" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="true" GroupName="sort"/></label>
            </div>
            <div class="groupCon">
                <label for="gA" id="lblgA" runat="server" class="filter-btn">a<asp:CheckBox runat="server" name="group" ID="gA" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="true"/></label>
                <label for="gB" id="lblgB" runat="server" class="filter-btn">b<asp:CheckBox runat="server" name="group" ID="gB" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="True"/></label>
                <label for="gC" id="lblgC" runat="server" class="filter-btn">c<asp:CheckBox runat="server" name="group" ID="gC" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="True"/></label>
                <label for="gD" id="lblgD" runat="server" class="filter-btn">d<asp:CheckBox runat="server" name="group" ID="gD" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="True"/></label>
                <label for="gE" id="lblgE" runat="server" class="filter-btn">e<asp:CheckBox runat="server" name="group" ID="gE" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="True"/></label>
            </div>
            <div class="statusCon">
                <label for="continuous" id="lblContinuous" runat="server" class="filter-btn ">continuous<asp:CheckBox runat="server" name="dspstatus" ID="continuous" CssClass="hide-control" Checked="true" OnCheckedChanged="displayStudentsChange" AutoPostBack="True" /></label>
                <label for="warning" id="lblWarning" runat="server" class="filter-btn ">warning<asp:CheckBox runat="server" name="dspstatus" ID="warning" CssClass="hide-control" OnCheckedChanged="displayStudentsChange" AutoPostBack="True" /></label>
                <label for="separation" id="lblSeparation" runat="server" class="filter-btn">separation<asp:CheckBox runat="server" name="dspstatus" ID="separation" CssClass="hide-control" Checked="true" OnCheckedChanged="displayStudentsChange" AutoPostBack="True" /></label>
            </div>
        </section>

        <!--     TABLE SECTION      -->
        <div class="table-container" id="stdTable" runat="server">
            
        </div>

        <%--<asp:GridView ID="GridView1" CssClass="table" runat="server" AutoGenerateColumns="False"
            BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px"
            CellPadding="4" ForeColor="Black" GridLines="Vertical" DataSourceID="SqlDataSource1">
            <AlternatingRowStyle BackColor="White" />
            <Columns>
                <asp:TemplateField HeaderText="Photo">  
                    <EditItemTemplate>  
                        <asp:Image DataField="Photo" ID="stdImg" runat="server"/>
                    </EditItemTemplate>  
                    <ItemTemplate>  
                        <asp:Image DataField="Photo" ID="stdImg" runat="server"/>
                    </ItemTemplate>  
                </asp:TemplateField>  
                <asp:BoundField DataField="Photo" HeaderText="Photo" SortExpression="Photo"></asp:BoundField>
                <asp:BoundField DataField="FullName" HeaderText="Name" SortExpression="FullName"></asp:BoundField>
                <asp:TemplateField HeaderText="Attend">  
                    <EditItemTemplate>  
                        <asp:CheckBox ID="CheckBox1" runat="server" />  
                    </EditItemTemplate>  
                    <ItemTemplate>  
                        <asp:CheckBox ID="CheckBox1" runat="server" />  
                    </ItemTemplate>  
                </asp:TemplateField>  
            </Columns>

            <FooterStyle BackColor="#CCCC99" />
            <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
            <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
            <RowStyle BackColor="#F7F7DE" />
            <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
            <SortedAscendingCellStyle BackColor="#FBFBF2" />
            <SortedAscendingHeaderStyle BackColor="#848384" />
            <SortedDescendingCellStyle BackColor="#EAEAD3" />
            <SortedDescendingHeaderStyle BackColor="#575357" />
        </asp:GridView>

        <asp:SqlDataSource runat="server" ID="SqlDataSource1" ConnectionString='<%$ ConnectionStrings:StudentsAttendanceConnectionString %>' SelectCommand="SELECT  Accounts.Photo, Accounts.FullName FROM Students INNER JOIN Accounts ON Accounts.Email = Students.Std_Email WHERE (Students.Std_Group IN ('a', 'b', 'c', 'd', 'e')) AND (Students.Std_Status IN ('Continuous', 'Warning', 'Separation')) ORDER BY Accounts.FullName"></asp:SqlDataSource>--%>
        
        <asp:Button ID="saveTimeBtn" runat="server" CssClass="form-control btn svTbl" Text="finish" OnClick="saveTimeClick"/>
    </form>
    </main>

    <!-- FOTTER  -->
    <footer-component></footer-component>
</body>
</html>
