//display all contacts when page loads
window.onload = function() {
    loadDocHandler();
  };

function loadDocHandler() {
  //create http request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //get the query result
        var xmlElements = this.responseXML.getElementsByTagName("CONTACT");
        //display in table format
        displayResult(xmlElements);
      }
    };
    xhttp.open("GET", "contacts_catalog.xml", true);
    xhttp.send();
  }

  function searchByTelephoneNumberHandler(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var telephone = document.getElementById("telephone").value;
        var xmlElements = this.responseXML.getElementsByTagName("CONTACT");

        //if entered telephone number is blank, display all contacts 
        if(telephone.trim().length == 0){
          loadDocHandler(); 
        } else {
          var searchResult = searchByKey(telephone, "TELEPHONE", xmlElements);
          displayResult(searchResult);
        }
      }
    };
    xhttp.open("GET", "contacts_catalog.xml", true);
    xhttp.send();
  }

  function searchByProfessionHandler(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var profession = document.getElementById("profession").value;
        var xmlElements = this.responseXML.getElementsByTagName("CONTACT");

        //if entered profession is blank, display all contacts 
        if(profession.trim().length == 0){
          loadDocHandler(); 
        } else {
          var searchResult = searchByKey(profession, "PROFESSION", xmlElements);
          displayResult(searchResult);
        }
      }
    };
    xhttp.open("GET", "contacts_catalog.xml", true);
    xhttp.send();
  }

  //returns an array that includes the result if found
  //returns empty array otherwise
  //key is the criteria we are searching for (i.e: telephone, profession, name, etc..)
  //tagName is the XML tag the key represents 
  function searchByKey(key, tagName, xmlElements){
    var result = []; 
    for(let i=0; i<xmlElements.length; i++){
      if(xmlElements[i].getElementsByTagName(tagName)[0].childNodes[0].nodeValue === key){
        console.log("found!");
        result.push(xmlElements[i]); 
      }
    }
    return result; 
  }
  
  //display the results either in table format or a warning message 
  function displayResult(xmlElements) {
    if(xmlElements.length == 0){
      displayMessage(); 
      return;
    }
    var table = addHeader();
    table += "<tbody>";
    for (let i=0; i<xmlElements.length; i++) {
      table += addRow(xmlElements[i], i+1);
    }
    table += "</tbody>"
    document.getElementById("contacts").innerHTML = table;
  }

  function addHeader(){
    return "<thead>" +
              "<tr>" +
                  "<th scope='col'>#</th>" +
                  "<th scope='col'>Name</th>" +
                  "<th>Profession</th>" +
                  "<th>Telephone Number</th>" +
                  "<th>Mobile Number</th>" +
              "</tr>" + 
          "</thead>";
  }

  function addRow(xmlElement, number) {
    return "<tr scope='row'><td>" +
      number + "</td><td>" +
      xmlElement.getElementsByTagName("NAME")[0].childNodes[0].nodeValue +
      "</td><td>" +
      xmlElement.getElementsByTagName("PROFESSION")[0].childNodes[0].nodeValue +
      "</td><td>" +
      xmlElement.getElementsByTagName("TELEPHONE")[0].childNodes[0].nodeValue +
      "</td><td>" +
      xmlElement.getElementsByTagName("MOBILE")[0].childNodes[0].nodeValue +
      "</td></tr>";
  }

  function displayMessage(){
    var table = "<p class='message text-muted'>Sorry! Could not find contact(s)</p>";
    document.getElementById("contacts").innerHTML = table;
  }