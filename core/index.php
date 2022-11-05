<!DOCTYPE html>
 
<html lang="en">
 
<head>
<meta charset="utf-8"/>
<title>Hyperbook  </title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-control" max-age="3600" content="public" />
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<meta content="" name="description"/>
<meta content="" name="author"/>
<meta property="og:image" content="http://getbook.co/images/logo1.png" />


 <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css">
 <link  href="css/search.css" rel="stylesheet">
<link href="fonts/font-awesome/css/font-awesome.min.css" rel="stylesheet">
 <link href='http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900,100italic,300italic,400italic,700italic,900italic' rel='stylesheet' type='text/css'>
 
<link rel="stylesheet" type="text/css" href="css/search_component.css" />

     
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
 
 <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css">
 
<link href="css/timeline.css" rel="stylesheet" type="text/css"/>
 <!-- <link href="../../assets/global/css/components1.css" id="style_components" rel="stylesheet" type="text/css"/> -->
 
<link href="css/components1.css" id="style_components" rel="stylesheet" type="text/css"/> 
<link href="css/layout.css" rel="stylesheet" type="text/css"/>
<link href="css/grey.css" rel="stylesheet" type="text/css"/>
<link href="core/hyperbook.css"  rel="stylesheet" type="text/css"/>


</head>
 
<body class="page-boxed page-header-fixed page-container-bg-solid page-sidebar-closed-hide-logo ">
<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
	<!-- BEGIN HEADER INNER -->
	<div class="page-header-inner container">
		<!-- BEGIN LOGO -->

		 <div class="page-logo">
			<a href="http://getbook.co">
					<h3 class=hblogo> HyperBook </h3>
 			</a>
                                   
		</div> 
		 

		<div class="page-top">
			<div class="top-menu">
			   		<ul class="nav navbar-nav pull-right">
			   		 <li class="dropdown dropdown-user">
					<a class="username">   </a> 

			   		

			   	 
			   		</ul>
   		    </div>
						
	 		<div class="searchdiv">
	            <div class="dark">
	                <input type="text"  id="searchbox" placeholder="    Search titles/tags/notes...">
	                <input type="submit" id="searchgo" value="    Go     ">
		 
	            </div>
				 
				<div class="notebook"> <br><br>
				 
				  <button type="submit" class="postsubmit btn green-haze btn-sm default"><i class="fa fa-check"></i> Save</button>

				<button type="button" class="postcancel btn  btn-sm default">Discard</button>
			 

        		 <a href="#" id="settitle" data-type="text" data-pk="1" data-title="Title" class="editable editable-click"></a> 
								 								 

								  <!-- <span id="notestitle"> </span> -->
 				<textarea id="content" name="content">
 	            </textarea>

 	           	 <span id="notebook_suggest">
 	            </span>	
            	
			</div>
				 

		</div>


		 
		</div>
		<!-- END PAGE TOP -->
	</div>
	<!-- END HEADER INNER -->

</div>
<!-- END HEADER -->
<div class="clearfix">
</div>




