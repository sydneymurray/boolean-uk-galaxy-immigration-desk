
/////////////////////////////////////////////////////////////////////////
// VARIABLES ARE DECLARED HERE
const infoSection = document.querySelector(".info-section");
const listSection = document.querySelector(".list-section");
const actionSection = document.querySelector(".action-section");
let state = []


/////////////////////////////////////////////////////////////////////////
// FUNCTIONS ARE DECLARED HERE

function displayMainPage(){
    retrieveApplicantsFromExternal().then(function(){
        displayApplicantList()
    })
}

function retrieveApplicantsFromExternal(){
    return fetch("https://swapi.dev/api/people/")
        .then(function (promise) {
            return promise.json()
        })
        .then(function (people) {
            state.applicants = people
            state.accepted = ["DUMMY"]
            return people
        })
}



function displayApplicantList(){
    let listSection = document.querySelector(".list-section")
    
    // CLEAR THE SECTION
    listSection.innerHTML = ""

    // CREATE AN H1 FOR THE TITLE
    let listSectionTitle = document.createElement("h1")
    listSectionTitle.className = "list-title"
    listSectionTitle.innerText = "Applicants"
    listSection.append(listSectionTitle)

    // CREATE AN UN-ORDERED LIST
    let listSectionUl = document.createElement("ul")
    listSectionUl.className = "applicant-list"
    listSection.append(listSectionUl)

    for (const applicant of state.applicants.results) 
        displayListApplicant(applicant)        
}

function displayListApplicant(applicant){
    let listSectionUL = document.querySelector(".applicant-list")

    // CREATE THE LIST ITEM
    let applicantLi = document.createElement("li")
    applicantLi.className = "applicant-li"
    listSectionUL.append(applicantLi)

    // IF IMMIGRATION HAS ALREADY BEEN ACCEPTED THEN
    // CHANGE BACKGROUND COLOR TO GREEN
    if (state.accepted.indexOf(applicant.name) > -1){
        applicantLi.className = "applicant-li approved-green"
        console.log("Yes",applicant.name)
    }

    // CREATE A SPAN FOR APPLICANTS NAME
    let applicantSpan = document.createElement("strong")
    applicantSpan.className = "applicant-span"
    applicantSpan.innerText = applicant.name
    applicantLi.append(applicantSpan)
    
    // CREATE A BUTTON VIEW BUTTON
    let applicantViewButton = document.createElement("button")
    applicantViewButton.className = "applicant-button"
    applicantViewButton.innerText = "VIEW"
    applicantLi.append(applicantViewButton)

    applicantViewButton.addEventListener("click",function(){
        state.selectedApplicant = applicant
        displayApplicantInfo()

        // IF IMMIGRATION HAS ALREADY BEEN ACCEPTED THEN
        // 'ACCEPTED FORM' ELSE 'IMMIGRATION FORM' 
        if (state.accepted.indexOf(applicant.name) > 0)
            displayAcceptedForm()
        else
            displayImmigrationForm()
    })
}

function displayAcceptedForm(){
    let actionSection = document.querySelector(".action-section")
    actionSection.innerHTML = ""

    // DISPLAY IMMIGRATION FORM TITLE
    let immigrationFormTitle = document.createElement("h1")
    immigrationFormTitle.className = "list-title immigration-title"
    immigrationFormTitle.innerText = "IMMIGRATION FORM"
    actionSection.append(immigrationFormTitle)

    // CREATE A DIV CONTAINER FOR THE APPLICANTS NAME
    let immigrationNameDiv = document.createElement("div")
    immigrationNameDiv.className ="immigration-name-div"
    actionSection.append(immigrationNameDiv)

    // DISPLAY APPLICANTS NAME LABEL
    let immigrationNameLabel = document.createElement("strong")
    immigrationNameLabel.className = "immigration-name-label"
    immigrationNameLabel.innerText = "Applicant Name: "
    immigrationNameDiv.append(immigrationNameLabel)

    // DISPLAY APPLICANTS NAME LABEL
    let immigrationName = document.createElement("span")
    immigrationName.className = "immigration-name"
    immigrationName.innerText = state.selectedApplicant.name
    immigrationNameDiv.append(immigrationName)

    // CREATE AN ACCEPTED HEADING
    let acceptedH1 = document.createElement("h1")
    acceptedH1.setAttribute("class","approved-heading approved-green")
    acceptedH1.innerText = "ACCEPTED"
    actionSection.append(acceptedH1)
}

