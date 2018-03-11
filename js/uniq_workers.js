onmessage = function (event) {
    const result = [];
    event.data.map(currentRecord => {
        // if ($.inArray(currentRecord, result) == -1) {
        //     result.push(currentRecord);
        // }
        if (!result.length) {
            result.push(currentRecord);
        } else {
            result.map(r => {
                if (!isEquivalent(currentRecord, r)) {
                    result.push(currentRecord);
                }
                // Object.keys(currentRecord).map(crKey => {
                //     if (r[crKey] !== currentRecord[crKey]) {
                //         result.push(currentRecord);
                //     }
                // });
            });
        }
    });
    postMessage(result);
};
function isEquivalent(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}