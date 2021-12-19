import * as path from 'path';
import * as fs from 'fs-extra';

interface File {
  name: string;
  type: 'file' | 'dir';
  path: string;
  children?: File[];
}

async function listDir(location: string): Promise<File[]> {
  const info = [] as File[];
  const readDir = await fs.readdir(location);
  for (let j = 0; j < readDir.length; j++) {
    const file = readDir[j];
    const item = {} as File;
    const newPath = path.join(location, file);
    const stats = await fs.lstat(newPath);
    if (stats.isDirectory()) {
      item.type = 'dir';
      item.path = String(newPath);
      item.name = path.basename(newPath);
      item.children = await listDir(newPath);
    } else {
      item.type = 'file';
      item.path = String(newPath);
      item.name = path.basename(newPath);
    }
    info.push(item);
  }
  return info;
}
listDir(path.join(__dirname, 'target'))
  .then((result) => {
    console.log(JSON.stringify(result, null, '  '));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
