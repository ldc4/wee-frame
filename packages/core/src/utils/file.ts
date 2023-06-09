import path from 'path';
import { readdir, stat } from 'node:fs/promises';

// 获取dir信息
const getDirInfo = async (dirPath: string): Promise<Record<string, any>[]> => {
  const dirInfo: Record<string, any>[] = [];
  const files = await readdir(dirPath);
  for (let file of files) {
    const filePath = path.resolve(dirPath, file);
    const stats = await stat(filePath);
    let type = 'file';
    if (stats.isDirectory()) {
      type = 'dir';
    }
    const extname = path.extname(file);
    const basename = path.basename(file, extname);
    let info: Record<string, any> = {
      name: file,
      extname,
      basename,
      type,
    };
    if (type === 'dir') {
      info.children = await getDirInfo(filePath);
    }
    dirInfo.push(info);
  }
  return dirInfo;
};

export {
  getDirInfo,
};
