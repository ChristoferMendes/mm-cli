import handlebars from 'handlebars'
import { resolve  } from "path";
import { readFileSync } from 'fs';
import { __dirname } from "./dirname.js";

export const getTemplate = (templateName) => {
  const templateDir = resolve(__dirname, '../templates');
  return handlebars.compile(readFileSync(templateDir + `/${templateName}`, 'utf8'));
}