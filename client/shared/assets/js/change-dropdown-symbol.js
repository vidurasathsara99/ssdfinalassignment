function setLinkDropdownArrow(id){
    let linkCollapseID = "link-collapse-"+id;
    let elementIcon = document.getElementById(id);
    let elementAriaExpanded = document.getElementById(linkCollapseID).getAttribute('aria-expanded');
    if(elementAriaExpanded==="true"){
        elementIcon.className = "fa fa-angle-down";
    }else{
        elementIcon.className = "fa fa-angle-right";
    }
}