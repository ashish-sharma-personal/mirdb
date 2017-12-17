functionData.map((x, i) => {
	const arr = x.target.split(' ');
	if (arr.length > 1) {
		x.target = arr[0];
		arr.map((ex, j) => {
			if (j > 0) {
                functionData.push(Object.assign({}, x, {target: ex}));
            }
        });
	}
})


function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    }).sort();
}

var str = '';
for ( var key in funcData ) {
    str += '<th class="EmpId">' + key + '</th>';
}

var str = '';
for ( var key in funcData ) {
    str += '<td>{{ x.' + key + ' }}</td>';
}