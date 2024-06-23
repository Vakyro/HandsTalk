<?php
  include("funciones.php");
  session_start();

	define('AUTOR', 'Calderon Castillo Leonardo - Castañeda Rodriguez Andrea'); 
	define('SITENAME', 'HandsTalk');
  
  define('ROOTURL', 'http://localhost/HandsTalk/admin/');
	define('DOCROOT',$_SERVER['DOCUMENT_ROOT'] . '/HandsTalk/admin/');      

	define('DBHOST','localhost');
	define('BDUSER','root');
	define('DBPASSWD','');
	define('DBNAME','handstalk');

	define('HEADER',DOCROOT.'header.php');
	define('FOOTER',DOCROOT.'footer.php');

	define('IMAGES',ROOTURL.'public/');
	define('CSS',ROOTURL.'css/');
	define('JS',ROOTURL.'js/'); 

	define('FILTRO',DOCROOT.'components/Filtro.php');
	define('NOTIACT',DOCROOT.'components/NotiACT.php');
	define('NOTIADD',DOCROOT.'components/NotiADD.php');
	define('DELETES',DOCROOT.'components/Delete.php');
	define('ERROR',DOCROOT.'components/Error.php');
	define('POPUP',DOCROOT.'components/PopDelete.php');
	define('NAVBAR',DOCROOT.'components/Navbar.php');
	define('NOTUSU',DOCROOT.'components/NotiUsuInc.php');
	define('NOTIDELETE',DOCROOT.'components/NotiDelete.php');
?>