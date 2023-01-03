----	STEP 1
--use master 
--go

----	STEP 2
--create database StudentsAttendance

----	STEP 3
--use StudentsAttendance

----	STEP 4
--create table Accounts
--(
--id int not null identity(1,1),
--FullName nvarchar(50) not null,
--Email varchar(100) primary key,
--Photo varchar(100) default 'profile_photo.svg',
--Privilege varchar(25) not null ,
--Password varchar(MAX) not null
--)
--SELECT * FROM Accounts

----	STEP 5
--create table Students
--(
--Std_id int primary key identity(1,1),
--Std_Email varchar(100) FOREIGN KEY REFERENCES Accounts(Email),
--Std_Group char(1),
--Std_Status varchar(25)
--)
--SELECT * FROM Students

----	STEP 6
--create table Attendance
--(
--id int primary key identity(1,1),
--Std_Email varchar(100) FOREIGN KEY REFERENCES Accounts(Email) not null,
--Lecture_Number date DEFAULT GETDATE(),
--Start_Time time(7) not null,
--Finish_Time time(7) not null,
--Duration time(7) not null
--)

