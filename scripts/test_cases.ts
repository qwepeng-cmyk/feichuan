import { getAllCases as getOld } from '../src/lib/cases';
import { getAllCases as getNew } from '../src/lib/cases_db';
import assert from 'assert';

async function test() {
    console.log("Fetching old cases...");
    const oldCases = await getOld();
    console.log("Fetching new cases...");
    const newCases = await getNew();
    
    const sortCases = (cases: any[]) => cases.sort((a,b) => a.handle.localeCompare(b.handle));
    
    try {
        assert.deepStrictEqual(sortCases(oldCases), sortCases(newCases), "getAllCases mismatch");
    } catch(e) {
        console.error("Mismatch in getAllCases");
        process.exit(1);
    }
    
    console.log(`Total cases: ${oldCases.length} (Old) vs ${newCases.length} (New)`);
    console.log("✅ getAllCases matches perfectly!");
}

test().catch(console.error);