function displayApplicantInfo(){
    let infoSection = document.querySelector(".info-section")
    infoSection.innerHTML = ""

    // CREATE A DIV CONTAINER TO DISPLAY THE SELECTED APPLICANT INFO
    let infoSectionContainer = document.createElement("div")
    infoSectionContainer.className ="info-container"
    infoSection.append(infoSectionContainer)

    // DISPLAY NAME TITLE
    let applicantInfoTitle = document.createElement("h2")
    applicantInfoTitle.className = "info-title"
    applicantInfoTitle.innerText = state.selectedApplicant.name
    infoSectionContainer.append(applicantInfoTitle)

    // GENDER CONTAINER DIV
    let infoGenderContainerDiv = document.createElement("div")
    infoGenderContainerDiv.className = "applicant-info-item-div"
    infoSectionContainer.append(infoGenderContainerDiv)

    // DISPLAY GENDER Label
    let applicantInfoGenderLabel = document.createElement("span")
    applicantInfoGenderLabel.className = "info-label"
    applicantInfoGenderLabel.innerText = "Gender: "
    infoGenderContainerDiv.append(applicantInfoGenderLabel)

    // DISPLAY GENDER 
    let applicantInfoGender = document.createElement("span")
    applicantInfoGender.className = "info-text"
    applicantInfoGender.innerText = state.selectedApplicant.gender
    infoGenderContainerDiv.append(applicantInfoGender)

    // D.O.B. CONTAINER DIV
    let infoDOBContainerDiv = document.createElement("div")
    infoDOBContainerDiv.className = "applicant-info-item-div"
    infoSectionContainer.append(infoDOBContainerDiv)
    
    // DISPLAY D.O.B. Label
    let applicantInfoDOBLabel = document.createElement("span")
    applicantInfoDOBLabel.className = "info-label"
    applicantInfoDOBLabel.innerText = "D.O.B: "
    infoDOBContainerDiv.append(applicantInfoDOBLabel)

    // DISPLAY D.O.B.
    let applicantInfoDOB = document.createElement("span")
    applicantInfoDOB.className = "info-text"
    applicantInfoDOB.innerText = state.selectedApplicant.birth_year
    infoDOBContainerDiv.append(applicantInfoDOB)

    // HEIGHT CONTAINER DIV
    let infoHeightContainerDiv = document.createElement("div")
    infoHeightContainerDiv.className = "applicant-info-item-div"
    infoSectionContainer.append(infoHeightContainerDiv)
    
    // DISPLAY HEIGHT Label
    let applicantInfoHeightLabel = document.createElement("span")
    applicantInfoHeightLabel.className = "info-label"
    applicantInfoHeightLabel.innerText = "Height: "
    infoHeightContainerDiv.append(applicantInfoHeightLabel)   
    
    // DISPLAY HEIGHT
    let applicantInfoHeight = document.createElement("span")
    applicantInfoHeight.className = "info-text"
    applicantInfoHeight.innerText = state.selectedApplicant.height
    infoHeightContainerDiv.append(applicantInfoHeight)    

    // MASS CONTAINER DIV
    let infoMassContainerDiv = document.createElement("div")
    infoMassContainerDiv.className = "applicant-info-item-div"
    infoSectionContainer.append(infoMassContainerDiv)

    // DISPLAY MASS Label
    let applicantInfoMassLabel = document.createElement("span")
    applicantInfoMassLabel.className = "info-label"
    applicantInfoMassLabel.innerText = "Mass: "
    infoMassContainerDiv.append(applicantInfoMassLabel)

    // DISPLAY MASS
    let applicantInfoMass = document.createElement("span")
    applicantInfoMass.className = "info-text"
    applicantInfoMass.innerText = state.selectedApplicant.mass
    infoMassContainerDiv.append(applicantInfoMass)

    // HOME WORLD CONTAINER DIV
    let infoHomeWorldContainerDiv = document.createElement("div")
    infoHomeWorldContainerDiv.className = "applicant-info-item-div"
    infoSectionContainer.append(infoHomeWorldContainerDiv)

    // DISPLAY HOMEWORLD Label
    let applicantInfoHomeWorldLabel = document.createElement("span")
    applicantInfoHomeWorldLabel.className = "info-label"
    applicantInfoHomeWorldLabel.innerText = "Home World: "
    infoHomeWorldContainerDiv.append(applicantInfoHomeWorldLabel)

    // DISPLAY HOMEWORLD
    let applicantInfoHomeWorld = document.createElement("span")
    applicantInfoHomeWorld.className = "info-text"
    retreiveHomeWorld(state.selectedApplicant.homeworld,applicantInfoHomeWorld)
    infoHomeWorldContainerDiv.append(applicantInfoHomeWorld)
}

function retreiveHomeWorld(homeWorld,span){
    return fetch(homeWorld)
        .then(function (promise) {
            return promise.json()
        })
        .then(function (planet) {
            span.innerText = planet.name
        })
}

