document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  const form = document.getElementById("uploadAudio");

  let data = {
    text: "",
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("form clicked");
    console.log(event);

    const formData = new FormData();
    const audio = document.getElementById("text").files[0];
    formData.append("audio", audio);

    let editor = document.getElementById("editor");
    var childElements = editor.children;

    // Log or process each child element
    console.log("hii")
    for (var i = 0; i < childElements.length; i++) {
      console.log(childElements[i]);
    }
    let qlEditor = document.querySelector(".ql-editor");
    console.log(qlEditor);
    console.log(editor);
    qlEditor.innerHTML += `<div id="dataContainer">hii</div>`;

    let dataCont = document.getElementById("dataContainer");
    console.log(editor);
    console.log(dataCont);
    try {
      const response = await axios.post(
        "https://notesify-server.vercel.app/transcript/transcriptAudio",
        formData,
        {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ0NDdiNzZlMmM4ZTY4ZmQxNTllZiIsImlhdCI6MTcwNjM2Njk0NywiZXhwIjoxNzA2Mzg4NTQ3fQ.j3TVKrNHnDr6zX2Qjfuh8f8WOGx4Od2bJk_ykUtZo4Y", // Replace with your actual token
          },
        }
      );

      console.log("axios hit");
      console.log(response.data);

      data.text = response.data.data.text;

      console.log("dataText:", data.text);

      // Update the dataContainer only if it exists
      if (dataCont) {
        dataCont.innerHTML += `<p>${data.text}</p>`;
      } else {
        console.error(
          "dataContainer is null or undefined. Check your HTML structure."
        );
      }
    } catch (error) {
      console.error("Error uploading file", error);
      if (error.response) {
        console.error("Server responded with data:", error.response.data);
        console.error("Server responded with status:", error.response.status);
        console.error("Server responded with headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received from the server");
        console.error("Request data:", error.request);
      } else {
        console.error("Error setting up the request", error.message);
      }
    }
  });

  function htmlTopdf() {
    const element = document.getElementById("editor");
    var opt = {
      margin: 1,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
  }
});
