var exec=require("child_process").exec;
var querystring=require("querystring");
var fs=require("fs");
var formidable=require("formidable");

function start(response) {
	console.log("Request handler 'start' was called.");
	// function sleep(milliSeconds){
	// 	var startTime=new Date().getTime();
	// 	while(new Date().getTime()<startTime+milliSeconds);
	// }
	// sleep(10000);
	// var content="empty";
	// exec("ls -lah",function(error,stdout,stderr){
	exec("find /",{timeout:10000,maxBuffer:20000*1024},function(error,stdout,stderr){
		response.writeHead(200,{"Content-Type":"text/plain"});
		if(stdout==null||stdout=="")
			stdout="Nothing";
		response.write(stdout);
		response.end();
		// content=stdout;
	});
	// return content;
}

// function upload(response,postData) {
// 	console.log("Request handler 'upload' was called.");
// 	response.writeHead(200,{"Content-Type":"text/plain"});
// 	response.write("You've sent: "+querystring.parse(postData).text);
// 	response.end();
	// return "Hello Upload";
// }
function upload(response,request){
	console.log("Request handler 'upload' was called.");
	var form=new formidable.IncomingForm();
	form.uploadDir="./upload/";
	console.log("about to parse");
	form.parse(request,function(error,fields,files){
		console.log("parsing done");
		fs.renameSync(files.upload.path,"./test.png");
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show'/>");
		response.end();
	});
}


function welcome(response,postData){
	console.log("Request handler 'welcome' was called");
	var body="<html>"+"<head>"+
	"<meta http-equiv='Content-Type' content='text/html;charset=UTF-8'/>"+
	"</head>"+"<body>"+"<form action='/upload' enctype='multipart/form-data' method='post'>"+
	// "<textarea name='text' rows='20' cols='60'></textarea>"+
	"<input type='file' name='upload'>"+
	"<input type='submit' value='Submit'/>"+"</form>"
	"</body>"+"</html>";
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

function show(response) {
	console.log("Request handler 'show' was called.");
	fs.readFile("./test.png","binary",function(error,file){
		if(error){
			response.writehead(500,{"Content-Type":"text/plain"});
			response.write(error+"\n");
			response.end();
		}else{
			response.writeHead(200,{"Content-Type":"image/png"});
			response.write(file,"binary");
			response.end();
		}
	})
}
exports.start=start;
exports.upload=upload;
exports.welcome=welcome;
exports.show=show;