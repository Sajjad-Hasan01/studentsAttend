using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Text.RegularExpressions;

/// <summary>
/// Summary description for Utilities
/// </summary>
public class Utilities
{
    public Utilities()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public string GenerateHash(string entry)
    {
        Byte[] byteArr = Encoding.ASCII.GetBytes(entry);

        //Byte[] hash = ((HashAlgorithm)CryptoConfig.CreateFromName("SHA1")).ComputeHash(byteArr);
        Byte[] hash = new SHA1CryptoServiceProvider().ComputeHash(byteArr);

        return BitConverter.ToString(hash).Replace("-", "");
    }

    public string RemoveInjection(string x)
    {
        string CleanerInput = "";

        string[] tokens = x.Split(' ');

        for (int i = 0; i < tokens.Count(); i++)
        {
            if (tokens[i].Contains("'"))
            {
                CleanerInput += tokens[i].Replace("'", " ");
            }
            else if (tokens[i].Contains("--"))
            {
                CleanerInput += tokens[i].Replace("--", " ");
            }
            else if (tokens[i].Contains(";"))
            {
                CleanerInput += tokens[i].Replace(";", " ");
            }
            else if (tokens[i].Contains("="))
            {
                CleanerInput += tokens[i].Replace("=", " ");
            }
            else if (tokens[i].Contains("or"))
            {
                CleanerInput += tokens[i].Replace("or", " ");
            }
            else if (tokens[i].Contains("delete"))
            {
                CleanerInput += tokens[i].Replace("delete", " ");
            }
            else
            {
                CleanerInput += tokens[i];
            }
        }

        return CleanerInput;
    }

    public bool IsValidEmail(string email)
    {
        Regex emailRegx = new Regex(@"^([a-z\d\.-]+)@([a-z\d\.-]*)(\.)*(uobabylon\.edu\.iq)$",RegexOptions.IgnoreCase);
        return emailRegx.IsMatch(email);
    }
    
    public string GetPrivilege(string email)
    {
        string domain = email.Substring(email.IndexOf('@')+1);
        if (domain == "student.uobabylon.edu.iq") return "student";
        else return "lecturer";
    }

    public string makeUserName(string email)
    {
        string userName = email.Substring(0, email.IndexOf('@'));
        return userName;
    }
}