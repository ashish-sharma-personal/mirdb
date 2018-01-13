(function () {
	// var w;

	// function startWorker(rawData, callback) {
	// 	if (typeof (Worker) !== "undefined") {
	// 		if (typeof (w) === "undefined") {
	// 			w = new Worker("uniq_workers.js");
	// 		}
	// 		w.onmessage = function (event) {
	// 			callback(event.data);
	// 			stopWorker();
	// 		};
	// 		w.postMessage(rawData);
	// 	} else {
	// 		$('body').html("Sorry! Your browser is not supported. Use chrome instead.");
	// 	}
	// }
	// function stopWorker() {
	// 	w.terminate();
	// 	w = undefined;
	// }
	function sortByMIRNA(a, b) {
		var aName = a.miRNA_name.toLowerCase();
		var bName = b.miRNA_name.toLowerCase();
		return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
	}

	// function removeField(data, field) {
	// 	const result = [];
	// 	data.map(currentRecord => {
	// 		delete currentRecord[field];
	// 	})
	// 	return result;
	// }

	angular.module('cancerDb', [])

		.controller('tabCtrl', ['$scope', '$http', function ($scope, $http) {
			$scope.tab = 4;
			$scope.tableNo = 4;
			$scope.showExpDropDowns = false;
			$scope.dropArr = ['expression', 'marker', 'therapy', 'tumor_size', 'sample_type'];
			$scope.expression = {
				expressionDropValues: ["Differential Expression", "Downregulated", "No Significant Difference", "Panel", "Upregulated"],
				population: ["Australia", "Austria", "Austria and Czech Republic", "Brazil", "CAIRO study (ClinTrials.gov NCT00312000) of the Dutch Colorectal Cancer Group", "Canada", "Cell-line", "Chile", "China", "China and Japan", "China residing in Taiwan", "Colombia", "Czech Republic", "Denmark", "Egypt", "Finland", "Germany", "Germany and Greece", "Greece", "Hong Kong", "India", "Iran", "Ireland", "Israel", "Italy", "Italy and  UK and  Romania and  Austria", "Italy and USA", "Japan", "Korea", "Malaya", "N/A", "NCBI GEO", "Netherlands", "Netherlands and  Germany", "Norway", "Oita and Japan", "Paris", "Poland", "Portugal", "Rome and Italy", "Russia", "Singapore", "Slovak Republic", "South Korea", "Spain", "Sweden", "Sweden and Denmark", "TCGA Data", "Taiwan", "Tokyo", "Tokyo and Japan", "Tunisia", "Turkey", "UK", "USA", "USA and China", "USA and Hong Kong"],
				miRNADropValues: ["Family (miR-200a,200b,200c,miR-141)", "Family (miR-200a,200b,200c,miR-141,miR-429)", "Family (miR-200b,miR-200a,miR-429)", "Family (miR-34a,miR-34b,miR-34c)", "Panel (Let-7c miR-99a miR-125b)", "Panel (miR 21,135a, 335, 206 and let-7a)", "Panel (miR-1, miR-9, miR-124, and miR-137)", "Panel (miR-107, miR-21, miR-196a,\nmiR-26b, miR-9, miR-142-3p, miR-30b, miR-150, miR-191 and miR-17)", "Panel (miR-145, miR-106a and miR-17-3p)", "Panel (miR-16, miR-590-5p and miR-153)", "Panel (miR-16,miR-25,miR-92a,miR-451,miR-486-5p)", "Panel (miR-193a-3p, miR-23a and miR-338-5p)", "Panel (miR-19a-3p, miR-223-3p, miR-92a-3p and miR-422a)", "Panel (miR-200c and miR-18a)", "Panel (miR-20a, miR-130, miR-145, miR-216 and miR-372)", "Panel (miR-21, let-7g, miR-31, miR-92a, miR-181b, and miR-203)", "Panel (miR-21, miR-29c, miR-122, miR-192, miR-346, miR-372, and miR-374a)", "Panel (miR-21,miR-143, miR-148a, miR-194, miR-192, miR-200b, miR-200c, miR-10b, miR-26a, miR-145)", "Panel (miR-21-5p, miR-20a-5p, miR-103a-3p, miR-106b-5p, miR-143-5p, and miR-215)", "Panel (miR-23a-3p, miR-27a-3p, miR-142-5p and miR-376c-3p)", "Panel (miR-23b, miR-365-1 and miR-365-2)", "Panel (miR-29a and miR-92a)", "Panel (miR-342-3p, miR-361-3p, and miR-3621)", "Panel (miR-375, miR-424 and miR-92a)", "Panel (miR-409-3p, miR-7, and miR-93)", "Panel (miR-4299 and miR-196b)", "Panel (miR-519c-3p and miR-561)", "let-7a", "let-7a-5p", "let-7b", "let-7c", "let-7c-5p", "let-7d", "let-7d*", "let-7e", "let-7f", "let-7g", "miR-1", "miR-1-133a cluster", "miR-100", "miR-100-5p", "miR-101", "miR-101-2", "miR-103", "miR-103a", "miR-103a-3p", "miR-105", "miR-106", "miR-106a", "miR-106a*", "miR-106b", "miR-106b*", "miR-106b-25 cluster", "miR-107", "miR-10a", "miR-10a*", "miR-10b", "miR-10b-5p", "miR-1179", "miR-1184", "miR-1201", "miR-1207-5p", "miR-122", "miR-122*", "miR-1224-5p", "miR-1225-5p", "miR-1228*", "miR-1229", "miR-122a", "miR-1231", "miR-124", "miR-124-5p", "miR-1246", "miR-124a", "miR-125", "miR-1254", "miR-1258", "miR-1259", "miR-125a", "miR-125a-3p", "miR-125a-5p", "miR-125b", "miR-125b-1", "miR-125b-2", "miR-125b-2*", "miR-125b-5p", "miR-126", "miR-126*", "miR-1260b", "miR-1266", "miR-1269", "miR-127", "miR-127-3p", "miR-127-5p", "miR-1271", "miR-1274a", "miR-128", "miR-1280", "miR-1284", "miR-1287", "miR-1288", "miR-128b", "miR-129", "miR-129-1-3p", "miR-129-2", "miR-129-5p", "miR-1290", "miR-1291", "miR-1292", "miR-1294", "miR-1295b-3p", "miR-1296-5p", "miR-1297", "miR-129b", "miR-1303", "miR-1308", "miR-130a", "miR-130a-3p", "miR-130b", "miR-132", "miR-132-3p", "miR-1322", "miR-133", "miR-133a", "miR-133a-3p", "miR-133b", "miR-134", "miR-135a", "miR-135a-5p", "miR-135b", "miR-135b-5p", "miR-136", "miR-137", "miR-138", "miR-138-5p", "miR-139-3p", "miR-139-5p", "miR-140", "miR-140-5p", "miR-141", "miR-141*", "miR-141-3p", "miR-142-3p", "miR-143", "miR-143-145 cluster", "miR-143-3p", "miR-143-5p", "miR-144", "miR-144*", "miR-144-3p", "miR-145", "miR-145*", "miR-145-5p", "miR-1469", "miR-146a", "miR-146a-5p", "miR-146b", "miR-147b", "miR-148", "miR-148-3p", "miR-148a", "miR-148b-3p", "miR-149", "miR-150", "miR-150*", "miR-151", "miR-151-3p", "miR-151-5p", "miR-152", "miR-153", "miR-154", "miR-155", "miR-155-5p", "miR-15a", "miR-15b", "miR-15b-5p", "miR-16", "miR-16-1", "miR-16-5p", "miR-17", "miR-17*", "miR-17-3p", "miR-17-5p", "miR-17-92 cluster", "miR-181a", "miR-181a-5p", "miR-181b", "miR-181c", "miR-181c-3p", "miR-181d", "miR-182", "miR-182-5p", "miR-1826", "miR-1827", "miR-183", "miR-183-5p", "miR-185", "miR-186", "miR-186*", "miR-187", "miR-188-3p", "miR-18a", "miR-18b", "miR-19-b-3p", "miR-190", "miR-190b", "miR-191", "miR-191-5p", "miR-192", "miR-192-5p", "miR-193-3p", "miR-193a-3p", "miR-193a-5p", "miR-193b", "miR-193b-3p", "miR-194", "miR-194-5p", "miR-195", "miR-195-5p", "miR-196a", "miR-196a-5p", "miR-196b", "miR-196b*", "miR-196b-5p", "miR-197", "miR-1973", "miR-198", "miR-1995p", "miR-199a-3p", "miR-199a-5p", "miR-199b", "miR-19a", "miR-19a-3p", "miR-19b", "miR-19b-1", "miR-19b-5p", "miR-20", "miR-200", "miR-200C", "miR-200a", "miR-200a*", "miR-200a-3p", "miR-200a-5p", "miR-200b", "miR-200b-3p", "miR-200c", "miR-200c-3p", "miR-202", "miR-203", "miR-203a", "miR-203b", "miR-204", "miR-204-5p", "miR-205", "miR-205-5p", "miR-206", "miR-208", "miR-20a", "miR-20a*", "miR-20a-5p", "miR-20b", "miR-21", "miR-21-3p", "miR-21-5p", "miR-210", "miR-211", "miR-212", "miR-214", "miR-215", "miR-217", "miR-218", "miR-219-5p", "miR-22", "miR-221", "miR-221-5p", "miR-222", "miR-222-3p", "miR-223", "miR-223-3p", "miR-224", "miR-2392", "miR-23a", "miR-23a-3p", "miR-23b", "miR-23b-3p", "miR-24", "miR-24-2*", "miR-24-3p", "miR-25", "miR-25-3p", "miR-26a", "miR-26a-5p", "miR-26b", "miR-27", "miR-27a", "miR-27a-3p", "miR-27a-5p", "miR-27b", "miR-28-5p", "miR-29", "miR-296", "miR-298", "miR-299-5p", "miR-29a", "miR-29a*", "miR-29a-3p", "miR-29b", "miR-29b-2*", "miR-29b-3p", "miR-29c", "miR-3", "miR-300", "miR-301a", "miR-301a-3p", "miR-301b", "miR-302a-3p", "miR-302b", "miR-30a", "miR-30a-5p", "miR-30b", "miR-30b-5p", "miR-30c-1*", "miR-30d", "miR-30e-5p", "miR-31", "miR-31-3p", "miR-31-5p", "miR-3144-3p", "miR-3151", "miR-3163", "miR-3177", "miR-3180-3p", "miR-32", "miR-320", "miR-320a", "miR-320b", "miR-320c", "miR-320d", "miR-320e", "miR-324-3p", "miR-326", "miR-328", "miR-329", "miR-330-3p", "miR-330-5p", "miR-331", "miR-331-3p", "miR-335", "miR-337-3p", "miR-338", "miR-338-3p", "miR-338-5p", "miR-339", "miR-339-5p", "miR-33a", "miR-33b", "miR-34", "miR-340", "miR-342", "miR-345", "miR-34a", "miR-34a*", "miR-34a-5p", "miR-34b", "miR-34b/c", "miR-34c", "miR-34c-5p", "miR-361-5p", "miR-362", "miR-362-3p", "miR-3622a-5p", "miR-363-3p", "miR-3651", "miR-3651-5p", "miR-3656", "miR-367", "miR-370", "miR-371-5p", "miR-371b-3p", "miR-372", "miR-373", "miR-374a", "miR-374b", "miR-374b-5p", "miR-375", "miR-376a", "miR-377", "miR-378", "miR-378*", "miR-378-5p", "miR-378a", "miR-378a-3p", "miR-378a-5p", "miR-378c", "miR-381", "miR-382", "miR-383", "miR-384", "miR-409-3p", "miR-410", "miR-412-3p", "miR-421", "miR-422a", "miR-423-3p", "miR-423-5p", "miR-424", "miR-424-3p", "miR-424-5p", "miR-425", "miR-425-3p", "miR-425-5p", "miR-4269", "miR-4282", "miR-429", "miR-4299", "miR-431", "miR-4316", "miR-4317", "miR-432*", "miR-432-3p", "miR-4326", "miR-433", "miR-4463", "miR-4478", "miR-448", "miR-449a", "miR-449c", "miR-4506", "miR-450a", "miR-450b-5p", "miR-451", "miR-451a", "miR-452", "miR-4539", "miR-455", "miR-455-3p", "miR-455-5p", "miR-4775", "miR-4787-5p", "miR-483", "miR-483-3p", "miR-483-5p", "miR-484", "miR-485-3p", "miR-485-5p", "miR-486-3p", "miR-486-5p", "miR-487b", "miR-488", "miR-489", "miR-490-3p", "miR-491", "miR-491-3p", "miR-491-5p", "miR-492", "miR-494", "miR-495", "miR-497", "miR-497-5p", "miR-498", "miR-500", "miR-5000-3p", "miR-5009-3p", "miR-503", "miR-506", "miR-508-3p", "miR-509-3p", "miR-510", "miR-511", "miR-513", "miR-513a-5p", "miR-513b", "miR-515-5p", "miR-517a", "miR-518b", "miR-518e*", "miR-519", "miR-519a*", "miR-519b-5p", "miR-519c-5p", "miR-519d", "miR-519e*", "miR-520b", "miR-520c", "miR-520d-3p", "miR-520e", "miR-522*", "miR-523*", "miR-524-5p", "miR-526c", "miR-532", "miR-532-3p", "miR-542-3p", "miR-544a", "miR-548ah-5p", "miR-548c-3p", "miR-549", "miR-551a", "miR-552", "miR-561", "miR-564", "miR-566", "miR-5692b", "miR-5704", "miR-573", "miR-574-3p", "miR-575", "miR-577", "miR-579", "miR-582-5p", "miR-584-3p", "miR-584-5p", "miR-590-5p", "miR-592", "miR-596", "miR-601", "miR-610", "miR-612", "miR-613", "miR-615-3p", "miR-622", "miR-625", "miR-625-3p", "miR-628-3p", "miR-628-5p", "miR-630", "miR-638", "miR-640", "miR-645", "miR-647", "miR-652", "miR-655", "miR-660-5p", "miR-663", "miR-663b", "miR-664-3p", "miR-6826", "miR-6875", "miR-7", "miR-7-2*", "miR-718", "miR-720", "miR-744", "miR-760", "miR-765", "miR-768-5p", "miR-802", "miR-874", "miR-885-5p", "miR-886-3p", "miR-886-5p", "miR-9", "miR-9*", "miR-9-1", "miR-9-3p", "miR-92", "miR-92a", "miR-92a-1", "miR-92a-3p", "miR-92b-3p", "miR-93", "miR-93-5p", "miR-935", "miR-938", "miR-939", "miR-940", "miR-942", "miR-944", "miR-96", "miR-96-5p", "miR-98", "miR-99a", "miR-99a*", "miR-99a-3p", "miR-99b-3p", "miR-l195", "miRPlus-A1087", "miRPlus-C1110", "miRPlus-E1016", "miRPlus-E1033", "miRPlus-E1067", "miRPlus-E1101", "miRPlus-E1172", "miRPlus-E1173", "miRPlus-E1192", "miRPlus-E1238", "miRPlus-E1285", "miRPlus-F1026", "miRPlus-F1027", "miRPlus-F1155", "miRPlus-F1215"],
				sampleDropValues: ["Blood", "Cell line", "GEO Dataset", "Gastric Juice", "Mouse Model", "Plasma", "Saliva", "Serum", "Stool", "TCGA Dataset", "Tissue", "Urine"]
			};
			$scope.function = {
				miRNADropValues: ["Let-7", "Let-7a", "anti-miR21", "ebv-miR-BART4-5p", "f", "let-7", "let-7a", "let-7c", "let-7d-3p", "let-7d-5p", "let-7i", "let7g", "miR- 324-5p", "miR-1", "miR-100", "miR-101", "miR-101-2", "miR-103", "miR-103/107", "miR-103a", "miR-105", "miR-106", "miR-106*", "miR-106a", "miR-106a/b", "miR-106b", "miR-107", "miR-10a", "miR-10b", "miR-1179", "miR-1182", "miR-1207-5p", "miR-122", "miR-1225-5p", "miR-1228", "miR-1228*", "miR-122a", "miR-124", "miR-124-5p", "miR-1247", "miR-124a", "miR-1258", "miR-125a", "miR-125a-3p", "miR-125a-5p", "miR-125a/b", "miR-125b", "miR-125b-2", "miR-126", "miR-1266", "miR-1269", "miR-127", "miR-127-3p", "miR-1271", "miR-1274a", "miR-128", "miR-1280", "miR-1284", "miR-128b", "miR-129", "miR-129-1-3p", "miR-129-2", "miR-129-5p", "miR-1290", "miR-1291", "miR-1294", "miR-1296-5p", "miR-1297", "miR-130", "miR-1303", "miR-130a", "miR-130b", "miR-132", "miR-132-3p", "miR-1322", "miR-133a", "miR-133b", "miR-134", "miR-135a", "miR-135a-5p", "miR-135b", "miR-135b-5p", "miR-136", "miR-137", "miR-138", "miR-138-5p", "miR-139", "miR-139-5p", "miR-140", "miR-140-5p", "miR-141", "miR-141-3p", "miR-142-3p", "miR-142-5p", "miR-143", "miR-143-3p", "miR-143-5p", "miR-144", "miR-144-3p", "miR-145", "miR-145-5p", "miR-145a", "miR-146a", "miR-146a-5p", "miR-146b", "miR-146b-5p", "miR-148-3p", "miR-148a", "miR-148b", "miR-149", "miR-150", "miR-150-3p", "miR-150-5p", "miR-151-5p", "miR-152", "miR-153", "miR-154", "miR-155", "miR-155-5p", "miR-15a", "miR-15a-3p", "miR-15b", "miR-15b-5p", "miR-16", "miR-16-1", "miR-16-1-3p", "miR-17", "miR-17-5p", "miR-17/20a", "miR-17~92", "miR-181a", "miR-181a-5p", "miR-181b", "miR-181b-1", "miR-181c", "miR-181d", "miR-182", "miR-182-3p", "miR-1827", "miR-183", "miR-183-5p", "miR-185", "miR-186", "miR-187", "miR-188-3p", "miR-18a", "miR-18b", "miR-19", "miR-190b", "miR-191", "miR-1914*", "miR-1915", "miR-192", "miR-193-3p", "miR-193b", "miR-194", "miR-195", "miR-195-5p", "miR-196a", "miR-196a-5p", "miR-196b", "miR-197", "miR-198", "miR-1995p", "miR-199a", "miR-199a-3p", "miR-199a-5p", "miR-199b", "miR-19a", "miR-19a-3p", "miR-19a/b", "miR-19b", "miR-200", "miR-200C", "miR-200a", "miR-200a-3p", "miR-200b", "miR-200b/c", "miR-200c", "miR-200c-3p", "miR-202", "miR-202-3p", "miR-203", "miR-204", "miR-204-5p", "miR-205", "miR-206", "miR-208", "miR-208a-3p", "miR-20a", "miR-20a-5p", "miR-20a/b", "miR-20b", "miR-21", "miR-210", "miR-211", "miR-211-3p", "miR-212", "miR-214", "miR-214-3p", "miR-215", "miR-216a", "miR-216a-3p", "miR-216b", "miR-217", "miR-218", "miR-218-5p", "miR-219-2-3p", "miR-219-5p", "miR-22", "miR-221", "miR-221*", "miR-222", "miR-223", "miR-224", "miR-2392", "miR-23a", "miR-23b", "miR-23b-3p", "miR-24", "miR-24-3p", "miR-25", "miR-26a", "miR-26b", "miR-27", "miR-27a", "miR-27a*", "miR-27b", "miR-28-3p", "miR-28-5p", "miR-29", "miR-296", "miR-296-5p", "miR-297", "miR-298", "miR-29a", "miR-29a-3p", "miR-29b", "miR-29c", "miR-29c-3p", "miR-30", "miR-300", "miR-301", "miR-301a", "miR-302", "miR-302b", "miR-30a", "miR-30a-5p", "miR-30b", "miR-30b-5p", "miR-30d", "miR-31", "miR-31-5p", "miR-32", "miR-320", "miR-320 family", "miR-320a", "miR-320b", "miR-320d", "miR-324-5p", "miR-326", "miR-328", "miR-329", "miR-330", "miR-330-3p", "miR-330-5p", "miR-331-3p", "miR-335", "miR-337-3p", "miR-338", "miR-338-3p", "miR-338-5p", "miR-339", "miR-339-5p", "miR-33a", "miR-33b", "miR-33b-5p", "miR-34", "miR-340", "miR-342", "miR-34a", "miR-34b", "miR-34c", "miR-34c-5p", "miR-361-5p", "miR-362", "miR-362-3p", "miR-363", "miR-363-3p", "miR-365", "miR-367", "miR-370", "miR-371-5p", "miR-372", "miR-373", "miR-373-3p", "miR-374a", "miR-374b-5p", "miR-375", "miR-376c-3p", "miR-377", "miR-377-3p", "miR-378", "miR-378-5p", "miR-378a-3p", "miR-378a-5p", "miR-381", "miR-382", "miR-384", "miR-3978", "miR-409-3p", "miR-410", "miR-421", "miR-422a", "miR-423-2p", "miR-423-3p", "miR-423-5p", "miR-424", "miR-424-5p", "miR-425", "miR-425-5p", "miR-4269", "miR-4282", "miR-429", "miR-4317", "miR-432-3p", "miR-433", "miR-4443", "miR-448", "miR-449", "miR-449a", "miR-449c", "miR-450b-5p", "miR-451", "miR-451a", "miR-454", "miR-455", "miR-455-3p", "miR-455-5p", "miR-4728-3p", "miR-4775", "miR-483-3p", "miR-485-3p", "miR-485-5p", "miR-486-5p", "miR-487b", "miR-488", "miR-489", "miR-490-3p", "miR-491", "miR-491-5p", "miR-492", "miR-493", "miR-494", "miR-495", "miR-497", "miR-498", "miR-499", "miR-499-5p", "miR-499a", "miR-500", "miR-502", "miR-503", "miR-504", "miR-505c-5p", "miR-506", "miR-508", "miR-508-3p", "miR-508-5p", "miR-511", "miR-513b", "miR-518a-5p", "miR-518b", "miR-519", "miR-519c", "miR-519d", "miR-520a", "miR-520a-3p", "miR-520b", "miR-520c", "miR-520d-3p", "miR-520e", "miR-520g", "miR-522", "miR-524-5p", "miR-532", "miR-532-5p", "miR-539", "miR-542-3p", "miR-543", "miR-544", "miR-544a", "miR-551a", "miR-552", "miR-5582-5p", "miR-561", "miR-564", "miR-573", "miR-574-3p", "miR-574-5p", "miR-577", "miR-582-5P", "miR-582-5p", "miR-584-3p", "miR-584-5p", "miR-587", "miR-590-5p", "miR-592", "miR-593*", "miR-598", "miR-600", "miR-610", "miR-612", "miR-613", "miR-622", "miR-625", "miR-625-3p", "miR-627", "miR-630", "miR-634", "miR-638", "miR-645", "miR-647", "miR-650", "miR-655", "miR-655-3", "miR-675", "miR-7", "miR-708", "miR-744", "miR-760", "miR-766", "miR-771", "miR-874", "miR-885-5p", "miR-889", "miR-9", "miR-9-3p", "miR-92a", "miR-92a-3p", "miR-92b", "miR-93", "miR-935", "miR-939", "miR-940", "miR-941", "miR-942", "miR-944", "miR-95", "miR-96", "miR-98", "miR-99a", "miR-let-7a", "miR-let-7d", "miR145", "miR200s", "miR27a", "miRs-222", "miR‑101", "miR‑133b", "miR‑141", "miR‑155", "miR‑185", "miR‑195", "miR‑224", "miR‑302a", "miR‑409-3p", "miR‑590‑3p", "mir-101", "mir-29a", "mir-339", "mir-345", "mir-486-5p"],
				functionDropValues: ["Adenoma to adenocarcinoma progression", "Adenoma to carcinoma progression", "Adenoma-to-adenocarcinoma-progression", "Adhesion", "Adhesions", "Aggressiveness", "Angiogenesis", "Angiogenesisin", "Anoikis", "Apoptosis", "Autophagy", "Cell cycle", "Cell cycle arrest", "Cell division", "Chemoradiotherapy", "Chemoresistance", "Chemosensitivity", "Clonogenicity", "Colony formation", "Cytoskeletal remodeling", "Cytotoxicity", "DNA repair", "Differentiation", "EMT", "Growth", "Growth Signaling", "Homeostasis", "Hypoxia", "Intravasation", "Invasion", "MET", "Malignant", "Metabolism", "Metastasis", "Metastatis", "Migration", "Migrationi", "Morphology", "Motility", "Necrosis", "OncomiR", "Outgrowth", "Pathway", "Polarization", "Progression", "Proliferation", "Protrusion", "Radaiosensitivity", "Radioresistance", "Radiosensitivity", "Replacement therapy", "Self renewal", "Senescence", "Signaling", "Sphere formation", "Stemness", "Supressor", "Survival", "Transformation", "Tumor", "Tumor suppressor", "Tumorigenesis", "Tumorigenicity", "Viability", "Wound healing"],
				targetDropValues: ["14-3-3zeta", "A2bR", "ABCA1", "ABCB1", "ABCB5", "ABCC5", "ABCF1", "ABCG1", "ABCG2", "ABL-1", "ACLY", "ACTG1", "ADAM10", "ADAM17", "ADAM28", "ADAM9", "AEG1", "AKAP1", "AKT", "AKT2", "ALDH1A3", "ALOX5", "AMFR", "AMPK", "ANGPTL2", "ANK2", "ANO1", "ANUBL1", "ANXA1", "AP2α", "APAF1", "APC", "APC and TGFβR2", "APC2", "APIP", "APPL1", "AQP3", "ARC", "ARL5A", "ATG12", "ATG16L1", "ATG5", "ATM", "AXIN2", "AXL", "Akt", "Akt2", "Annexin1", "Artemin", "Axin2", "BAG1", "BAG3", "BAMBI", "BAX", "BCL2", "BCL2L11", "BCL3", "BCL9L", "BCLw", "BDKRB2", "BDNF", "BID", "BIM", "BIRC5", "BMI1", "BNIP2", "BRAF", "BTBD3", "BTG1", "BTG2", "Bak1", "Bax", "Bcl-XL", "Bcl2", "Bcorl1", "Beclin1", "C-Myc", "CAB39", "CAC1", "CACUL1", "CADM1", "CAPNS1", "CAPS", "CARD10", "CARM1", "CARM2", "CASK", "CAT1", "CAV1", "CBX7", "CCDN1", "CCKR2", "CCL20", "CCNB1", "CCND", "CCND1", "CCND2", "CCNG2", "CCR6", "CCkBR", "CD133", "CD147", "CD151", "CD24", "CD276", "CD44", "CD47", "CD73", "CD82", "CDC25B", "CDC40", "CDC42", "CDH1", "CDH1 and NFAT5", "CDH2", "CDK2", "CDK4", "CDK6", "CDK9", "CDKI1A (P21WAF1/CIP1)", "CDKN1A", "CDKN1B (p27/kip1)", "CDKN1C/P57", "CDKN1C/p57", "CDKN2B", "CDS2", "CDX1", "CDX2", "CHD5", "CK2A2", "CKIIα", "CLDN18", "CLPTMIL", "CND1", "COL1A2", "COPS2", "COPS8", "COX2", "CPEB2", "CPM", "CRAM3", "CRCT1", "CREB1", "CRKL", "CRMP1", "CRMP4", "CRY2", "CSF1", "CTGF", "CTNNB1", "CTNND1", "CUG-BP1", "CUL2", "CUL4A", "CX43", "CXCR4", "CXCR7", "CYLD", "CYP7B1", "CYR61", "CaSR", "Cacna1c", "Caspase-3", "Caspase-3 gene", "Caveolin-1", "Cdc25A", "Cdx2", "Cpeb4", "Crk", "Cuedc2", "Cycld", "Cyclin D1", "Cyclin D2", "Cyclin G1", "CyclinE", "DAB2IP", "DACT3", "DAPK", "DAPK1 and FIH", "DCLK1", "DCN", "DCP2", "DCUN1D1", "DDR1", "DERL1", "DHFR", "DICER", "DICER1", "DIMT1", "DIP1", "DIXDC1", "DKK1", "DKK2", "DLC1", "DNA polymerase beta", "DNMT1", "DNMT3A", "DNMT3B", "DPYD", "DTL", "DYRK2", "E-Cadherin", "E-cadherin", "E2F1", "E2F2", "E2F3", "E2F5", "ECOP", "ECRG2", "EDN1", "EGFR", "EGFR1", "EGR2", "EHF", "EI24", "EIF4A1", "EIF5A2", "EMP1", "ENTPD5", "EP4", "EPB41L3", "ERBB2", "ERBB3", "ERBB4", "ERG", "ERK", "ERK2", "ERK5", "ETS1", "ETS1 and FLT1", "EZH2", "EphA2", "EphB3", "Erzin", "Est1", "F-box", "FAK", "FAM83F", "FAS", "FASL", "FASLG", "FBX8", "FBXL3", "FBXO31", "FBXW7", "FGF9", "FGFR1", "FGFRL1", "FHL1", "FIH1", "FLI1", "FLOT1", "FLOT2", "FMNL2", "FMNL3", "FN1", "FOS", "FOXA1", "FOXM1", "FOXO1", "FOXO1A", "FOXO3a", "FOXO4", "FOXQ1", "FRA1", "FRAT1", "FSCN1", "FUT4", "FUT5", "FUT6", "FUT8", "FZD7", "FZD7 and MAP3K1 (MEKK1) and PAK2 and TGFβR2 and RRAS2 and Upa", "FZD8", "Fas", "Fascin-1", "Fibronectin-1", "Flot1", "Flot2", "Fox01", "FoxM1", "FoxO3A", "Foxo3", "Fra1", "GAB1", "GABBR1", "GATA6", "GNA13", "GOLPH3", "GPC5", "GPR98", "GRB2", "GSK3beta", "GSK3β", "GSPT1", "Gli1", "Gli2", "GzmB", "HAI1", "HBP1", "HDAC4", "HDAC8", "HDGF", "HER2", "HIF1α", "HIF2α", "HK2", "HMGA1", "HMGA2", "HMGB1", "HMGB2", "HMGB3", "HMGXB3", "HOXA1", "HOXA10", "HOXB3", "HOXC10", "HOXD10", "HP1γ", "HPSE", "HS3ST2", "HSF2", "HSPC159", "Hakai", "HoxA7", "HoxB8", "HoxC8", "HoxD8", "Hoxd10", "ICAM1", "IFIT2", "IGF1R", "IGF2R", "IGFIR", "IL6", "IL6R", "ILK", "ING1", "ING4", "INPP5J", "IQGAP2", "IRF1", "IRF2", "IRS1", "IRS2", "IRX1", "ITGA5", "ITGAV", "ITGB1", "ITGΒ4", "Itk", "JAG1", "JAK1", "JAK2", "JAk1", "JMJD1A", "JNK2", "Jag1", "KDM2A", "KDM2B", "KDM5B", "KEAP1", "KIAA1199/CEMIP", "KIF13B", "KIF23", "KIFC1", "KIP1", "KITENIN", "KITLG", "KLF12", "KLF4", "KLF5", "KLF6", "KLK6", "KPNA2", "KRAS", "KRT5", "KSR2", "Kcna1", "Kindlin-2", "Kip1", "Klotho", "L1CAM", "LAMA1", "LAMC1", "LAMC2", "LAMP2", "LASP1", "LAT1", "LATS2", "LDHA", "LDHA and YY1", "LDHB", "LEF1", "LKB1", "LMTK3", "LRH-1", "LRP6", "Lgr5", "MACC1", "MALAT1", "MAML3", "MAP2K4", "MAP3K11", "MAP3K9", "MAP4K4", "MAPK", "MAPK1", "MAPK4", "MAPK8IP1", "MAPT", "MBD2", "MBP1/alpha enolase", "MCC", "MCL1", "MDM2", "ME1", "MED19", "MET", "MIA3", "MIF", "MKK7", "MLLT4", "MMP11", "MMP13", "MMP14", "MMP16", "MMP2", "MMP7", "MMP9", "MSH6", "MSI1", "MTA2", "MTDH", "MTMR3", "MTSS1", "MTUS1", "MUC1", "MUC13", "MUC4", "MXD1", "MYCBP", "MYCN", "MYH9", "MYST3", "Map3k2", "Mcl1", "MeCP2", "MnSOD", "Myosin1", "N-Cadherin", "N-cadherin", "NCOA1", "NDRG2", "NDST1", "NEDD9", "NELL2 and OGN and HNRPH", "NEU1", "NF1", "NFIX", "NFKB", "NFKBIB", "NFkB", "NFkB1", "NIRF", "NKD1", "NLK", "NM23-H1", "NOB1", "NOTCH1", "NOTCH2", "NOTCH3", "NOVA1", "NR2F2", "NR5A2", "NRAS", "NRP1", "NT5E", "Nampt", "Neuropilin-2", "Notch ligand JAG2", "Notch2", "Noxa", "Nrdp1", "OPA1", "OTUD7B", "Orai1", "P-REX2a", "P130", "P21", "P70s6k1", "PAI1", "PAK4", "PAM", "PAQR3", "PARP", "PARP1", "PAX3", "PAX6", "PBX3", "PDCD10", "PDCD2", "PDCD4", "PDE4D", "PDGFRB", "PDGFRα", "PDGFRβ", "PDHB", "PDHX", "PDK1", "PDL1", "PDLIM2", "PER3", "PHF10", "PHLDB2", "PHLPP1", "PHLPP2", "PI3K", "PI3K/Akt", "PIAS3", "PIK3CA", "PIK3CB", "PIK3CD", "PIK3R2", "PIK3R3", "PIM1", "PKM2", "PLCE1`", "PLD1", "PLEKHG6", "PLK1", "PPARD", "PPARα", "PPARγ", "PPIC", "PPP2CA", "PPP2R1B", "PPP2R5E", "PPP2RIB", "PRL1", "PRL3", "PROX1", "PRRX1", "PSAT1", "PTB1", "PTBP1", "PTEN", "PTGER2", "PTK6", "PTP4A", "PTPN1", "PTTG1", "PXN", "Paxillin", "Pgp", "Prdx6", "Prf1", "Prox1", "QKI", "Qki6/7/7b", "RAB12", "RAB14", "RAB18", "RAB22A", "RAB23", "RAB34", "RAC1", "RAF1", "RAGE", "RAP1B", "RAS", "RASA1", "RASSF1A", "RASSF6", "RASSFA", "RB", "RB1", "RBMXL1", "RBP2", "RBX1", "RCC2", "RD18", "RDX", "RECK", "RELA", "RERE", "RFFL", "RGS4", "RKIP", "RND3", "RND3 (RhoE)", "ROBO1", "ROCK1", "RON", "RPUSD2", "RTKN", "RUNX1", "RUNX3", "Rab1B", "Rab23", "Rab27a", "Ran", "Rap1B", "Rb", "RegIV", "RhoA", "RhoA/ROCK", "RhoB", "RhoBTB1", "Rictor", "Robo1", "Rspo2", "S100A4", "S100A9", "SALL4", "SATB2", "SCAI", "SEMA4F", "SFPQ and MYBL2", "SFRP1", "SFRP2", "SGPP1", "SGPP2", "SHC1", "SHOX2", "SIAH1", "SIK2", "SIP1", "SIRT1", "SIX1", "SKP2", "SLC25A4", "SLC34A2", "SLC4A4", "SLC75A", "SLIT2", "SMAD2", "SMAD3", "SMAD4", "SMAD4 and CDH1", "SMAD7", "SMARCD1", "SMC4", "SMO", "SNAI1", "SNAI2", "SND1", "SNX1", "SOCS1", "SOCS2", "SOCS6", "SOX13", "SOX17", "SOX2", "SOX4", "SOX6", "SOX7", "SOX9", "SP1", "SPHK1", "SPOCK1", "SPRR2C", "SPRY2", "SRCIN1", "SRF", "SRPX2", "ST6GALNAC2", "STARD13", "STAT1", "STAT3", "STAT4", "STMN1", "STOML-2", "SUFU", "Sema3E", "Serpini1", "Sirt1", "Six1", "Slug", "Smad2", "Smad4", "Smad7", "Smurf1", "Snail", "Snail1", "Snail2", "Sox4", "Sp1", "Sp2", "SphK1", "Spry2", "Src", "Survivin", "TAGLN2", "TAX1BP1", "TAZ", "TAp63", "TBPL1", "TCF1", "TEAD1", "TEAD4", "TF", "TFAM", "TFF1", "TG2", "TGFβ/SMAD", "TGFβ2", "TGFβR2", "THBS1", "THBS2", "TIA1", "TIAM1", "TIMP1", "TIMP2", "TIMP3", "TLE1", "TLE4", "TLR2", "TM4SF1", "TNFAIP1", "TNFAIP3", "TNFα", "TOB1", "TOM1", "TP53", "TP53INP1", "TPX2", "TRAF4", "TRAF5", "TRIM24", "TRIM41", "TSC1", "TSGA10", "TSP1", "TSPAN1", "TSPAN5", "TWIST1", "TWIST2", "TYMS", "Tgif2", "Tle4", "TrkC", "UBE2C", "UBE2N", "UHRF1", "UPC2", "USF2", "USP47", "UVRAG", "VASP", "VEGF", "VEGFA", "VEGFC", "VEGFR2", "VLDLR", "VMP1", "Vimentin", "WASF2", "WASF3", "WHSC", "WIF1", "WWP1", "Wnt", "Wnt1", "Wnt3", "Wnt3a", "XIAP", "XRCC2", "XRCC3", "YAP1", "YBX1", "YEATS4", "YES", "YY1", "ZBTB10", "ZBTB2", "ZBTB7A", "ZDHHC1", "ZEB1", "ZEB2", "ZHX1", "ZNF217", "ZNF24", "ZNF281", "ZNF322", "ZNRD1", "ZO1", "Zeb2", "c-Kit", "c-MET", "c-MYC", "c-Met", "c-Myb", "c-Myb.", "c-Myc", "c-myc", "caspase-3", "caspase-7", "caspase-8", "caspase2", "catenin δ", "catenin δ-1", "claudin-1", "cortactin", "eIF4A1", "eIF4E", "hCdc4", "hMLH1", "hMLH1 and hMSH2 and Hmsh6", "hMSH2", "hMSH6", "hTERT", "hnRNAPA1", "hnRNAPA2", "hnRNP-A1", "hnRNPA1", "iASPP", "inhibitor of NF-kappa B kinase subunit epsilon", "integrin α5", "integrin β1", "kip1", "legumain", "lncRNA PRINS", "mTOR", "p21", "p21Cip1/Waf1", "p27", "p27Kip1", "p27kip1", "p42.3", "p53", "p85β", "pro-caspase-3", "progestin", "prohibitin", "sFRP4", "snail1", "survivin", "vimentin", "α-catenin", "β-Catenin", "β-catenin", "∆Np63"]
			};
			$scope.snp = {
				miRNADropValues: ["let-7 binding site", "miR-100", "miR-107", "miR-107 Promoter", "miR-1307", "miR-146", "miR-146a", "miR-149", "miR-181a", "miR-196A2", "miR-196a", "miR-196a2", "miR-196a3", "miR-218", "miR-219-1", "miR-25", "miR-27a", "miR-3190-5p binding site in ABCC4", "miR-330-3p binding site", "miR-34b/c", "miR-367 binding site", "miR-423", "miR-4293", "miR-449b", "miR-499", "miR-499a", "miR-502 binding Site in SET8", "miR-520a binding site", "miR-542-3p", "miR-603", "miR-605", "miR-608", "miR-92a", "miR-933", "miR-938", "miR-let-7a", "miR196A2", "miRNA _binding site in ITGB3", "miRNA_binding site in  INSR", "miRNA_binding site in CD86", "miRNA_binding site in ITGB1", "miRNA_binding sites of nucleotide excision repair gene  RPA2", "miRNA_binding sites of nucleotide excision repair gene GTF2H1", "mir-146a", "mir-149", "mir-196a2", "mir-492", "mir-499", "pre-miR-27a", "pre-miR-353", "pre-miR-423", "pre-miR-608", "pri-miR-100", "pri-miR-124", "pri-miR-34b/c", "pri-miR26a-1", "promoter region of miR-143/145"],
				populationDropValues: ["Cancer Surveillance and Registry System", "China", "Czech Republic", "Europe", "Greece", "Greek", "Iran", "Italy", "Japan", "Korea", "Meta-analysis", "Netherlands", "Romania", "Romanian population", "Southern Hans Chinese", "Spain", "USA", "subjects of European ancestry recruited through EPICOLON I/II projects at Spain and USA"],
				snpDropValues: ["196a2C>T", "KRAS let-7 LCS6", "T8473C", "rs10001133", "rs1044129", "rs1051690", "rs1052918", "rs107822", "rs11014002", "rs11134527", "rs11185777", "rs112310158", "rs11614913", "rs11671784", "rs12220909", "rs12537", "rs12997", "rs141178472", "rs1614913", "rs16917496", "rs17281995", "rs17468", "rs17796757", "rs1834306", "rs2043556", "rs213210", "rs2289030", "rs2292832", "rs2296616", "rs2317676", "rs2505901", "rs2690164", "rs2910164", "rs35010275", "rs353292", "rs353293", "rs3733845", "rs3733846", "rs3742106", "rs374644", "rs3746444", "rs4127422", "rs41291957", "rs4596", "rs4705341", "rs4705343", "rs4919510", "rs4938723", "rs531564", "rs629367", "rs6505162", "rs67687202", "rs712", "rs7356", "rs7372209", "rs78591545", "rs7911488", "rs79402775", "rs895819", "rs9589207"]
			};
			$scope.functionDropArr = ['function', 'target'];

			// hide/show columns for expression tab results
			$scope.showMarker = true;
			$scope.showMarkerDetail = true;
			$scope.showTherapy = true;
			$scope.showTherapyDetail = true;
			$scope.showTumorSize = true;
			$scope.showTumorSizeDetail = true;
			$scope.showExpression = true;
			$scope.showExpressionDetail = true;
			$scope.showCancer = true;
			$scope.showPopulation = true;
			$scope.showSample = true;
			$scope.showSignificance = true;
			$scope.showDetectionMethod = true;

			// hide/show columns for function tab results
			$scope.showFuncCancer = true;
			$scope.showFuncCellLine = true;
			$scope.showFuncTargetDetails = true;
			$scope.showFuncTechnique = true;
			$scope.showFuncFunction = true;

			$scope.setTab = function (tabId) {
				$scope.tab = tabId;
				$scope.setTable(4);
			}

			$scope.isSet = function (tabId) {
				return $scope.tab === tabId;
			}

			$scope.selectTab = function (index) {
				$scope.selectedTab = index;
			}

			$scope.isTable = function (tableId) {
				return $scope.tableNo == tableId;
			}

			$scope.setTable = function (tableId) {
				$scope.tableNo = tableId;
			}

			$scope.funcCancerSelected = function () {
				$('#funcDropdowns').find('select').prop('disabled', false);
				this.RNA2 = { cancer: this.RNA2.cancer };
				if (this.RNA2.cancer !== "") {
					$scope.showFuncDropdowns = true;
				}
				else {
					$scope.showFuncDropdowns = false;
				}
			}

			$scope.cancerSelected = function () {
				$('#dropdownsLabel').find('select').prop('disabled', false);
				this.exp2 = { cancer: this.exp2.cancer };
				if (this.exp2.cancer !== "") {
					$scope.showExpDropDowns = true;
				}
				else {
					$scope.showExpDropDowns = false;
				}
			}

			$scope.oneSelector = function (val, id) {
				var index = $scope.dropArr.indexOf(id);
				if (val == "" || val == undefined) {
					$("#btSubmit").prop('disabled', true);
					$('#dropdownsLabel').find('select').prop('disabled', false);
				} else {
					$("#btSubmit").prop('disabled', false);
					$('#dropdownsLabel').find('select').prop('disabled', true);
					$('#dropdownsLabel').find('select')[index].disabled = false;
				}
			}

			$scope.functiononSelector = function (val, id) {
				var index = $scope.functionDropArr.indexOf(id);
				if (val == "" || val == undefined) {
					$("#functionbtSubmit").prop('disabled', true);
					$('#functionDropdowns').find('select').prop('disabled', false);
				} else {
					$("#functionbtSubmit").prop('disabled', false);
					$('#functionDropdowns').find('select').prop('disabled', true);
					$('#functionDropdowns').find('select')[index].disabled = false;
				}
			}

			$scope.searchQuery = function (formData) {
				if ($scope.tab == "2") {
					if (formData.$name == 'form21') {
						var searchData = this.RNA1;
					}
					else {
						var searchData = this.RNA2;

						// $scope.showFuncCancer = false;
						// $scope.showFuncCellLine = false;
						// $scope.showFuncTargetDetails = false;
						// $scope.showFuncTechnique = false;
						// $scope.showFuncFunction = false;

						// if (searchData.function !== "" && searchData.function != undefined) {
						// 	$scope.showFuncFunction = true;
						// }
						// else if (searchData.target !== "" && searchData.target != undefined) {
						// 	$scope.showFuncTechnique = true;
						// }

					}
					for (item in searchData) {
						if (searchData[item] == '') {
							delete searchData[item];
						}
					}
					$http.get('/function', { params: searchData }).then(function (response) {
						$scope.miResult = response.data.sort(sortByMIRNA);
						window.location.hash = "resultTable";
						$scope.setTable(2);
						// console.table(response.data);

						// if (!$scope.showFuncCancer) {
						// 	removeField(response.data, 'cancer');
						// }
						// if (!$scope.showFuncCellLine) {
						// 	removeField(response.data, 'cell_line');
						// }
						// if (!$scope.showFuncTarget) {
						// 	removeField(response.data, 'target');
						// 	removeField(response.data, 'target_details');
						// }
						// if (!$scope.showFuncTechnique) {
						// 	removeField(response.data, 'technique');
						// }
						// if (!$scope.showFuncFunction) {
						// 	removeField(response.data, 'function');
						// 	removeField(response.data, 'function_details');
						// }
						// removeField(response.data, '_id');
						// startWorker(response.data, (data) => {
						// 	$scope.miResult = data.sort(sortByMIRNA);
						// 	window.location.hash = "resultTable";
						// 	$scope.setTable(2);
						// 	// console.table(response.data);
						// })
					});
				}
				else if ($scope.tab == "3") {
					if (formData.$name == 'form31') {
						var searchData = this.SNP1;
					}
					else if (formData.$name == 'form32') {
						var searchData = this.SNP2;
					} else {
						var searchData = this.SNP3;
					}
					for (item in searchData) {
						if (searchData[item] == '') {
							delete searchData[item];
						}
					}
					$http.get('/snp', { params: searchData }).then((response) => {
						$scope.snpResult = response.data.sort(sortByMIRNA);
						window.location.hash = "resultTable";
						$scope.setTable(3);
						// console.table(response.data);
					});
				}
				else if ($scope.tab == "1") {
					if (formData.$name == 'form11') {
						var searchData = this.exp1;
					}
					else {
						var searchData = this.exp2;

						$scope.showMarker = true;
						$scope.showMarkerDetail = true;
						$scope.showTherapy = true;
						$scope.showTherapyDetail = true;
						$scope.showTumorSize = true;
						$scope.showTumorSizeDetail = true;
						$scope.showExpression = true;
						$scope.showExpressionDetail = true;
						$scope.showCancer = true;
						$scope.showPopulation = true;
						$scope.showSample = true;
						$scope.showSignificance = true;
						$scope.showDetectionMethod = true;

						if (searchData.expression !== "" && searchData.expression != undefined) {
							$scope.showMarker = false;
							$scope.showMarkerDetail = false;
							$scope.showTherapy = false;
							$scope.showTherapyDetail = false;
							$scope.showTumorSize = false;
							$scope.showTumorSizeDetail = false;
							$scope.showExpression = false;
						}
						else if (searchData.marker !== "" && searchData.marker != undefined) {
							$scope.showMarker = false;
							$scope.showTherapy = false;
							$scope.showTherapyDetail = false;
							$scope.showTumorSize = false;
							$scope.showTumorSizeDetail = false;
							$scope.showExpressionDetail = false;
						}
						else if (searchData.therapy !== "" && searchData.therapy != undefined) {
							$scope.showMarker = false;
							$scope.showMarkerDetail = false;
							$scope.showTumorSize = false;
							$scope.showTumorSizeDetail = false;
							$scope.showExpressionDetail = false;
							$scope.showTherapy = false;
						}
						else if (searchData.tumor_size !== "" && searchData.tumor_size != undefined) {
							$scope.showMarker = false;
							$scope.showMarkerDetail = false;
							$scope.showTherapy = false;
							$scope.showTherapyDetail = false;
							$scope.showTumorSize = false;
							$scope.showSignificance = false;
						}
						else if (searchData.sample_type !== "" && searchData.tumor_size != undefined) {
							$scope.showTherapy = false;
							$scope.showTherapyDetail = false;
							$scope.showTumorSize = false;
							$scope.showTumorSizeDetail = false;
						}
					}
					for (item in searchData) {
						if (searchData[item] == '') {
							delete searchData[item];
						}
					}
					var context = this;
					$http.get('/expression', { params: searchData }).then(function (response) {
						delete searchData.marker;
						delete searchData.expression;
						delete searchData.therapy;
						delete searchData.tumor_size;
						delete searchData.sample_type;
						$scope.expResult = response.data.sort(sortByMIRNA);
						window.location.hash = "resultTable";
						$scope.setTable(1);
						// console.table(response.data);
						$('#dropdownsLabel').find('select').prop('disabled', false);
						// $('#dropdownsLabel').find('select').val('');
						$("#btSubmit").prop('disabled', true);
						// if (!$scope.showMarker) {
						// 	removeField(response.data, 'marker');
						// }
						// if (!$scope.showMarkerDetail) {
						// 	removeField(response.data, 'marker_details');
						// }
						// if (!$scope.showTherapy) {
						// 	removeField(response.data, 'therapy');
						// }
						// if (!$scope.showTherapyDetail) {
						// 	removeField(response.data, 'therapy_details');
						// }
						// if (!$scope.showTumorSize) {
						// 	removeField(response.data, 'tumor_size');
						// }
						// if (!$scope.showTumorSizeDetail) {
						// 	removeField(response.data, 'tumor_size_details');
						// }
						// if (!$scope.showExpression) {
						// 	removeField(response.data, 'expression');
						// }
						// if (!$scope.showExpressionDetail) {
						// 	removeField(response.data, 'expression_details');
						// }
						// if (!$scope.showCancer) {
						// 	removeField(response.data, 'cancer');
						// }
						// if (!$scope.showPopulation) {
						// 	removeField(response.data, 'population');
						// }
						// if (!$scope.showSample) {
						// 	removeField(response.data, 'sample');
						// }
						// if (!$scope.showSignificance) {
						// 	removeField(response.data, 'significance');
						// }
						// if (!$scope.showDetectionMethod) {
						// 	removeField(response.data, 'detection_method');
						// }
						// removeField(response.data, '_id');
						// startWorker(response.data, (data) => {
						// 	$scope.expResult = data.sort(sortByMIRNA);
						// 	window.location.hash = "resultTable";
						// 	$scope.setTable(1);
						// 	console.table(response.data);
						// })
					});
				}
			}
		}])
})();