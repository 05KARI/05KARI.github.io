const FileSelect=document.querySelector(".FileSelect");
const Messages=document.querySelector("div#Messages");
const MessageList=document.querySelector("div#Holder");
const settings=document.querySelector(".settingsMenu");
const root=document.querySelector(":root").style;

var settingsVisible=false;

function ReadFile(files){
  fr=new FileReader();
  fr.onload=function(){
    try{CreateMessages(JSON.parse(fr.result));}
    catch{alert("couldn't parse json string");}
  }
  fr.readAsText(files[0]);
}

function CreateMessages(data){
  Messages.innerHTML="";
  data.forEach(e=>{
    const msg=document.createElement("p");
    msg.title=e.Role;
    msg.className=`Message Role${e.Role}`;
    msg.innerText=e.Content;
    Messages.appendChild(msg);
    //Messages.innerHTML+=`<p title="${e.Role}" class="Message Role${e.Role}">${e.Content}</p>`;
  });
  SetVisible()
}

function SetVisible(visible=true){
  MessageList.style.display=visible?"block":"none";
  FileSelect.style.display=visible?"none":"flex";
}

document.addEventListener("keyup", function(e){
  if(e.key=="<"){SetVisible(!(MessageList.style.display=="block"))}
})

function toggleSettings(){
  settingsVisible=!settingsVisible;
  settings.style.visibility=settingsVisible?"visible":"hidden";
}

function ChangeSetting(obj){
  settingName=obj.getAttribute("name");
  value=prompt(obj.innerHTML);
  if(value==""||value==null)return;
  if(value.startsWith("calc(")){}
  else if(/^([1-9][0-9]|100)$/.test(value)){value+="%";}
  else if(/^\d{3,}$/.test(value)){value+="px";}
  else if(!/^\d+(?:px|rem|vw|\%)$/gi.test(value)){alert("invalid");return;}
  localStorage.setItem(settingName, value);
  refreshSettings();
}

function refreshSettings(){
  Object.keys(localStorage).forEach(item=>{
    if(!item.startsWith("--"))return;
    value=localStorage[item];
    root.setProperty(item, value);
    obj=document.querySelector(`[name='${item}']`);
    if(obj!=null)obj.setAttribute("data", value);
  })
}

refreshSettings()