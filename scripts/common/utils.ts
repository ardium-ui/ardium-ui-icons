import ansis from 'ansis';
import fs from 'fs/promises';
import { formatFileSize } from './totals';

export function displayError(...args: any[]): void {
  console.log(ansis.red.bold('✕  ') + ansis.bgRed.white('[ERROR]'), ...args);
}
export function displaySuccess(...args: any[]): void {
  console.log(ansis.greenBright('✔ '), ...args);
}
export function displayFileCreated(path: string, bytes: number): void {
  console.log(ansis.greenBright('CREATE') + `${path} (${formatFileSize(bytes)})`);
}

export async function getFileSize(filePath: string) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch (err) {
    displayError(`Error getting file size for ${filePath}:\n`, err);
    throw new Error();
  }
}

export async function readFileAsync(filePath: string) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (err) {
    displayError(`Error reading file ${filePath}:\n`, err);
    throw new Error();
  }
}

export async function writeFileAsync(filePath: string, data: string) {
  try {
    await fs.writeFile(filePath, data, 'utf8');
  } catch (err) {
    displayError(`Error writing file ${filePath}:\n`, err);
    throw new Error();
  }
}

export async function deleteDirectoryAsync(directoryPath: string) {
  try {
    await fs.rm(directoryPath, { recursive: true, force: true });
    return true;
  } catch (err) {
    displayError(`Error while removing the directory ${directoryPath}:\n`, err);
    return false;
  }
}

export async function createDirectoryAsync(directoryPath: string) {
  try {
    await fs.mkdir(directoryPath, { recursive: true });
    return true;
  } catch (err) {
    displayError(`Error while creating the directory:\n`, err);
    return false;
  }
}

export async function readDirectoryAsync(directoryPath: string) {
  try {
    return await fs.readdir(directoryPath, { withFileTypes: true });
  } catch (err) {
    displayError(`Error reading the directory:\n`, err);
    throw new Error();
  }
}