<div class="container">

	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<div class="page-sidebar-wrapper">
		 
			<div class="page-sidebar navbar-collapse collapse"> 

				<div id="accordian">
			 
				  <ul>

				  	 <li>
				      <h3><span class="fa fa-bookmark"></span> Bookmarks</h3>
				      <ul>
						<li><a id="btn_all"> All Items </a></li>
				        <li><a id="btn_videos"> Videos </a></li>
				        <li><a id="btn_favorites"> Favorites </a></li>
				        <li><a id="btn_archives"> Archived </a></li>
				        
				      </ul>
				    </li>

				     <li>
				      <h3><span class="fa fa-book"></span>Notes</h3>
				      <ul>
				        <li><a class="notes"> All notes </a></li>
				        <!--
				        <li><a class="notes"> Item 2 </a></li>
				        <li><a class="notes"> Item 3 </a></li> 
				        <li><a class="notes"> Item 4 </a></li> -->
				      </ul>
				    </li>


				  	 <li class="active1">
				      <h3><span class="fa fa-folder"></span> Folders</h3>
				      <ul>
				        <li > <span class="add_folder" class="editable editable-click editable-empty"> </span>   </li>
				 					    	<div class="user_list">   
				 					    		
				 					        </div>
				      </ul>
				    </li>

				    


				     <li>
				      <h3><span class="fa fa-dashboard"></span>Auto Folders</h3>
				      <ul>  <div class="folder_list1"> </div>   

				      </ul>
				    </li>
				   <li>
				      <h3><span class="fa fa-tags"></span>Tags</h3>
				      <ul>
				      <li > <span class="add_tag" class="editable editable-click editable-empty"> </span>   </li>
									         <span class="tag_list">  </span>

									         	
									    			 
				      </ul>
				    </li>

				   

				    <li class="active1">
				      <h3><span class="fa fa-user"></span> Groups</h3>
				      <ul>
      					    <li > <span class="add_group" class="editable editable-click editable-empty"> </span>   </li>

	 					    	<div class="groups_list">   
 					    		 
 					        </div>
 					        <span style="display:none">
 					        <div class="groups_writable">
					          	 			   		 	
							</div>	
						</span>
				      </ul>

				      	
				    </li>
				   
				  </ul>
				</div> 
					    
			  

					 
			 
			</div>
		</div>
		<!-- END SIDEBAR -->
		<!-- BEGIN CONTENT -->
		<div class="page-content-wrapper">


			<div class="page-content">
		
	 		 
				<div class="urlcloud_div" style="width: 90%; height: 400px; border: 1px solid #ccc;"></div>
				<div id="results_auto"></div>
				<div id="results_domain"></div>
				<div id="my-timeline"></div>



				 <div class=" hbnav" > 
							 <span class="title" id="hbpage" title="My Information">  </span>
							  <span id="btn_detail" title="Toggle Summary/Detail View"> Details </span> 
							  <!-- <span id="btn_mmap" title="Mindmap"> Mindmap </span>  -->


							  <span id="btn_sort" title="display order"> Sort </span> 
							  <span id="sortdate"><i class="fa fa-calendar-o" title="Date"></i></span> 
							  <span id="sortrnd"><i class="fa fa-random" title="Shuffle"></i></span> 
							  <input type="text" value="  Timeline" id="datepicker" class="calendar" title="click to select">
							  <!--
							  <div class="login-wrap">
							    <span class="loginbtn" title="Login using password"> Login </span> 
							    <span class="logoutbtn"> Logout </span> 


			   		 		 <div id="login-form" >
			                    <span><input id="loginuser" class="text" type="text" name="username" placeholder="username" /></span>
			                    <span><input id="loginpass" class="text" type="password" name="password" placeholder="password" /></span>
			                    <br>
			                    <span><input class="submit" type="submit" value="submit" /></span> 
			                    <span><input class="cancel" type="submit" value="cancel" /></span>

			                </div>
			            </div>-->


			            				


 
				</div>

				<div id="views_wrap">
				  	<div id="notesview"></div>

				  	<div id="searchview"></div>
	  			 	 <div id="listview"></div>
  			 	</div>

  			 	
           	 

			</div>

		</div>
		<!-- END CONTENT -->
	 
	</div>
	<!-- END CONTAINER -->


<div style="display:none">
<div class="content_popup"  >
    <div class="notes_editor"></div>
	<div class="popModal_footer">
		<button type="button" class="btn btn-primary " data-popmodal-but="ok"  >save</button>
		<button type="button" class="btn btn-default" data-popmodal-but="cancel">cancel</button>
	</div>
</div>
</div>
 
	 
</div>

 <link rel="stylesheet" href="redactor/redactor.css" />
<link href="css/jqueryui-editable.css" rel="stylesheet"/>

<script    src="http://code.jquery.com/jquery-latest.js" type="text/javascript"  ></script> 
<script   src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" defer></script>

<script   src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.2/handlebars.min.js" defer></script>
<script   src="js/sha1.js" defer></script>
 

 <link rel="stylesheet" type="text/css" href="css/jqcloud.css" />
<script type="text/javascript" src="js/jqcloud-1.0.4.min.js"></script>

<!-- <script   src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js" > </script> -->
<script   src="js/jqueryui-editable.js" defer></script> <!-- modified cancel button with x-->

<script   src="core/urlpreview_tags.js"></script>
<script   src="core/urlpreview_func.js"></script>
<script   src="core/urlpreview.js"></script>
<script   src="core/url_info.js"></script>

<script   src="js/sidebar.js"></script>

<script src="js/jquery.hovercard.js" type="text/javascript"  ></script> 

<script src="js/jquery.dotdotdot.min.js" type="text/javascript"  ></script> 
 <link rel="stylesheet" href="css/paper-collapse.min.css">
 
  <link rel="stylesheet" href="css/folder.css">

 <script src="js/paper-collapse.js"></script>
