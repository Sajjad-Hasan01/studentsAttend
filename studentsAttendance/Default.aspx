<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head runat="server">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Students' Attendance</title>
    <link rel="shortcut icon" href="./icon/main-favicon.svg" type="image/x-icon"/>
    <link rel="stylesheet" href="./css/style.css"/>
    <link rel="stylesheet" href="./css/home.css"/>
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
        <header id="header" runat="server">
            <div>
                <div class="title">
                    <h1>students' attendance</h1>
                    <p>check who didn't attend</p>
                </div>
                <div class="datetime">
                    <div class="date"></div>
                    <div class="time">
                        <span id="hours">00</span>
                        <span>:</span>
                        <span id="minutes">00</span>
                        <span id="session">AM</span>
                    </div>
                </div>
            </div>
        </header>
    </main>

    <!-- FOTTER  -->
    <footer-component></footer-component>
</body>
</html>
