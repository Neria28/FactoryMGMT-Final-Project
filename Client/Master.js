let outOfActions = false;

async function checkLogs(userID) {
  var resp = await fetch("https://localhost:44301/api/logs/" + userID);
  outOfActions = await resp.json();
  if (outOfActions == true) {
    alert("You are out of actions. Come back tomorrow")
    return outOfActions;
  } else {
    return outOfActions;
  }

}

async function addAction() {
  let userId = sessionStorage.getItem('curntUserID');

  let status = await checkLogs(userId);

  if (status == false) {
    let objToAct = { userID: userId }
    var addActParams = {
      method: 'put',
      body: JSON.stringify(objToAct),
      headers: { "Content-type": "application/json" }
    }
    let addAction = await fetch("https://localhost:44301/api/logs/addaction/" + userId, addActParams)
    return true;
  } else {
    return false;
  }
}

function convertDate(date){
  var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

//*****Check if user exist*****//
async function Validate() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;


  var obj = { userName: username, password: password };

  var fecthParams = {
    method: 'post',
    body: JSON.stringify(obj),
    headers: { "Content-type": "application/json" }
  }

  var resp = await fetch("https://localhost:44301/api/login", fecthParams);
  var user = await resp.json();
  // debugger;
  if (user != null) {
    sessionStorage.setItem("curntUserFullName", user.fullName);
    sessionStorage.setItem("curntUserID", user.id);
    sessionStorage.setItem("curntUserNOA", user.numOfActions);

    var UserIDNow = sessionStorage.getItem('curntUserID');

    var status = await checkLogs(UserIDNow);
    if (status == false) {
      window.location.href = "HomePage.html";
    }else{
      window.location.reload();
    }
  } else {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal.style.display = "none";
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
}

//*****Show name in each page*****//
function GetName() {
  var nameToDisplay = document.getElementById("nameOfUser");
  var currntTime = new Date();

  if (currntTime.getHours() >= 6 && currntTime.getHours() < 12) {
    nameToDisplay.innerText = "Good Morning " + sessionStorage.getItem("curntUserFullName");
  } else if (currntTime.getHours() > 12 && currntTime.getHours() < 18) {
    nameToDisplay.innerText = "Good Afternoon " + sessionStorage.getItem("curntUserFullName");
  } else {
    nameToDisplay.innerText = "Good Night " + sessionStorage.getItem("curntUserFullName");
  }
}

//*****Department Section*****//
async function ShowDepartment() {
  let resp = await fetch("https://localhost:44301/api/department");
  let dept = await resp.json();

  let departTbl = document.getElementById("departTbl");

  dept.forEach(dept => {
    const newRow = departTbl.insertRow();
    const deptName = newRow.insertCell().innerText = dept.name;
    const deptManager = newRow.insertCell().innerText = dept.fullName;

    if (dept.theresEmp == false) {
      let delBtn = document.createElement("input");
      delBtn.setAttribute("type", "button");
      delBtn.value = "Delete"
      delBtn.setAttribute("onclick", 'deleteDept(' + dept.id + ')');
      const delBtnTd = newRow.insertCell();
      delBtnTd.appendChild(delBtn);
    } else {
      const delBtnTd = newRow.insertCell().innerText = "Theres employees";
    }
  })

}

async function ShowDeptOpt() {
  var deptNameSel = document.getElementById("deptID");
  var deptManagersSel = document.getElementById("deptManagersSel");

  let resp = await fetch("https://localhost:44301/api/department/")
  let dept = await resp.json();

  dept.forEach(dept => {
    var deptNameOpt = document.createElement("option");

    deptNameOpt.innerText = dept.name;
    deptNameOpt.value = dept.id;

    deptNameSel.appendChild(deptNameOpt);
  });
  let resp1 = await fetch("https://localhost:44301/api/employee/")
  let emp = await resp1.json();

  emp.forEach(emp => {
    var deptManagerOpt = document.createElement("option");
    deptManagerOpt.innerText = emp.empfName + ' ' + emp.emplName;
    deptManagerOpt.value = emp.empID;
    deptManagerOpt.id = "empID"
    deptManagersSel.appendChild(deptManagerOpt);

  });
}

async function UpdateDept() {
  let status = await addAction();
  if (status == true) {
    let deptID = document.getElementById("deptID").value
    let deprNewName = document.getElementById("deptName").value;
    let deptManagerIDSel = document.getElementById("deptManagersSel").value;

    let obj = {};
    if( deprNewName == ""){
      obj = {manager: deptManagerIDSel }
    }else{
      obj = { name : deprNewName , manager: deptManagerIDSel }
    }

    let fecthParams = {
      method: 'put',
      body: JSON.stringify(obj),
      headers: { "Content-type": "application/json" }
    }

    let resp = await fetch("https://localhost:44301/api/department/" + deptID, fecthParams);

    if (resp.ok) {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
        window.location.href = "Department.html"
      }
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
          window.location.href = "Department.html"
        }
      }
    }
  }else{
    window.location.href = "../Login.html"
  }
}

