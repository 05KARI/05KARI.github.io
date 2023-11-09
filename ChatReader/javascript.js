function ReadFile(files){
  fr=new FileReader();
  fr.onload=function(){
    try{CreateMessages(JSON.parse(fr.result));}
    catch{alert("couldn't parse json string")}
  }
  fr.readAsText(files[0]);
}

function CreateMessages(data){
  Messages=document.querySelector("div#Messages");
  MessageList=document.querySelector("div#Holder");
  Messages.innerHTML="";
  data.forEach(e=>{
    classes=`class="Message Role${e.Role}"`;
    Messages.innerHTML+=`<p title="${e.Role}" ${classes}>${e.Content}</p>`;
  });
  MessageList.style.display="block";
}
