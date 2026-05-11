import { getAllSolutions as getOld } from '../src/lib/solutions';
import { getAllSolutions as getNew } from '../src/lib/solutions_db';
import assert from 'assert';

async function test() {
    console.log("Fetching old solutions...");
    const oldSols = await getOld();
    console.log("Fetching new solutions...");
    const newSols = await getNew();
    
    const sortSols = (sols: any[]) => sols.sort((a,b) => a.id.localeCompare(b.id));
    
    try {
        assert.deepStrictEqual(sortSols(oldSols), sortSols(newSols), "getAllSolutions mismatch");
    } catch(e) {
        console.error("Mismatch in getAllSolutions");
        console.log(sortSols(oldSols).slice(0,1));
        console.log(sortSols(newSols).slice(0,1));
        process.exit(1);
    }
    
    console.log(`Total solutions: ${oldSols.length} (Old) vs ${newSols.length} (New)`);
    console.log("✅ getAllSolutions matches perfectly!");
}

test().catch(console.error);