async function deleteDept(deptId) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  var span = document.getElementsByClassName("close")[0];
  
  var hStat = document.getElementById("alertFromApi");
  hStat.innerText = "Delete the department?"

  var cBtn = document.getElementById("cBtn")
  cBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  span.onclick = function () {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      location.reload();
    }
  }

  var yBtn = document.getElementById("yBtn");
  yBtn.addEventListener("click", async function () {
    let statusOfAct = await addAction();
    if (statusOfAct == true) {
    var fecthParams = {
      method: 'delete',
      headers: { "Content-type": "application/json" }
    }

    var resp = await fetch("https://localhost:44301/api/Department/" + deptId
      , fecthParams);

    var data = await resp.json();
    cBtn.style.display = "none"
    yBtn.style.display="none"
    var h2 = document.getElementById("alertFromApi");
    h2.innerText = data;

    if (resp.ok) {

      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
        location.reload();
      }
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
          location.reload();
        }
      }
    }
  }else{
    window.location.href = "../Login.html"
  }
})
}


async function ShowAllEmps() {
  //Get The Select That Want to Add option to
  let deptManagersSel = document.getElementById("deptManagersSel");
  //get The Data you want to add 
  let resp = await fetch("https://localhost:44301/api/employee/")
  let data = await resp.json();

  data.forEach(emp => {
    let managerOption = document.createElement("option");
    managerOption.innerText = emp.empfName + ' ' + emp.emplName;
    managerOption.value = emp.empID;
    managerOption.id = "empID"
    deptManagersSel.appendChild(managerOption)
  });
}

async function AddDept() {
  let status = await addAction();
  if (status == true) {
    let deptName = document.getElementById("deptName").value;
    let deptManagerID = document.getElementById("deptManagersSel").value;

    let obj = { name: deptName, manager: deptManagerID }
    console.log(obj)

    var fecthParams = {
      method: 'post',
      body: JSON.stringify(obj),
      headers: { "Content-type": "application/json" }
    }
    var resp = await fetch("https://localhost:44301/api/department/", fecthParams);

    var h2 = document.getElementById("alertFromApi");
    if (resp.ok) {
      var data = await resp.json();
      h2.innerText = data;

      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
        window.location.href = "Department.html"
      }
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
          window.location.href = "Department.html"
        }
      }
    }
  }else{
    window.location.href = "../Login.html"
  }
}

