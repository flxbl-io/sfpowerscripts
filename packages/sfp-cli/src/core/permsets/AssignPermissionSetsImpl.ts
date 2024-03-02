import { Connection } from '@salesforce/core';
import child_process = require('child_process');
import SFPLogger, { Logger, LoggerLevel } from '@flxblio/sfp-logger';
import PermissionSetFetcher from './PermissionSetFetcher';
import { ZERO_BORDER_TABLE } from '../display/TableConstants';
const Table = require('cli-table');

export default class AssignPermissionSetsImpl {
    constructor(
        private conn: Connection,
        private permSets: string[],
        private project_directory: string,
        private packageLogger: Logger
    ) {}

    public async exec(): Promise<{
        successfullAssignments: {
            username: string;
            permset: string;
        }[];
        failedAssignments: {
            username: string;
            permset: string;
        }[];
    }> {
        const permsetListImpl: PermissionSetFetcher = new PermissionSetFetcher(this.conn.getUsername(), this.conn);
        const assignedPermSets = await permsetListImpl.fetchAllPermsetAssignment();

        const failedAssignments: {
            username: string;
            permset: string;
        }[] = [];
        const successfullAssignments: {
            username: string;
            permset: string;
        }[] = [];

        for (const permSet of this.permSets) {
            const permSetAssignmentMatch = assignedPermSets.find((record) => {
                return record.PermissionSet.Name === permSet;
            });

            if (permSetAssignmentMatch !== undefined) {
                // Treat permsets that have already been assigned as successes
                successfullAssignments.push({ username: this.conn.getUsername(), permset: permSet });
                continue;
            }

            try {
                const permsetAssignmentJson: string = child_process.execSync(
                    `sf org assign permset -n ${permSet} -o ${this.conn.getUsername()} --json`,
                    {
                        cwd: this.project_directory,
                        encoding: 'utf8',
                        stdio: ['pipe', 'pipe', 'inherit'],
                    }
                );

                const permsetAssignment = JSON.parse(permsetAssignmentJson);
                if (permsetAssignment.status === 0)
                    successfullAssignments.push({ username: this.conn.getUsername(), permset: permSet });
                else failedAssignments.push({ username: this.conn.getUsername(), permset: permSet });
            } catch (err) {
                failedAssignments.push({ username: this.conn.getUsername(), permset: permSet });
            }
        }

        if (successfullAssignments.length > 0) {
            SFPLogger.log('Successful PermSet Assignments:', LoggerLevel.INFO, this.packageLogger);
            this.printPermsetAssignments(successfullAssignments);
        }

        if (failedAssignments.length > 0) {
            SFPLogger.log('Failed PermSet Assignments', LoggerLevel.INFO, this.packageLogger);
            this.printPermsetAssignments(failedAssignments);
        }

        return { successfullAssignments, failedAssignments };
    }

    private printPermsetAssignments(assignments: { username: string; permset: string }[]) {
        const table = new Table({
            head: ['Username', 'Permission Set Assignment'],
            chars: ZERO_BORDER_TABLE
        });

        assignments.forEach((assignment) => {
            table.push([assignment.username, assignment.permset]);
        });

        SFPLogger.log(table.toString(), LoggerLevel.INFO, this.packageLogger);
    }
}
