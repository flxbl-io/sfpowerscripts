import { Connection } from '@salesforce/core';
import { Logger } from '@flxblio/sfp-logger';
import AssignPermissionSetsImpl from './AssignPermissionSetsImpl';

export default class AssignPermissionSets {
    static async applyPermsets(permsets: string[], conn: Connection, sourceDirectory: string, logger: Logger) {
        const assignPermissionSetsImpl: AssignPermissionSetsImpl = new AssignPermissionSetsImpl(
            conn,
            permsets,
            sourceDirectory,
            logger
        );

        const results = await assignPermissionSetsImpl.exec();
        if (results.failedAssignments.length > 0) throw new Error('Unable to assign permsets');
    }
}
