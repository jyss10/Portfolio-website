document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://portfolio-webservice-f4o1.onrender.com/portfolio'; // Update to your web service endpoint

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update personal information
            const personalInfoDiv = document.querySelector('.contact-section');
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
            const skillsList = document.getElementById('skills');
            skillsList.innerHTML = '';
            data.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = `${skill.description} - ${skill.level}`;
                skillsList.appendChild(li);
            });

            // Update work experience
            const workExperienceDiv = document.querySelector('.experience');
            workExperienceDiv.innerHTML = `
                <h2>Work Experience</h2>
                <ul>
                    ${data.workExperience.map(exp => `<li><h4>${exp.year}</h4><h4>${exp.designation}</h4><p>${exp.company}</p><p>${exp.details}</p></li>`).join('')}
                </ul>
            `;
            
            // Update education             
            const educationDiv = document.querySelector('.education');
            educationDiv.innerHTML = `
                <div class="education">
                    <table cellpadding="7" width="100%">
                        <tr bgcolor="#1E2837"><th colspan="2"><font color="white">Education</font></th></tr>
                        ${data.education.map(edu => `
                            <tr>
                                <td><h4>${edu.school}</h4></td>
                                <td>
                                    <h4>${edu.year}</h4>
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            `;

            // Update personal references
            const referencesDiv = document.querySelector('.references');
            referencesDiv.innerHTML = `
                <h2>Personal References</h2>
                <ul>
                    ${data.personalReferences.map(ref => `<li><h4>${ref.name}</h4><p>${ref.relationship}</p><p>Contact Number: ${ref.contactNo}</p></li>`).join('')}
                </ul>
            `;
        })
        .catch(error => console.error('Error fetching data:', error));
});
