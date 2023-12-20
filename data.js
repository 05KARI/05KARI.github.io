json=[
  {"text":"Ivy Injector", "title":"DLL injector for minecraft: bedrock edition", "dest":"https://05kari.github.io/Ivy", "new":true},
  {"text":"ChatReader", "title":"a reader for unity chatGPT chatlog", "dest":"/ChatReader", "new":true}
]

function Get(obj){return document.querySelector(obj)}

json.forEach(data=>{
a=document.createElement("a")
a.innerHTML=data.text;
a.title="data.title";
a.href=data.dest;
a.target=data.new?"_blank":"";

box=document.createElement("div");
box.class="container";
box.appendChild(a)
document.body.appendChild(box);
})
