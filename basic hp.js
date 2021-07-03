var artName_array = ["Guernica","View of the Asylum and Chapel of Saint-Rémy","A Wheatfeil with Cypresses","Starry Night","Olive Orchard","Self Potrait","Self Potrait","Self Potrait","Self Potrait","Fictional Character","The persistence of Memory","Old Guitarist","p12","p13","p14","p15","p16","p17","p18","p19","p20"];
var artistName_array = ["PABLO PICASSO","VINCENT VAN GOGH","VINCENT VAN GOGH","VINCENT VAN GOGH","VINCENT VAN GOGH","VINCENT VAN GOGH","VINCENT VAN GOGH","VINCENT VAN GOGH","VINCENT VAN GOGH","ARTIST","SALVADOR DALI","PABLO PICASSO","a12","a13","a14","a15","a16","a17","a18","a19","a20"];
//  localStorage.setItem("viewMode", 1);
/* creating function to shrink and hide navigation bar as the user scrolls down */

window.onscroll=function()
{
  shrink();                                                                 //shrinking navigation bar
  var x = document.body.scrollTop || document.documentElement.scrollTop;    //x: cursor position (0=top)
  if(x==0)
  {
    unshrink();                                                             //if cursor=top; unshrink to default
  }
  if(x>580)
  {
    hidenav();                                                              //if cursor > 600px down; hide 
  }
  if(x<580 && x>0)
  { 
    shownav();                                                              //if cursor < 600px && !-top; show and shrink 
  }
}


  function shrink()
  {
      document.getElementById("navigation").style.height='12vh';
  }
  function unshrink()
  {
      document.getElementById("navigation").style.height='16vh';
  }
  function hidenav()
  {
      document.getElementById("navigation").style.height='0';
      document.getElementById("navigation").style.opacity='0';
  }
  function shownav()
  {
      document.getElementById("navigation").style.height='12vh';
      document.getElementById("navigation").style.opacity='100%';
  }


  /*** DAY NIGHT TOGGLE ***/
  //var dn_variable=0;                                                                     //even=day(=>going to dark); odd=night(=>going to light)
  //var dn_variable = ;
  function change_view()
  {
    if(localStorage.getItem("viewMode")%2==0)                                                                  //if even; switch to dark
    {
      document.getElementById("navigation").style.backgroundColor='#dddddd';
      document.getElementById("logo_img").style.opacity='1';
      document.getElementById("nightlogo_img").style.opacity='0';
      document.getElementById("hp_search_icon").style.opacity='1';
        document.getElementById("hp_night_search_icon").style.opacity='0';
      document.getElementById("day").style.width='40px';
      document.getElementById("night").style.width='0px';
      var nav_link=document.getElementsByClassName("link");
      var imgtxts = document.getElementsByClassName("hpimgtxt");
      for(var n=0; n<nav_link.length; n++)
      {
        nav_link[n].style.color='#141414';
      }
      for(var n=0; n<imgtxts.length; n++)
      {
        imgtxts[n].style.color='#141414';                                                //text color of links to light
      }
      document.body.style.backgroundColor="#dddddd";
      //  dn_variable++;
      localStorage.setItem("viewMode", 1);    
    }
    else
    {
      document.getElementById("navigation").style.backgroundColor='#141414';
      document.getElementById("logo_img").style.opacity='0';                              //switching off day logo
      document.getElementById("nightlogo_img").style.opacity='1';                         //switching on night logo
      document.getElementById("hp_search_icon").style.opacity='0';
        document.getElementById("hp_night_search_icon").style.opacity='1';
      document.getElementById("day").style.width='0';                                     //removing 'DAY' text from toggle
      document.getElementById("night").style.width='40px';                                //showing 'NIGHT' text in toggle
      var nav_link=document.getElementsByClassName("link");                               //gathering link in navigation bar
      var imgtxts = document.getElementsByClassName("hpimgtxt");
      for(var n=0; n<nav_link.length; n++)
      {
        nav_link[n].style.color='#dddddd';                                                //text color of links to light
      }
      for(var n=0; n<imgtxts.length; n++)
      {
        imgtxts[n].style.color='#dddddd';                                                //text color of links to light
      }
      document.body.style.backgroundColor="#141414";
      //dn_variable++;                                                                      //increment variable (=>change it to odd)
      localStorage.setItem("viewMode", 0);
    }
  }


  /*** OVERLAY ***/
  function open_overlay()
  {
    document.getElementById("search_overlay").style.width='100%';
  }
  function close_overlay()
  {
    document.getElementById("search_overlay").style.width='0';
  }


  /*** BANNER SLIDESHOW ***/
  let ss=['p1.jpg','p3.jpg','p9.jpg','p15.jpg'];                    //slideshow image array
  var len= ss.length;                                               //len=length of array
  var l_count=0;
  function show_banner_img()                                        //function to start slideshow
  {
    document.getElementById("banner").style.opacity='100%';         //setting slideshow container opacitity to 1        
    if(l_count==len)
    {
      l_count=0;                                                    //creating loop by setting len to 0; if l_count=length of array
    }
    document.getElementById("banner_img").src=ss[l_count];          //setting source code of banner image 
    var bn_btns_hg = document.getElementsByClassName("bn_btn_hg");  //gathering buttons
    reset_bn_btns();                                                //reseting highlight buttons to default
    bn_btns_hg[l_count].style.visibility= 'visible';                //highlighting the current slide button
    l_count++;                                                      
    setTimeout(function ()  
    {                                                               //setting function to reduce opacity of banner container to 0 after every 3600ms
      document.getElementById("banner").style.opacity='00%';        //transition duration for container is 200ms therefore one cycle = 
    },3600);                                                        //200(opacity 1->0) + 3600(delay) + 200(opacity0->1) = 4s = slideshow interval
  }
  function reset_bn_btns()                                          //function to reset highlighting buttons
  {
    var bn_btns_hg = document.getElementsByClassName("bn_btn_hg");  //gathering highlighting buttons
    for(i=0; i < bn_btns_hg.length; i++)
    {
      bn_btns_hg[i].style.visibility= 'hidden';                     //setting visibility of each highlighting button to 'hidden'
    }
  }


  /*** COLLECTING IMAGES FOR GRID ARTWORKS (HOMEPAGE) AND SHUFFLE IMAGES ***/
  var new_arr=new Array();       //array to store image numbers
  
  function gen_random(num, k, check)                                //num=no. of images required; k=className of images; check=0 if called by homepage 
  { 
    art_count = num;                                                                                                            
    var r=0;                                                  
    var count=0;
    for(var i=0; i<num; i++)
    {
      r=Math.floor(Math.random()*20);                       //to store random number from 0-19
      for(var j=0; j<i; j++)                                //j loop to check for repitition
      {
        if(new_arr[j]==r)
        {
          count =1;
        }
      }
      if(count==0)                                          //no repitition
      {
        new_arr[i]=r;                                     //allot random number to array         
      }
      else                                                  //repitition caught
      {
        --i;                                              //recalculate for same array index
        count =0;                                         //reset count 
      }
    }
    var imgs=document.getElementsByClassName(k);              //gathering images by className
    if(check == 0)
    {
      var imgstxt = document.getElementsByClassName('hpimgtxt');
    }
    for(var k=0; k<num; k++)
    {
      var txt="p" + new_arr[k] +".jpg";                     //creating image src as per name stored on computer
      imgs[k].src=txt;                                      //alloting src to images
      if(check == 0)
      {
        imgstxt[k].innerHTML = artName_array[new_arr[k]];
      }
      localStorage.setItem(k, new_arr[k]);
    }
    if(check==1)                                              //called by shuffle => also allot to modal_display
    {
      var modal_img_dis="p" + new_arr[0] + ".jpg";            //alloting first random image sent
      document.getElementById("modal_display_img").src=modal_img_dis;
      imgClick(0);
    }
}


  /*** EXHIBITION CARDS ***/
  //forward slide by 48% of horizontal pixels
  function slidenxt()                           
  {
    var sl=document.getElementById("ex");                           //gathering exhibition card container 
    var x=window.innerWidth;                                        //x=width of browser window
    x=0.48*x;                                                       //x=48% of browser window (pixels)
    sl.scrollBy({left: x,behavior:'smooth'});                       //scrolling exhibition card container to left by x pixels.
  }
  //backward slide by 48% of horizontal pixels
  function slideprv()
  {
    var sl=document.getElementById("ex");
    var x=window.innerWidth;
    x=0.48*x;
    sl.scrollBy({left: -x,behavior:'smooth'});                      //scroll left by -x = scroll right by x 
  }


  /*** ALLOTING CLICKED IMAGE FROM INDEX ON MODAL DISPLAY ***/
  function modal_img(value)                                                             //image 1 clicked
    {
      document.getElementById("modal_display_img").src='p'+new_arr[value-1]+'.jpg';       //alloting first random image chosen during shuffle call
      imgClick(value-1);
    }
    /*function modal_img2()
    {
      document.getElementById("modal_display_img").src='p'+new_arr[1]+'.jpg';
    }
    function modal_img3()
    {
      document.getElementById("modal_display_img").src='p'+new_arr[2]+'.jpg';
    }
    function modal_img4()
    {
      document.getElementById("modal_display_img").src='p'+new_arr[3]+'.jpg';
    }*/


    function nextImg(num)
    {
      var x = parseInt(localStorage.getItem("path"));

      imgClick((12+x+num)%12);
    }
    function imgClick(value)
    {
        localStorage.setItem("path",value);
    }
    function shownew()
    {
        var x = parseInt(localStorage.getItem("path"));
        var txt = "p" + localStorage.getItem(x) + ".jpg";
        document.getElementById("newimg").src=txt; 
        document.getElementById("artName").innerHTML = artName_array[localStorage.getItem(x)];
        document.getElementById("artistName").innerHTML = artistName_array[localStorage.getItem(x)];
      /*  document.getElementById("imgblock").innerHTML= txt;*/
    }

    function viewCheck()
    {
      var value = localStorage.getItem("viewMode");
      if(value == 0)
      {
        document.getElementById("content").style.backgroundColor = '#141414';
        document.body.style.backgroundColor = '#141414';
        //document.getElementById("imgblock").style.backgroundColor = '#141414';
        document.getElementById("artName").style.color = '#ededed';
        document.getElementById("artistName").style.color = '#ededed';
        document.getElementById("return_cont").style.backgroundColor = '#454545';
        var but = document.getElementsByClassName('button');
        for(let i=0; i<but.length; i++)
        {
          but[i].style.backgroundColor = '#454545';
          but[i].style.color = '#121212';
          but[i].style.borderColor = '#454545';
        }
      }
      else
      {
        document.getElementById("content").style.backgroundColor = '#ededed';
        document.body.style.backgroundColor = '#ededed';
       // document.getElementById("imgblock").style.backgroundColor = '#ededed';
        document.getElementById("artName").style.color = '#121212';
        document.getElementById("artistName").style.color = '#121212';
        document.getElementById("return_cont").style.backgroundColor = 'none';
        var but = document.getElementsByClassName('button');
        for(let i=0; i<but.length; i++)
        {
          but[i].style.backgroundColor = 'none';
          but[i].style.color = 'none';
          but[i].style.borderColor = '#d2d2d2';
        }
      }
    }

    function viewCheck_index()
    {
      var value = localStorage.getItem("viewMode");
      if(value == 0)
      {
        document.getElementById("navigation").style.backgroundColor='#141414';
        document.getElementById("logo_img").style.opacity='0';                              //switching off day logo
        document.getElementById("nightlogo_img").style.opacity='1';                         //switching on night logo
        document.getElementById("hp_search_icon").style.opacity='0';
        document.getElementById("hp_night_search_icon").style.opacity='1';
        document.getElementById("day").style.width='0';                                     //removing 'DAY' text from toggle
        document.getElementById("night").style.width='40px';                                //showing 'NIGHT' text in toggle
        var nav_link=document.getElementsByClassName("link");                               //gathering link in navigation bar
        var imgtxts = document.getElementsByClassName("hpimgtxt");
        for(var n=0; n<nav_link.length; n++)
        {
          nav_link[n].style.color='#dddddd';                                                //text color of links to light
        }
        for(var n=0; n<imgtxts.length; n++)
        {
          imgtxts[n].style.color='#dddddd';                                                //text color of links to light
        }
        document.body.style.backgroundColor="#141414";
        document.getElementById("dnsw").checked = true;
      }
      else
      {
        document.getElementById("navigation").style.backgroundColor='#dddddd';
        document.getElementById("logo_img").style.opacity='1';
        document.getElementById("nightlogo_img").style.opacity='0';
        document.getElementById("hp_search_icon").style.opacity='1';
        document.getElementById("hp_night_search_icon").style.opacity='0';
        document.getElementById("day").style.width='40px';
        document.getElementById("night").style.width='0px';
        var nav_link=document.getElementsByClassName("link");
        var imgtxts = document.getElementsByClassName("hpimgtxt");
        for(var n=0; n<nav_link.length; n++)
        {
          nav_link[n].style.color='#141414';
        }
        for(var n=0; n<imgtxts.length; n++)
        {
          imgtxts[n].style.color='#141414';                                                //text color of links to light
        }
        document.body.style.backgroundColor="#dddddd";
        document.getElementById("dnsw").checked = false;
      }
    }

    function viewCheck_shuffle()
    {
      var value = localStorage.getItem("viewMode");
      if(value == 0)
      {
        document.body.style.backgroundColor = "#141414";
        document.getElementById("return_cont").style.backgroundColor = '#454545';
        document.getElementById("shuffle_btn").style.backgroundColor = '#454545';  
      }
      else
      {
        document.body.style.backgroundColor = "#ededed";
        document.getElementById("return_cont").style.backgroundColor = 'none';
        document.getElementById("return_cont").style.backgroundColor = 'none';
      }
    }


    