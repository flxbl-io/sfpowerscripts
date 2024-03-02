import { DeploymentCustomizer } from './DeploymentCustomizer';
import PicklistEnabler from './PicklistEnabler';


export class PreDeployersRegistry {
    static getPreDeployers(): DeploymentCustomizer[] {
        const preDeployers: DeploymentCustomizer[] = [];

        const picklistEnabler = new PicklistEnabler();
        preDeployers.push(picklistEnabler);

        return preDeployers;
    }
}