<!-- <script src="js/sprintf.js"></script> -->

 <script src="js/jquery.caret.min.js"></script>
 <script src="js/jquery.tag-editor.js"></script>
<link rel="stylesheet" href="css/jquery.tag-editor.css">

<script type="text/javascript" src="js/jquery.tooltipster.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/tooltipster.css" />

 <script src="js/datepicker.js"></script>
 <link href="css/datepicker.css" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="js/jquery.slimscroll.min.js"></script>

<link rel="stylesheet" href="editor/trumbowyg.min.css">
<script src="editor/trumbowyg.js"></script>

 <script src="js/jquery.timeago.js" type="text/javascript"></script>


<script src="js/jquery.urlive.js"> </script>
<script src="redactor/redactor.min.js"></script>  

 <script src="js/popModal.js"></script>
<link type="text/css" rel="stylesheet" href="css/popModal.css">


 <script type="text/javascript">
    $(function()
    {
		$('#editor1').trumbowyg();
		 $('.notes_editor').trumbowyg();


 		EditorInit();
 		PopupModal1(	$('#popModal_ex1'));

	 	$('.folder_list').slimScroll({
	        height: '280px'
	    });

	 	/*
        $('.user_list').slimScroll({
                  height: '280px'
          });*/

        	/*

          $('#searchview').slimScroll({
                  height: '300px'
          });*/

      




    });

