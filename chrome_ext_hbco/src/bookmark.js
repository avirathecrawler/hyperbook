
var hyperbookmark_folder = "[Hyperbook]"; 


function CreateFolder(parent, name) {
      chrome.bookmarks.create({parentId: parent,
                            title: name }, success_addfolder);
}


function createHyperbookFolder() 
{
      chrome.bookmarks.getTree(function(tree) {
           var hbfolder = searchFolder(tree[0], hyperbookmark_folder)
            if (!hbfolder) {
              CreateFolder("1", hyperbookmark_folder);
             }
            else {
              localStorage.hb_root_folder = hbfolder.id;
              console.log("hyperbook folder exists" + hbfolder.id);
            }
           });
     
}
 

function traverseHyperbookFolder() {
  chrome.bookmarks.getChildren(localStorage.hb_root_folder, traverseBookmarks);
}

function traverseBookmarks(bookmarkTreeNodes, outer_json) {

    var json=[];

    for(var i=0;i<bookmarkTreeNodes.length;i++) {
        if(!bookmarkTreeNodes[i].url)         //folder
        {
          var folder_name = bookmarkTreeNodes[i].title; 
          json.push(folder_name);
          console.log(folder_name);
          FOLDER_NAME_ID[folder_name] = bookmarkTreeNodes[i].id;
          //console.log(FOLDER_NAME_ID);

        }

        if(bookmarkTreeNodes[i].children) {
 
            traverseBookmarks(bookmarkTreeNodes[i].children);
            
        } 

    }
    console.log(json);

    

       $('#hb_folders_list').html("");

      $(json).each(function(index, item) {
        $('#hb_folders_list').append( $(document.createElement('li')).text(item) );
       });
      $('#hb_folders_list').show();

      $("#hb_folders_list li").on("click", function() {
          // here I want to get the clicked id of the li (e.g. bakkerLink)
          var folder = $(this).html();
         console.log($(this).html());
         BookmarkInFolder(folder);
      });


  }


 function searchFolder(n, f) {
    if (Array.isArray(n.children)) {
        for (var i = 0; i < n.children.length; i++) {
            if (n.children[i].title == f) 
                  return n.children[i]; 
            
            else if (r = searchFolder(n.children[i], f)) return r;
        }
    }
    return null;
}

 
function  BookmarkInFolder(folder,_title,_url)
{
   createHyperbookFolder() ;

   var parent = FOLDER_NAME_ID[folder];

   chrome.bookmarks.create({parentId: parent,
                            title: "Search", url: "http://google.com" }, logger);
}
 var logger = function(result){console.log(result); };
