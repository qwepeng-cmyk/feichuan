import { getAllProducts as getOld, getProductByHandle as getOldByHandle } from '../src/lib/products';
import { getAllProducts as getNew, getProductByHandle as getNewByHandle } from '../src/lib/products_db';
import assert from 'assert';

async function test() {
    console.log("Fetching old products...");
    const oldProducts = await getOld();
    console.log("Fetching new products...");
    const newProducts = await getNew();
    
    // Test getAllProducts structure
    assert.deepStrictEqual(Object.keys(oldProducts).sort(), Object.keys(newProducts).sort(), "Category keys differ");
    
    let totalOld = 0;
    let totalNew = 0;
    
    for (const key of Object.keys(oldProducts)) {
        totalOld += oldProducts[key].length;
        totalNew += newProducts[key].length;
        
        // Sort by handle before comparing to ignore array order
        const oldCat = [...oldProducts[key]].sort((a,b) => a.handle.localeCompare(b.handle));
        const newCat = [...newProducts[key]].sort((a,b) => a.handle.localeCompare(b.handle));
        
        try {
            assert.deepStrictEqual(oldCat, newCat, `Mismatch in category: ${key}`);
        } catch(e) {
            console.error(`Mismatch in category: ${key}`);
            console.log("OLD:");
            console.log(oldCat.slice(0, 2));
            console.log("NEW:");
            console.log(newCat.slice(0, 2));
            process.exit(1);
        }
    }
    
    console.log(`Total products: ${totalOld} (Old) vs ${totalNew} (New)`);
    console.log("✅ getAllProducts matches perfectly!");
    
    // Test getProductByHandle
    const testHandle = oldProducts['uav-drone-systems'][0].handle;
    console.log(`Testing getProductByHandle for: ${testHandle}`);
    
    const oldProduct = await getOldByHandle(testHandle);
    const newProduct = await getNewByHandle(testHandle);
    
    try {
        assert.deepStrictEqual(oldProduct, newProduct, "getProductByHandle mismatch");
    } catch(e) {
        console.error("Mismatch in getProductByHandle");
        console.log(Object.keys(oldProduct || {}));
        console.log(Object.keys(newProduct || {}));
        process.exit(1);
    }
    
    console.log("✅ getProductByHandle matches perfectly!");
}

test().catch(console.error);