//	$('#popModal_ex1')
    function PopupModal1(element)
    {
    		element.click(function(){
    		console.log("modal");
	 		element.popModal({
			html : $('#content_popup'),
			placement : 'bottomLeft',
			showCloseBut : true,
			onDocumentClickClose : true,
			onDocumentClickClosePrevent : '',
			overflowContent : false,
			inline : true,
			asMenu : false,
			beforeLoadingContent : 'Please, wait...',
			onOkBut : function() {},
			onCancelBut : function() {},
			onLoad : function() {},
			onClose : function() {}
			});
		});
    }

    function EditorInit(){
    	 $('#content').redactor({
        	 minHeight: '400px',
             focus: true,	
             
             keydownCallback: function(e)
		    {
		    	var key = e.keyCode || e.which;
		    	if(key==32) //space
		        	{ 
		        		processHTML( this.code.get());
		        	}
		    }
        });
    }

    function processHTML(html)
    {
	    var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		console.log(text);
		var lastword = text.split(" ").pop();
		search_solr_nb(lastword);
 
   }
 </script>



 <script id="template_userfolders" type="text/x-handlebars-template">
		{{#each menu}}

      <li class=sub_list> <span class=folder_dd>{{this}}</span>
		 
	</li>
	{{/each}}
</script>
			   
 <script id="template_folders" type="text/x-handlebars-template">
	{{#each menu}}

	      <li class=sub_list> <span class=newfolder>{{FOLDER}}</span>
	      <div class="UnreadCounter">
			{{CNT}}
		</div>
		</li>
	{{/each}}
</script>


 <script id="template_tags" type="text/x-handlebars-template">
		{{#each menu}}

      <li class=sub_list> <span class=new_tag>{{this}}</span></li>

	{{/each}}
</script>

<script id="template_groups" type="text/x-handlebars-template">
		{{#each menu}}

      <li class=sub_list> <span class=new_group>{{this}}</span></li>

	{{/each}}
</script>


<script id="template_wgroups" type="text/x-handlebars-template">
	{{#each menu}}

	      <li class=sub_list> <span class=new_wgroup>{{this}}</span>
	       
		</li>
	{{/each}}
</script>


<script id="hbsearch" type="text/x-handlebars-template">
	<img class="closesearch" src="images/close.png"/>

   {{#each menu}}

   	<div class="collapse-card" >

   			
	       	 <span class="title">
        		<img class="hbfav " src="http://www.google.com/s2/favicons?domain={{SITE}}"/> 
				<a class="bookmark " href="{{SITE}}"  target=_blank> {{TITLE}}</a> 
				<!-- folder-->
		         <li class="info_folder dropdown btn-group">
			            <a id="drop2" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
	 		               <span class="hb_folder1"> <span class="fa fa-folder"></span> </span>
	 		            </a>	 			   		
		          <ul class="dropdown-menu" role="menu" aria-labelledby="drop2">
			        	<div class="select_folder1"> </div>

		      	  </ul>
		        </li>  
		 	  </span>
	</div>
	{{/each}}
</script>

<script id="hbnotes" type="text/x-handlebars-template">
	<img class="closenotes" src="images/close.png"/>

   {{#each menu}}

   	<div class="collapse-card" >

   			
	       	 <span class="title">
 				 {{this}}  
		 	  </span>
	</div>
	{{/each}}
</script>


<script id="hbtemplate" type="text/x-handlebars-template">

   {{#each menu}}

   	<div class="collapse-card" >

   			<span class="timeline-badge-userpic previewurl readmore "> 
   				<img  class="imgurl" src="{{IMGURL}}" width=120 height=80>
    			</span>
	       	 <span class="title">
        		

        		  <img class="hbfav  " src="http://www.google.com/s2/favicons?domain={{SITE}}"/>   

				<a class="bookmark " href="{{SITE}}"  target=_blank> {{TITLE}}</a> 

						 	 	 	
							
 
 			 			<li class="share_icon  dropdown btn-group" title="Shares"> 

								<a id="drop3" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
						 		 	<img class="abcs" src="images/globe.png" width=15 height=15 /> 
			 		            </a>
					          	<ul class="dropdown-menu" role="menu" aria-labelledby="drop3">

					          	 			 <div class="select_group"> </div>

					            
						      	  </ul>
					      </li>  
 
			 
				         <li class="info_folder dropdown btn-group">
				            <a id="drop2" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
		 		              <span class=hb_folder> {{FOLDER}} <span class="fa fa-folder"></span>
		 		            </a>	 			   		
				          <ul class="dropdown-menu" role="menu" aria-labelledby="drop2">
				          				           			   		 	<div class="select_folder"> </div>

				            
				      	  </ul>
				      </li>  
				         
		 		
					   

		 		    <span class="urlhash" style="display:none"> {{URLHASH}} </span>
            

				   
				      

		 		    <li class="dropdown btn-group"> <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
		 		            <span class=hb_domain> {{DOMAIN}}</span> <b class="caret"></b></a>	 			   		
				          <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
				             <li class=hbvisit >   <img title="Delete" src="images/globe.png"> Visit Page </li>
				            <li class=hbdelete >   <img title="Delete" src="images/delete.png"> Delete</li>
 
				            <li class=hbarchive> <img  title="Archive" src="images/archive.png" width="15" height="15" > Archive</li>
 
				            <li class=hbstar > <img title="Favorite" src="images/star.png"> Favorite</li>
 				            <!-- <li class=hbpublic>	 <img  title="Private" src="images/globe.png"> Private</li> -->
				      	  </ul>
				      </li>  



		 		
		 	 
		 		 <div class="notestags">
		 		  		       				<img class="img_edit" src="images/edit3.png" width="15" height="15" />

		 		 							 		  <span class="hbdate  ">{{TIMESTAMP}}</span>
		 		 							 		  	
	            		 
	            			<span class="btn_tags"> 	
								<img   src="images/tags1.svg" width="15" height="15" />
							</span>
					       <span class="info_tags">  {{USERTAGS}}   </span> 

 		       				<span class="info_autotags"> {{AUTOTAG}} </span> <br><br>

	            			<!-- <span class="newdesc font-grey-cascade">{{NOTES}} </span>  -->

	            			<!--
 		       				<span class="previewavl"> {{PREVIEW}} </span>
 		       				<span class="readmore1">   Preview </span>-->
 		       				 <!-- <span class="btn_cloud">   Viz  </span>  -->



				 		  <span class="description"> 	
				 		  	   

				 		  		<p> {{DESCRIPTION}} </p> 
				 		  </span>  
				 		  <div class="embedview"></div>


				 	

				 		 


								<!-- <p class="btn_cloud"> Viz </p>   -->

 								<div class="newcloud_div" style="width: 50%; height: 250px; border: 1px solid #ccc;">
	

		       				
		 		

				</div>



	 	</span> <!--title-->


 
 
		<div class="hidden">


        
				<div class="card_related">
						<ul class="recolinks">
						</ul>
				 </div>
				 


				</div>
			
				 <span class="quickpreview"> Preview </span>

					 
	</div>

		 </div> <!-- collapse-card -->
    
 {{/each}}

</script>		


 

<!-- END JAVASCRIPTS -->


</body>
<!-- END BODY -->
</html>
