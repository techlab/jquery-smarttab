<?php
/*
 * This page will server sample contents for Smart Tab ajax option 
 * 
 */
//sleep(5);
if(isset($_REQUEST['tab_index'])){
  $tab_index = $_REQUEST['tab_index'];
  switch ($tab_index){
    case 0:
      getTab1Content();
      break;
    case 1:
      getTab2Content();
      break;
    case 2:
      getTab3Content();
      break;
    case 3:
      getTab4Content();
      break;    
    default :
      getTabDefaultContent();
      break;
  }
}

function getTabDefaultContent(){
  echo ' <h2>Tab Default Content</h2>	
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>';
}
function getTab1Content(){
  echo ' <h2>Tab 1 Content</h2>	
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
              <ul>
                  <li>list 1</li>
                  <li>list 2</li>            			
                  <li>list 3</li>
                  <li>list 4</li>                                        
          </ul>    ';
}
function getTab2Content(){
  sleep(3);
  echo ' <h2>Tab 2 Content</h2>	
          <p>Opps I slept on server for 3 sec so that you can see the pre loader rolling</p>';
}
function getTab3Content(){
  echo ' <h2>Tab 3 Content</h2>	
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>';
}
function getTab4Content(){
  echo ' <h2>Tab 4 Content</h2>	
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>';
}

?>
