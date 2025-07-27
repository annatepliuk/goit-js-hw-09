//Helpers
function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}


function getFromLS(key) {
  try {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : null;
  } catch (error) {
    console.error("Failed to parse data from localStorage:", error);
    return null;
  }
}

const formEl = document.querySelector(".feedback-form");
let formData =  { 
    email: "",
    message: "" ,
};

//Restore form data on load
document.addEventListener("DOMContentLoaded", () => {
  try {
    const lsData = getFromLS("feedback-form-state");
    if (lsData) {
      formData = {
        email: lsData.email?.trim() || "",
        message: lsData.message?.trim() || ""
      };
      formEl.elements.email.value = formData.email;
      formEl.elements.message.value = formData.message;
    }
  } catch (error) {
    console.error("Error restoring form data:", error);
  }
});

//Save input to localStorage without losing existing data
formEl.addEventListener("input", (e) => {
  try {
    const { name, value } = e.target;
    formData[name] = value.trim(); 
    saveToLS("feedback-form-state", formData); 
  } catch (error) {
    console.error("Error handling input event:", error);
  }
});

// Handle form submit 
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const { email, message } = formData;

    if (email === "" || message === "") {
      alert("Fill please all fields");
      return;
    }

    console.log(formData);

    localStorage.removeItem("feedback-form-state");
    formData = { email: "", message: "" };
    formEl.reset();
  } catch (error) {
    console.error("Error during form submission:", error);
  }
});