/*****Employees Section*****/
async function ShowEmpData() {
  var resp = await fetch("https://localhost:44301/api/employee");
  var emps = await resp.json();
  let empsTbl = document.getElementById("empsTbl");

  emps.forEach(emp => {
    let trObj = document.createElement("tr");
    let tdNameObj = document.createElement("td");
    let trYear = document.createElement("td");
    let tdDeptObj = document.createElement("td");

    tdNameObj.innerText = emp.empfName + ' ' + emp.emplName;
    trYear.innerText = emp.empStartWorkYear
    //Check if emp assinged to any department
    if (emp.departmentName == null) {
      tdDeptObj.innerText = "No Apartment was assigned ";
    } else {
      tdDeptObj.innerText = emp.departmentName;
    }

    //Create Tbl HoldingShifts
    let shiftTblInTbl = document.createElement("table");
    shiftTblInTbl.align = "center";
    let shiftDateHead = document.createElement("td");
    shiftDateHead.innerText = "Date";
    let startTimeHead = document.createElement("td");
    startTimeHead.innerText = "Start";
    let endTimeHead = document.createElement("td");
    endTimeHead.innerText = "End";

    shiftTblInTbl.appendChild(shiftDateHead);
    shiftTblInTbl.appendChild(startTimeHead);
    shiftTblInTbl.appendChild(endTimeHead);

    let tdHoldShiftbl = document.createElement("td");


    emp.empShift.forEach(shift => {
      if (emp.empShift == null) {
        tdHoldShiftbl.innerText = "theres no shift";
      } else {

        
        //Adding actual shifts
        tdHoldShiftbl.appendChild(shiftTblInTbl);
        let trForInnerTbl = document.createElement("tr")

        let date = document.createElement("td")
        let start = document.createElement("td")
        let end = document.createElement("td")

        date.innerText = convertDate(shift.date);
        start.innerText = shift.startTime;
        end.innerText = shift.endTime;

        trForInnerTbl.appendChild(date);
        trForInnerTbl.appendChild(start);
        trForInnerTbl.appendChild(end);

        shiftTblInTbl.appendChild(trForInnerTbl);
      }

    })

    trObj.appendChild(tdNameObj);
    trObj.appendChild(trYear);
    trObj.appendChild(tdDeptObj);
    trObj.appendChild(tdHoldShiftbl);

    //Adding The Actions Buttons
    let tdButtons = document.createElement("td");
    let divBtn = document.createElement("div");
    divBtn.style.margin = "12% 5% 10% 5%"
    ////!!!!!!!!!!!!!!!!!בדיקת אפשרות של הכנסת בוטון גרופ של בוט-סטרפ!!!!!////
    //edit
    let editButton = document.createElement("a");
    editButton.setAttribute("href", '../Employees/EmployeeEdit.html?empID=' + emp.empID + '');
    editButton.innerText = "Edit Employee"
    editButton.style.margin = "1%"
    editButton.className += "btn btn-primary";

    //Delete
    let delButton = document.createElement("input");
    delButton.setAttribute("type", "button")
    delButton.setAttribute("onclick", 'deleteEmpData(' + emp.empID + ')');
    delButton.style.margin = "1%"
    delButton.className += "btn btn-warning"
    delButton.value = "Delete Emp"

    //Add Shifts
    let addButton = document.createElement("a");
    addButton.setAttribute("href", '../Employees/EmployeeShiftAdd.html?empID=' + emp.empID + '');
    addButton.innerText = "Add Shifts"
    addButton.style.margin = "1%"
    addButton.className += "btn btn-success"

    divBtn.appendChild(editButton);
    divBtn.appendChild(delButton);
    divBtn.appendChild(addButton);
    tdButtons.appendChild(divBtn);
    trObj.appendChild(tdButtons);

    empsTbl.appendChild(trObj);

  });

}

async function showAndSaveChosnEmp() {
  const params = new URLSearchParams(window.location.search)
  const empID = params.get('empID')

  var empNow = document.getElementById("nameOfEmp");

  let emplo = await fetch("https://localhost:44301/api/employee/" + empID)
  let emp = await emplo.json();

  let deps = await fetch("https://localhost:44301/api/department/")
  let dep = await deps.json();


  empNow.innerText = "Edit " + emp.fName + ' ' + emp.lName + " Details";

  let crntEmpDiv = document.getElementById("empDetailsDiv");
  //FIRST NAME
  let h5FName = document.createElement("h5")
  h5FName.innerText = "First Name"
  let empfNameInp = document.createElement("input");
  empfNameInp.setAttribute("type", "text");
  empfNameInp.id = "empfName";
  empfNameInp.value = emp.fName;
  //LAST NAME
  let h5LName = document.createElement("h5");
  h5LName.innerText = "Last Name";
  let emplNameInp = document.createElement("input");
  emplNameInp.setAttribute("type", "text");
  emplNameInp.id = "emplName";
  emplNameInp.value = emp.lName;
  //YEAR
  let h5Ystart = document.createElement("h5");
  h5Ystart.innerText = "Year start working";
  let empStartYear = document.createElement("input");
  empStartYear.setAttribute("type", "number");
  empStartYear.id = "startYear";
  empStartYear.value = emp.startWorkYear;

  let h5deptName = document.createElement("h5");
  h5deptName.innerText = "Department Name";
  let deptSelect = document.createElement("select");
  deptSelect.id = "selectedDeptId";

  dep.forEach(dep => {
    let deptNameOpt = document.createElement("option");
    deptNameOpt.innerText = dep.name;
    deptNameOpt.value = dep.id;
    if (emp.departmentID == deptNameOpt.value) {
      deptNameOpt.setAttribute("selected", "selected");
    }
    deptSelect.appendChild(deptNameOpt);

    crntEmpDiv.appendChild(h5FName);
    crntEmpDiv.appendChild(empfNameInp);
    crntEmpDiv.appendChild(h5LName);
    crntEmpDiv.appendChild(emplNameInp);
    crntEmpDiv.appendChild(h5Ystart);
    crntEmpDiv.appendChild(empStartYear);
    
    crntEmpDiv.appendChild(h5deptName);
    crntEmpDiv.appendChild(deptSelect);
  });

  let btnDiv = document.getElementById("btnDiv");

  let saveBtn = document.createElement("input");
  saveBtn.setAttribute("type", "button");
  saveBtn.className = ("btn btn-success");
  saveBtn.value = "Save"

  btnDiv.appendChild(saveBtn);

  //*****function That Save Emp Data*****//

  saveBtn.onclick = async function () {
    let fName = document.getElementById("empfName");
    let lName = document.getElementById("emplName");
    let year = document.getElementById("startYear");
    let deptID = document.getElementById("selectedDeptId")
    
    let status = await addAction();
    if (status == true) {
      let obj = {
        id: empID, fName: fName.value,
        lName: lName.value, startWorkYear: year.value,
        departmentID: deptID.value
      };

      var fecthParams = {
        method: 'put',
        body: JSON.stringify(obj),
        headers: { "Content-type": "application/json" }
      }
      var resp = await fetch("https://localhost:44301/api/employee/put/" + empID, fecthParams);

      if (resp.ok) {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
          modal.style.display = "none";
          window.location.href = "Department.html"

        }
        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
            window.location.href = "../Department/Department.html"
          }
        }
      }
    } else {
      window.location.href = "../Login.html"
    }
  }
}

