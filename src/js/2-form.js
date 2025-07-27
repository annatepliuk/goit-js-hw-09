//Helpers
function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}


function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}

const formEl = document.querySelector(".feedback-form");
let formData =  { 
    email: "",
    message: "" ,};

// Перевірка на заповненість полів
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

// Відстеження введення (input) 
formEl.addEventListener("input", (e) => {
  try {
    const { name, value } = e.target;
    formData[name] = value.trim();
    saveToLS("feedback-form-state", formData);
  } catch (error) {
    console.error("Error handling input event:", error);
  }
});

//Обробка відправлення форми 

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const { email, message } = formData;

    if (email === "" || message === "") {
      alert("Fill please all fields");
      return;
    }

// Очищення

    localStorage.removeItem("feedback-form-state");
    formData = { email: "", message: "" };
    formEl.reset();
  } catch (error) {
    console.error("Error during form submission:", error);
  }
});