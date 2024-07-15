import * as mergeDirs from 'merge-dirs';
import fs from "fs-extra";
import path from "path";
import * as os from "os";

export default class FileManager {
    // Method to merge directories
    mergeDirectories(source: string, target: string, conflictResolver: 'ask' | 'skip' | 'overwrite' = 'ask') {
        // Call the merge function
        mergeDirs(source, target, conflictResolver);
        console.log(`Directories merged from ${source} to ${target}`);
    }

    // Method to merge directories into a temp directory
    mergeDirectoriesToTemp(source1: string, source2: string): string {
        // Create a temporary directory
        const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'merge-'));

        // Merge the first directory into the temp directory
        mergeDirs(source1, tempDir, 'overwrite');
        console.log(`Merged ${source1} into temporary directory ${tempDir}`);

        // Merge the second directory into the temp directory
        mergeDirs(source2, tempDir, 'overwrite');
        console.log(`Merged ${source2} into temporary directory ${tempDir}`);

        // Return the path to the temporary directory
        return tempDir;
    }
}
