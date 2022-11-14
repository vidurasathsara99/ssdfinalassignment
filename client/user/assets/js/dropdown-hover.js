exports.dropdownHover =  function dropdownHover(show, toggler_id, dropdown_id){
    // profile-img profile-dropdown
    let toggler = document.getElementById(toggler_id);
    let dropdown = document.getElementById(dropdown_id);
    if(show){
        toggler.className = "dropdown-toggle show";
        toggler.setAttribute('aria-expanded',true);
        dropdown.className = "dropdown-menu show";
        dropdown.setAttribute('data-bs-popper','none');
    }else{
        toggler.className = "dropdown-toggle";
        toggler.setAttribute('aria-expanded',false);
        dropdown.className = "dropdown-menu";
        dropdown.setAttribute('data-bs-popper','none');
    }
}