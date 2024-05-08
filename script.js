document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://portfolio-webservice-f4o1.onrender.com/portfolio';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display personal information
            document.getElementById('name').innerText = data.personalInfo.Name;
            document.getElementById('birthdate').innerText = "Birthday: " + data.personalInfo.Birthday;
            document.getElementById('gender').innerText = "Gender: " + data.personalInfo.Gender;
            document.getElementById('age').innerText = "Age: " + calculateAge(data.personalInfo.Birthday); // You'll need to implement calculateAge function
            document.getElementById('address').innerText = "Address: " + data.personalInfo.Address;
            document.getElementById('phoneNumber').innerText = "Contact Number: " + data.personalInfo.ContactNo;
            document.getElementById('email').innerText = "Email: " + data.personalInfo.Email;

            // Display skills
            const skillsList = document.getElementById('skills');
            skillsList.innerHTML = '';
            data.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill.description + ' - ' + skill.level;
                skillsList.appendChild(li);
            });

            // Display work experience
            const workExperienceDiv = document.getElementById('workExperience');
            workExperienceDiv.innerHTML = '';
            data.workExperience.forEach(exp => {
                const expDiv = document.createElement('div');
                expDiv.innerHTML = `
                    <h4>${exp.year}</h4>
                    <h4>${exp.designation}</h4>
                    <p>${exp.company}</p>
                    <p>${exp.details}</p>
                `;
                workExperienceDiv.appendChild(expDiv);
            });

            // Display education
            const educationDiv = document.getElementById('education');
            educationDiv.innerHTML = '';
            data.education.forEach(edu => {
                const eduDiv = document.createElement('div');
                eduDiv.innerHTML = `
                    <h4>${edu.school}</h4>
                    <p>${edu.year}</p>
                `;
                educationDiv.appendChild(eduDiv);
            });

            // Display personal references
            const referencesDiv = document.getElementById('references');
            referencesDiv.innerHTML = '';
            data.personalReferences.forEach(ref => {
                const refDiv = document.createElement('div');
                refDiv.innerHTML = `
                    <h4>${ref.name}</h4>
                    <p>${ref.relationship}</p>
                    <p>Contact Number: ${ref.contactNo}</p>
                `;
                referencesDiv.appendChild(refDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Function to calculate age based on birthdate
function calculateAge(birthdate) {
    const today = new Date();
    const dob = new Date(birthdate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}
