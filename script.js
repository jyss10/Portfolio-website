document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://portfolio-webservice-f4o1.onrender.com'; // Change to your web service URL

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update personal information
            const personalInfoDiv = document.getElementById('personalInfo');
            personalInfoDiv.innerHTML = `
                <h2>Personal Information</h2>
                <p><i class="fas fa-user"></i> ${data.personalInfo.Name}</p>
                <p><i class="fas fa-envelope"></i> <a href="mailto:${data.personalInfo.Email}"><font color="blue">${data.personalInfo.Email}</font></a></p>
                <p><i class="fas fa-phone"></i> <a href="tel:${data.personalInfo.ContactNo}">${data.personalInfo.ContactNo}</a></p>
                <p><i class="fas fa-birthday-cake"></i> ${data.personalInfo.Birthday}</p>
                <p><i class="fas fa-venus-mars"></i> ${data.personalInfo.Gender}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${data.personalInfo.Address}</p>
            `;

            // Update skills
            const skillsDiv = document.getElementById('skills');
            skillsDiv.innerHTML = `
                <h2>Skills</h2>
                <ul>
                    ${data.skills.map(skill => `<li><p>${skill.description} - ${skill.level}</p></li>`).join('')}
                </ul>
            `;

            // Update work experience
            const workExperienceDiv = document.getElementById('workExperience');
            workExperienceDiv.innerHTML = `
                <h2>Work Experience</h2>
                <ul>
                    ${data.workExperience.map(exp => `<li><h4>${exp.year}</h4><h4>${exp.designation}</h4><p>${exp.company}</p><p>${exp.details}</p></li>`).join('')}
                </ul>
            `;
            const referencesDiv = document.getElementById('references');
            referencesDiv.innerHTML = `
                <h2>Personal References</h2>
                <ul>
                    ${data.personalReferences.map(ref => `<li><h4>${ref.name}</h4><p>${ref.relationship}</p><p>Contact Number: ${ref.contactNo}</p></li>`).join('')}
                </ul>
            `;
        })
        .catch(error => console.error('Error fetching data:', error));
});
