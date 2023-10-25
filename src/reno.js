function nav_action(){
    return (1020 >= window.innerWidth)? 'click': 'mouseover' ;
}
function close_sibling(e){
    let parent = e.parentElement;
    
    for(let child of parent.children){
        if(child != e){
            close_toggle_action(child.querySelector('.r_dropdown_toggle'));
        }
    }
}
function close_toggle_action(toogle){
    if(toogle){
        let parent  = toogle.parentElement;

        let menu = parent.querySelector('.r_dropdown_menu');

        if(menu){
            menu.classList.remove('active');

            parent.ariaExpanded = 'false';
            toogle.ariaExpanded = 'false';

            let children = menu.getElementsByClassName('r_dropdown_toggle');
            for(let child of children){
                close_toggle_action(child);
            }
        }
       
        
    }
}

function open_toggle_action(toogle){
   
    if(toogle){
       
        let parent  = toogle.parentElement;
        
        let menu = parent.querySelector('.r_dropdown_menu');
    
        if(menu){
            menu.classList.add('active');
            parent.ariaExpanded = 'true';
            toogle.ariaExpanded = 'true';
            
        }
    }
}

function nav_dropdown_init(document){
    
        
        let toggles = document.getElementsByClassName('r_dropdown_toggle') ;
        
        for(let toggle of toggles) {
            
                toggle.addEventListener('click',function(){
                    if(this.ariaExpanded == 'true'){ 
                        
                        close_toggle_action(this);
                        close_overlay();
                        
                    }
                    else{
                        close_sibling(this.parentElement);
                       
                        open_toggle_action(this);
                        open_overlay();
                        
                    }
                
                } );
            
            
            
        
        };
    
    
        let items = document.getElementsByClassName('menu-item') ;
        
        for(let item of items) {
            
            item.addEventListener('mouseover',function(){
                if(nav_action() === 'mouseover'){
                let toogle = item.querySelector('.r_dropdown_toggle');
                if(!toogle){
                    close_overlay();
                }
                close_sibling(this);
                if(toogle && toogle.ariaExpanded == 'false'){ 
                    open_overlay();
                    open_toggle_action(toogle);
                }
            }  
                
                
            
            } );
        }
    

}



function init_global_close(document){
    let global_closers = document.getElementsByClassName('close_mega_menu');

    for(let closer of global_closers){
        closer.addEventListener('click',function() {
            this.dispatchEvent(
                new CustomEvent('close_menu',{
                    bubbles : true
                })
            );
        });
    }

    let menu_items = document.querySelectorAll('.menu > .menu-item');
    for(let item of menu_items){
        item.addEventListener('close_menu',function(){
            close_overlay();
            close_toggle_action(this.querySelector('.r_dropdown_toggle'));
        });
    }
}


function init_previous_nav_btns(document){
    let all = document.getElementsByClassName('r_previous');

    for(let e of all){
        
        e.addEventListener('click',function(){
            let menu = this.parentElement;
            
            let toggle = menu.parentElement.querySelector('.r_dropdown_toggle');

            close_toggle_action(toggle) ;
        });
    }
}

function init_nav_hbg_icon(document){
    let btn = document.getElementById("nav_icon");
   
    if(btn){
        btn.addEventListener('click',()=>{
            let menu = document.getElementById('menu-tree');
           
            if(menu.classList.contains('active')){
                menu.classList.remove('active');
            }else{

                menu.classList.add('active');
            }
        });
    }
}



function handle_outside_click(document){
    document.addEventListener('click',function (event){
        let r_dropdowns = document.getElementsByClassName('r_dropdown');
        for(let dropdown of r_dropdowns) {
            let toggle = dropdown.querySelector('.r_dropdown_toggle')
           if(toggle.ariaExpanded == 'true' && !dropdown.contains(event.target)){
                close_overlay();
                close_toggle_action(toggle) ;
           }
        }
    });

    
}

function open_overlay(){
   
    let overlay = document.getElementById("overlay");
    if(!is_overlay_deploy(overlay)){
        overlay.classList.remove('hidden');
    }
}
function close_overlay(){
   
    let overlay = document.getElementById("overlay");
    if(is_overlay_deploy(overlay)){
        overlay.classList.add('hidden');
    }
}
function is_overlay_deploy(overlay){
    return !overlay.classList.contains('hidden');
}

function init_menu(){
   
    init_nav_hbg_icon(document);
    nav_dropdown_init(document);
    init_global_close(document);
    init_previous_nav_btns(document);
    handle_outside_click(document);
    


}

init_menu();