function displayImmigrationForm(){
    let actionSection = document.querySelector(".action-section")
    actionSection.innerHTML = ""

    // DISPLAY IMMIGRATION FORM TITLE
    let immigrationFormTitle = document.createElement("h1")
    immigrationFormTitle.className = "list-title immigration-title"
    immigrationFormTitle.innerText = "IMMIGRATION FORM"
    actionSection.append(immigrationFormTitle)

    // CREATE A DIV CONTAINER FOR THE APPLICANTS NAME
    let immigrationNameDiv = document.createElement("div")
    immigrationNameDiv.className ="immigration-name-div"
    actionSection.append(immigrationNameDiv)

    // DISPLAY APPLICANTS NAME LABEL
    let immigrationNameLabel = document.createElement("strong")
    immigrationNameLabel.className = "immigration-name-label"
    immigrationNameLabel.innerText = "Applicant Name: "
    immigrationNameDiv.append(immigrationNameLabel)

    // DISPLAY APPLICANTS NAME LABEL
    let immigrationName = document.createElement("span")
    immigrationName.className = "immigration-name"
    immigrationName.innerText = state.selectedApplicant.name
    immigrationNameDiv.append(immigrationName)

    // CREATE IMMIGRATION INPUT FORM
    let immigrationForm = document.createElement("form")
    immigrationForm.className ="immigration-form"
    actionSection.append(immigrationForm)

    // CREATE A 'DESTINATION LABEL'
    let destinationLabel = document.createElement("label")
    destinationLabel.setAttribute("for","destination-input")
    destinationLabel.innerText = "Destination:"
    immigrationForm.append(destinationLabel)
    
    // CREATE 'DESTINATION' INPUT
    let destinationInput = document.createElement("input")
    destinationInput.setAttribute("id","destination-input")
    destinationInput.setAttribute("name","destination-input")
    destinationInput.setAttribute("type","text")
    destinationInput.setAttribute("required","true")
    immigrationForm.append(destinationInput)

    // CREATE 'PURPOSE OF TRAVEL' LABEL
    let purposeLabel = document.createElement("label")
    purposeLabel.setAttribute("for","travel-purpose")
    purposeLabel.innerText = "Purpose of Travel:"
    immigrationForm.append(purposeLabel)

    // CREATE A SELECTION MENU
    let purposeSelection = document.createElement("select")
    purposeSelection.setAttribute("id","travel-purpose")
    purposeSelection.setAttribute("name","travel-purpose")
    immigrationForm.append(purposeSelection)

    // CREATE A 'DEFAULT' MENU OPTION
    let defaultPurpose = document.createElement("option")
    defaultPurpose.setAttribute("value","")
    defaultPurpose.innerText = "--Please select an option--"
    purposeSelection.append(defaultPurpose)

    // CREATE A 'BUSINESS' OPTION MENU
    let businessPurpose = document.createElement("option")
    businessPurpose.setAttribute("value","business")
    businessPurpose.innerText = "Business"
    purposeSelection.append(businessPurpose)

    // CREATE A 'VACATION' MENU OPTION
    let vacationPurpose = document.createElement("option")
    vacationPurpose.setAttribute("value","vacation")
    vacationPurpose.innerText = "Vacation"
    purposeSelection.append(vacationPurpose)

    // CREATE A 'TERRORIST' LABEL
    let terrorLabel = document.createElement("label")
    terrorLabel.setAttribute("for","terrorist")
    terrorLabel.innerText = "Terrorist activity:"
    immigrationForm.append(terrorLabel)

    // CREATE 'YES' RADIO LABEL
    let terrorRadioYesInputLabel = document.createElement("label")
    terrorRadioYesInputLabel.innerText = "Yes"
    immigrationForm.append(terrorRadioYesInputLabel)

    // CREATE 'YES' RADIO BUTTON
    let terrorRadioYesInput = document.createElement("input")
    terrorRadioYesInput.setAttribute("type","radio")
    terrorRadioYesInput.setAttribute("name","terror-radio")
    terrorRadioYesInput.setAttribute("id","radio-yes")
    terrorRadioYesInput.setAttribute("value","yes")
    terrorRadioYesInputLabel.prepend(terrorRadioYesInput)

    // CREATE 'NO' RADIO LABEL
    let terrorRadioNoInputLabel = document.createElement("label")
    terrorRadioNoInputLabel.setAttribute("for","radio-no")
    terrorRadioNoInputLabel.innerText = "No"
    immigrationForm.append(terrorRadioNoInputLabel)
    
    // CREATE 'NO' RADIO BUTTON
    let terrorRadioNoInput = document.createElement("input")
    terrorRadioNoInput.setAttribute("type","radio")
    terrorRadioNoInput.setAttribute("name","terror-radio")
    terrorRadioNoInput.setAttribute("id","radio-no")
    terrorRadioNoInput.setAttribute("value","no")
    terrorRadioNoInputLabel.prepend(terrorRadioNoInput)

    // CREATE AN ACCEPT BUTTON
    let acceptbutton = document.createElement("button")
    acceptbutton.setAttribute("class","accept-button")
    acceptbutton.setAttribute("type","submit")
    acceptbutton.innerText = "Accept →"
    immigrationForm.append(acceptbutton)

    // CREATE AN EVENT LISTENER FOR SUBMIT
    immigrationForm.addEventListener("submit",function(event){
        event.preventDefault()
        state.accepted.push(state.selectedApplicant.name)
        displayApplicantList()
        displayAcceptedForm()
    })
}

/////////////////////////////////////////////////////////////////////////
// MAIN PROGRAM BEGINS HERE

displayMainPage()


/////////////////////////////////////////////////////////////////////////
