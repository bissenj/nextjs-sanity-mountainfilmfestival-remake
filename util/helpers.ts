

// Checks if an object is empty.  
// Returns True if empty, False if not empty.
export function isObjectEmpty(obj) {
    let result = false;

    if (Object.keys(obj).length === 0 && obj.constructor === Object) {          
        result = true;
    }

    return result;
}