function deleteEmpData(empID) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  var span = document.getElementsByClassName("close")[0];

  var cBtn = document.getElementById("cBtn")
  cBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  span.onclick = function () {
    modal.style.display = "none";
  }

  var yBtn = document.getElementById("yBtn");
  yBtn.addEventListener("click", async function () {
    let statusOfAct = await addAction();
    if (statusOfAct == true) {

      var fecthParams = {
        method: 'DELETE',
        headers: { "Content-type": "application/json" }
      }
      var resp = await fetch("https://localhost:44301/api/employee/delete/" + empID, fecthParams);

      var status = await resp.json();
      if (resp.ok) {
        document.getElementById("delStatus").innerText = status;
        document.getElementById("yBtn").style.display = "none";
        document.getElementById("cBtn").style.display = "none";

        span.onclick = function () {
          modal.style.display = "none";
          window.location.href = "Employees.html"
        }

        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
            window.location.href = "Employees.html"
          }
        }
      }
    } else {
      window.location.href = "../Login.html"
    }
  });

}

async function AddShiftToEmp() {
  const params = new URLSearchParams(window.location.search)
  const empID = params.get('empID')

  var empNow = document.getElementById("nameOfEmp");

  let emplo = await fetch("https://localhost:44301/api/employee/" + empID)
  let emp = await emplo.json();

  empNow.innerText = "Add shift to " + emp.fName + ' ' + emp.lName + "";

  let resp = await fetch("https://localhost:44301/api/shift")
  let shifts = await resp.json();

  for (let s of shifts) {
    const newOpt = document.createElement("option");
    newOpt.innerText = "Date: " + convertDate(s.date) + " Time: " + s.startTime + " - " + s.endTime;
    newOpt.setAttribute("value", s.id);
    let select = document.getElementById("shiftDates");
    select.appendChild(newOpt);
  }

  //Add the shift to Emp

  let saveButton = document.getElementById("saveShift");
  saveButton.onclick = async function () {
    let select = document.getElementById("shiftDates");

    let status = await addAction();
    if (status == true) {

      let obj = { employeeID: empID, shiftID: select.value };

      var fecthParams = {
        method: 'post',
        body: JSON.stringify(obj),
        headers: { "Content-type": "application/json" }
      }

      var resp = await fetch("https://localhost:44301/api/shift/", fecthParams);

      if (resp.ok) {
        var modal = document.getElementById("myModal");
        var shiftStat = document.getElementById("shiftStat");
        shiftStat.innerText = "Shift has been added to " + emp.fName + ' ' + emp.lName;
        modal.style.display = "block";
        var span = document.getElementsByClassName("close")[0];

        span.onclick = function () {
          modal.style.display = "none";
          window.location.href = "Employees.html"
        }

        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
            window.location.href = "Employees.html"
          }
        }
      }
    } else {
      window.location.href = "../Login.html"
    }
  }
}

