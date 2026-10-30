const { PDFParse } = require("pdf-parse")
const fs=require('fs')

const readFile=async(path)=>{
    const read=fs.readFileSync(path)
   
    const Buffer=new PDFParse({
        data:read
    })
     const parser = await Buffer.getText();

    console.log("EXTRACTED PDF TEXT:");
    console.log(parser.text);

    return parser.text;
}


module.exports={
    readFile
}