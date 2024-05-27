document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("register_button").addEventListener("click", function() {
        var formData = {
            first_name: document.getElementById("first_name").value,
            last_name: document.getElementById("last_name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        saveUserDataToXML(formData);
    });
});

async function saveUserDataToXML(formData) {
    var xmlContent = `
        <user>
            <first_name>${formData.first_name}</first_name>
            <last_name>${formData.last_name}</last_name>
            <email>${formData.email}</email>
            <password>${formData.password}</password>
        </user>
    `;

    try {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: "../XML/user_profile.xml",
            types: [
                {
                    description: 'XML Files',
                    accept: {
                        'text/xml': ['.xml'],
                    },
                },
            ],
        });

        const writableStream = await fileHandle.createWritable();
        await writableStream.write(xmlContent);
        await writableStream.close();

        alert("User profile saved successfully!");

        fetchUserDataFromXML();
    } catch (error) {
        console.error("Error saving user profile:", error);
        alert("An error occurred while saving user profile. Please try again.");
    }
}

async function fetchUserDataFromXML() {
    try {
        const fileHandle = await window.showOpenFilePicker({
            types: [
                {
                    description: 'XML Files',
                    accept: {
                        'text/xml': ['.xml'],
                    },
                },
            ],
        });

        const file = await fileHandle[0].getFile();
        const fileContents = await file.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(fileContents, 'text/xml');

        const userData = {
            first_name: xmlDoc.querySelector('first_name').textContent,
            last_name: xmlDoc.querySelector('last_name').textContent,
            email: xmlDoc.querySelector('email').textContent,
            password: xmlDoc.querySelector('password').textContent,
        };

        // Display the fetched user data on the webpage
        document.getElementById("user_data").innerHTML = `
            <p>First Name: ${userData.first_name}</p>
            <p>Last Name: ${userData.last_name}</p>
            <p>Email: ${userData.email}</p>
            <p>Password: ${userData.password}</p>
        `;
    } catch (error) {
        console.error("Error retrieving user data:", error);
        alert("An error occurred while retrieving user data. Please try again.");
    }
}

