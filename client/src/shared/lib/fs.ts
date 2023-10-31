import { BaseDirectory, readBinaryFile } from '@tauri-apps/api/fs';

export type ReadFileParams = {
    path: string;
    type: string;
    name: string;
};
export const readFile = async ({ path, type, name }: ReadFileParams) => {
    const content = await readBinaryFile(path, { dir: BaseDirectory.AppData });
    const blob = new Blob([content]);
    return new File([blob], name);
};
