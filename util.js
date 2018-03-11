funcData.map((x, i) => {
	const arr = x.target.split(' and ');
	if (arr.length > 1) {
		x.target = arr[0].trim();
		arr.map((ex, j) => {
			if (j > 0) {
                funcData.push(Object.assign({}, x, {target: ex.trim()}));
            }
        });
	}
})

funcData.map((x, i) => {
    const arr = x.function.split(' ');
    if (arr.length > 1) {
        x.function = arr[0].trim();
        arr.map((ex, j) => {
            if (j > 0) {
                funcData.push(Object.assign({}, x, { function: ex.trim() }));
            }
        });
    }
})

JSON.stringify({data: funcData})

function buildDropDown(a, field) {
    var seen = {};
    return JSON.stringify({
        data: a.map((c) => c[field]).filter(function (item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        }).sort()
    });
}



var str = '';
for ( var key in funcData ) {
    str += '<th class="EmpId">' + key + '</th>';
}

var str = '';
for ( var key in funcData ) {
    str += '<td>{{ x.' + key + ' }}</td>';
}

function uniqJSON(data) {
    const result = [];
    data.map(currentRecord => {
        if ($.inArray(currentRecord, funcData))
            result.push(currentRecord);
    })
    return JSON.stringify({ data: result});
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}