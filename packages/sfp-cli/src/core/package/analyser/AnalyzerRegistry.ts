import FHTAnalyser from './FHTAnalyzer';
import FTAnalyser from './FTAnalyzer';
import { PackageAnalyzer } from './PackageAnalyzer';
import PicklistAnalyzer from './PicklistAnalyzer';

export class AnalyzerRegistry {
    static getAnalyzers(): PackageAnalyzer[] {
        const packageAnalyzers: PackageAnalyzer[] = [];

        //TODO: Make dynamic
        const fhtAnalyzer = new FHTAnalyser();
        const ftAnalyser = new FTAnalyser();
        const picklistAnalyzer = new PicklistAnalyzer();
        packageAnalyzers.push(fhtAnalyzer);
        packageAnalyzers.push(ftAnalyser);
        packageAnalyzers.push(picklistAnalyzer);

        return packageAnalyzers;
    }
}
