function loadJSON(callback, path){
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET',path,true);
  xobj.onreadystatechange = function()
  {
    if (xobj.readyState == 4 && xobj.status == "200")
    {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
var loaded = 0;
var _photos = [];
function generateImages()
{
  for (var i = 19; i >= 0; i--){
    loadJSON(
      function(response)
      {
        var wd = JSON.parse(response);
        if (wd.images.length > 0)
        {
          for (var o = 0; o < wd.images.length;o++){
            _photos.push(wd.images[o]);
          }
        }
        loaded +=1;
        if (loaded == 19){
          AssignImgs();
        }
      },'workdata/preview'+i.toString()+'.json'
    );
  }
  /*var files =
  [
    'aurora/ANScreenShot.jpg',

    'backfire/gameplay.gif',
    'backfire/title.gif',

    'bonebois/bb1.gif',
    'bonebois/bbtitle.gif',
    'bonebois/fire.gif',
    'bonebois/gameplay.gif',

    'ccproto/sliders.gif',

    'echoes/chase.gif',
    'echoes/door.gif',
    'echoes/respite.gif',
    'echoes/title.gif',

    'fromform/thumbnail.gif',

    'golf/ss1.gif',
    'golf/ss2.gif',
    'golf/ss3.jpg',

    'gravitymasters/thumbnail.gif',

    'hope/hope.gif',
    'juice/OOS_JUICE.png',

    'mcp/mcthumgj.gif',
    'mcp/mcscreen1.png',

    'parallel/PARALLEL_SCREEN_1.jpg',
    'parallel/PARALLEL_SCREEN_2.jpg',
    'parallel/PARALLEL_SCREEN_3.jpg',

    'pfproto/gross.gif',

    'robocatouya/rbouyathumb.PNG',
    'robocatouya/robocat.gif',
    'robocatouya/SS3.png',
    'robocatouya/SS7.png',

    'safe/corpse.png',
    'skelebuddy/sbthumb.gif',

    'socc/looper.gif',
    'spinnyships/gyro9.gif',

    'sputnik/nasa.gif',
    'sputnik/sewers.gif',
    'sputnik/title.gif'
  ];*/
}
function AssignImgs()
{
  var imgs = document.getElementsByClassName("h-img-i");
  var filename = "works/";/*(window.location.pathname).substring(1,window.location.pathname.length-9)+"works/"*/
  var num = 0;
  for (var p = 0; p < imgs.length;p++)
  {
    num = Math.floor(Math.random()*(_photos.length-1));
    imgs[p].src = filename+_photos.pop(num);
    imgs[p].alt = num.toString();
  }
}

window.onload = generateImages();
