import sharp from "sharp";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const source = await readFile("src/components/home-page.tsx","utf8");
const logos = [...new Set([
  "dimo-logo.png", "maliban-logo.png", "bppl-logo.jpg", "gtn-logo.jpg", "teejay.png",
  ...[...source.matchAll(/"([^"/]+\.(?:png|jpg|jpeg))"/g)].map(match=>match[1]),
])];
await mkdir("public/brand/optimized",{recursive:true});
const results=[];
for (const file of logos) {
  const input=`public/brand/originals/${file}`;
  const output=`public/brand/optimized/${basename(file).replace(/\.[^.]+$/,".webp")}`;
  const size=(await stat(input)).size;
  let image = sharp(input);
  if (file === "maliban-logo.png") image = image.trim();
  const result=await image.resize({width:420,height:180,fit:"inside",withoutEnlargement:true}).webp({quality:92,alphaQuality:100,effort:6}).toFile(output);
  results.push({source:input,output,before:size,after:result.size,width:result.width,height:result.height});
}
for (const [name,widths] of [["connected-flow",[768,1280]],["infrastructure",[640,960]]]) {
  for (const width of widths) {
    const output=`public/images/${name}-${width}.webp`;
    const result=await sharp(`assets/generated/${name}.png`).resize({width,withoutEnlargement:true}).webp({quality:85,effort:6}).toFile(output);
    results.push({source:`assets/generated/${name}.png`,output,after:result.size,width:result.width,height:result.height});
  }
}
const originals=results.filter(item=>item.before);
const before=originals.reduce((sum,item)=>sum+item.before,0);
const after=originals.reduce((sum,item)=>sum+item.after,0);
const report={logos:originals.length,originalLogoBytes:before,optimizedLogoBytes:after,logoByteReductionPercent:Math.round((1-after/before)*100),files:results};
await mkdir("qa",{recursive:true});
await writeFile("qa/asset-optimization.json",JSON.stringify(report,null,2));
console.log(JSON.stringify({logos:report.logos,originalLogoBytes:before,optimizedLogoBytes:after,logoByteReductionPercent:report.logoByteReductionPercent}));
