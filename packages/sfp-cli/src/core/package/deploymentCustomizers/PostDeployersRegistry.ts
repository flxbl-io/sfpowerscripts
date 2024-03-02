import { DeploymentCustomizer } from './DeploymentCustomizer';
import FHTEnabler from './FHTEnabler';
import FTEnabler from './FTEnabler';
import FlowActivator from './FlowActivator';


export class PostDeployersRegistry {
    static getPostDeployers(): DeploymentCustomizer[] {
        const postDeployers: DeploymentCustomizer[] = [];

        //TODO: Make dynamic
        const fhtEnabler = new FHTEnabler();
        const ftEnabler = new FTEnabler();
        const flowActivator = new FlowActivator();
        postDeployers.push(fhtEnabler);
        postDeployers.push(ftEnabler);
        postDeployers.push(flowActivator);

        return postDeployers;
    }
}
