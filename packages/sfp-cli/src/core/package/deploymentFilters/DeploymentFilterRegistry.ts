import { DeploymentFilter  } from './DeploymentFilter';
import EntitlementVersionFilter from './EntitlementVersionFilter';




export class DeploymentFilterRegistry {
    static getImplementations(): DeploymentFilter[] {
        const deploymentFilterImpls: DeploymentFilter[] = [];

        //TODO: Make dynamic
        const entitlementVersionFilter = new EntitlementVersionFilter();
        deploymentFilterImpls.push(entitlementVersionFilter);
    
        return deploymentFilterImpls;
    }
}