async function searchResult() {
  const params = new URLSearchParams(window.location.search)
  const inpSend = params.get('inp');
  let inp ="";
  if(inpSend == ""){
    inp = null
  }else{
    inp = inpSend
  }
  const by = params.get('by');
  let status = await addAction();
  if (status == true) {
    
    let resp = await fetch("https://localhost:44301/api/employee/search/" + inp + '/' + by);
    var result = await resp.json();

    let resTbl = document.getElementById("srchResTbl");


    if (result.length != 0) {
      result.forEach(emp => {
        let trObj = document.createElement("tr");
        let tdNameObj = document.createElement("td");
        let tdDeptObj = document.createElement("td");

        tdNameObj.innerText = emp.empfName + ' ' + emp.emplName;
        tdNameObj.value = emp.empfName
        if (emp.departmentName == null) {
          tdDeptObj.innerText = "No Apartment was assigned ";
        } else {
          tdDeptObj.innerText = emp.departmentName;
        }

        let shiftTblInTbl = document.createElement("table");
        shiftTblInTbl.align = "center";
        let shiftDateHead = document.createElement("td");
        shiftDateHead.innerText = "Date";
        let startTimeHead = document.createElement("td");
        startTimeHead.innerText = "Start";
        let endTimeHead = document.createElement("td");
        endTimeHead.innerText = "End";
        
        shiftTblInTbl.appendChild(shiftDateHead);
        shiftTblInTbl.appendChild(startTimeHead);
        shiftTblInTbl.appendChild(endTimeHead);

        let tdHoldShiftbl = document.createElement("td");
        tdHoldShiftbl.appendChild(shiftTblInTbl);

        emp.empShift.forEach(shift => {
          if (emp.empShift == null) {
            tdHoldShiftbl.innerText = "theres no shift";
          } else {
            //Adding actual shifts
            tdHoldShiftbl.appendChild(shiftTblInTbl);
            let trForInnerTbl = document.createElement("tr")

            let date = document.createElement("td")
            let start = document.createElement("td")
            let end = document.createElement("td")

            date.innerText = convertDate(shift.date)
            start.innerText = shift.startTime;
            end.innerText = shift.endTime;

            trForInnerTbl.appendChild(date);
            trForInnerTbl.appendChild(start);
            trForInnerTbl.appendChild(end);

            shiftTblInTbl.appendChild(trForInnerTbl);
          }

        })

        trObj.append(tdNameObj);
        trObj.append(tdDeptObj);
        trObj.append(tdHoldShiftbl)
        resTbl.append(trObj);
      })

    } else {
      resTbl.style.display = "none";
      let resHeader = document.getElementById("resHeader");
      let h6ErrorDiscription = document.createElement("h6")
      resHeader.innerText = "Theres no result for your Request";
      resHeader.style.color = "red";
      h6ErrorDiscription.innerText = "Name and/or Last name Must Start with cpital letters";
      resHeader.appendChild(h6ErrorDiscription)
    }
  } else {
    window.location.href = "../Login.html"
  }
}

/*****Shift Section*****/
async function loadShift() {
  let resp = await fetch("https://localhost:44301/api/shift/all");
  let shift = await resp.json();

  if (shift != null) {
    let tbl = document.getElementById("shiftTbl");

    shift.forEach(s => {
      let newRow = tbl.insertRow();
      const date = newRow.insertCell().innerText = convertDate(s.date)
      const time = newRow.insertCell().innerText = s.startTime + '-' + s.endTime;
      const employees = newRow.insertCell();
      const ulObj = document.createElement('ul');
      employees.appendChild(ulObj);
      for (let e of s.empList) {
        if (e != null) {
          const liObj = document.createElement('li');
          const linkObj = document.createElement('a');
          linkObj.innerText = e.fName + ' ' + e.lName;
          linkObj.setAttribute("href", '../Employees/EmployeeEdit.html?empID=' + e.id + '')
          liObj.appendChild(linkObj);
          ulObj.appendChild(liObj);
        } else {
          const noEmp = newRow.insertCell().innerText = "no emps on Shift";
          ulObj.appendChild(noEmp);

        }
      }
    })
  }
}

async function postShift() {
  const typeV = document.getElementById("type").value;
  const startTimeV = document.getElementById("sTime").value;
  const endTimeV = document.getElementById("eTime").value;
  const dateV = document.getElementById("date").value;

  let statusOfAct = await addAction();
  if (statusOfAct == true) {

    let obj = { type: typeV, startTime: startTimeV, endTime: endTimeV, date: dateV }

    var fecthParams = {
      method: 'post',
      body: JSON.stringify(obj),
      headers: { "Content-type": "application/json" }
    }

    var resp = await fetch("https://localhost:44301/api/shift/post", fecthParams);
    var status = await resp.json();

    if (resp.ok) {
      var modal = document.getElementById("myModal");
      var shiftStat = document.getElementById("shiftStat");
      modal.style.display = "block";
      shiftStat.innerText = status;
      var span = document.getElementsByClassName("close")[0];

      span.onclick = function () {
        modal.style.display = "none";
        window.location.href = "Shifts.html"
      }

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
          window.location.href = "Shifts.html"
        }
      }
    }
  }else{
    window.location.href = "../Login.html"
  }

}