<?php
	define('AUTOR', 'Calderon Castillo Leonardo - Castañeda Rodriguez Andrea'); 
	define('SITENAME', 'HandsTalk');
  define('ROOTURL', 'http://localhost/HandsTalk/');
	define('DOCROOT',$_SERVER['DOCUMENT_ROOT'] . '/HandsTalk/');             

	define('DBHOST','localhost');
	define('BDUSER','root');
	define('DBPASSWD','');
	define('DBNAME','handstalk');

	define('HEADER',DOCROOT.'header.php');
	define('FOOTER',DOCROOT.'footer.php');
	define('IMAGES',ROOTURL.'public/');
	define('CSS',ROOTURL.'css/');
	define('JS',ROOTURL.'js/'); 

  include("funciones.php");

	session_start();

	define('CONTACT',DOCROOT.'/components/contact.php');
	define('FAQ',DOCROOT.'/components/faq.php');
	define('TRADUCTOR',DOCROOT.'/components/traductor.php');
	define('TRADUCTOR2',DOCROOT.'/components/traductorP2.php');
  define('NAVBAR',DOCROOT.'/components/navbar.php');
  define('FRMLOG',DOCROOT.'/components/formLogin.php');
  define('SENAGUAR',DOCROOT.'/components/NotiSenaGuar.php');
  define('FAV',DOCROOT.'/components/favMenu.php');
  define('PERFIL',DOCROOT.'/components/perfil.php');
  define('FMM',DOCROOT.'/components/favMenuMobile.php');
  define('NIS',DOCROOT.'/components/NotiFalloSesion.php');
  define('NEU',DOCROOT.'/components/errorUser.php');

?>