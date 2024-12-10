document.getElementById("convertBtn").addEventListener("click", () => {
    const files = document.getElementById("imageInput").files;
    if (files.length === 0) {
      alert("بتدوس ليه يا خول امال انت هتنزل ايه");
      return;
    }
  
    const jsPDF = window.jspdf.jsPDF;
    const pdf = new jsPDF();
  
    let promises = Array.from(files).map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.src = e.target.result;
  
          img.onload = function () {
            const imgWidth = 210; // العرض بـ mm
            const imgHeight = (img.height * imgWidth) / img.width;
            if (index > 0) pdf.addPage();
            pdf.addImage(img, "JPEG", 0, 0, imgWidth, imgHeight);
            resolve();
          };
        };
        reader.readAsDataURL(file);
      });
    });
  
    Promise.all(promises).then(() => {
      pdf.save("images.pdf");
 alert ("دوس OK علشان الملف ينزل")    });
  });
  