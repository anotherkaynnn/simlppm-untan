import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";

export const generateSuratTugas = async (data: any, templateUrl: string, outputFileName: string) => {
  try {
    // 1. Fetch the template from the public folder
    const response = await fetch(templateUrl);
    if (!response.ok) {
      console.warn(`Template not found at ${templateUrl}. Please add the file.`);
      return { success: false, error: 'TEMPLATE_NOT_FOUND' };
    }
    
    // 2. Read the file as ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();
    
    // 3. Load the zip with PizZip
    const zip = new PizZip(arrayBuffer);
    
    // 4. Initialize Docxtemplater
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    
    // 5. Render the document with the provided data
    doc.render(data);
    
    // 6. Generate the output blob
    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    
    // 7. Save the file using file-saver
    saveAs(out, outputFileName);
    
    return { success: true };
  } catch (error) {
    console.error("Error generating Surat Tugas:", error);
    return { success: false, error };
  }
};
