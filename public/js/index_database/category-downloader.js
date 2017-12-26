//Defined in js/index_database/references/event_ref.js

//var database=firebase.database();
//var storage=firebase.storage();
//var event_categories_ref=database.ref('event-categories');
//var reg_details=database.ref('registeration-details');
//var random_ref=database.ref('random_keys');
//var event_reg_details=reg_details.child('event-registration');

function populateCategories(categories)
{
    var categories_placeholder=$("#categories_placeholder");
    var side_nav=$('#event-placeholder');
    var data="";
    var val="";
    $.each(categories,function(index,item){
        console.log("items", item);
        data+='<a href=events.html?category='+item+'><div class="col l3 s12 scrollspy" id="'+item+'"><div class="card small" ><div class="card-image waves-effect waves-block waves-light"><img class="activator minified-img" src="images/category-images/'+item+'.jpg"></div><div class="card-content teal"><span class="card-title activator white-text flow-text"><h5>'+item+'</h5></span></div><a href=events.html?category='+item+'><div class="card-action teal waves-effect waves-block waves-light white-text"></div></a></div></div></a>';
        val+='<li><a class="waves-effect waves-light teal-text text-lighten-2" href="#'+item+'">'+item+'</a></li>';
    });
    
    $('#preloader_a').css('display', 'none');
    $('#preloader_b').css('display', 'none');
    side_nav.append(val);
    categories_placeholder.append(data);
}
function getCategories()
{
    var categories=[];
    event_categories_ref.once('value', function(snapshot){
        var index=0;
        snapshot.forEach(function(category_id_pair){
            categories[index++]=category_id_pair.key;
        });
        console.log("Here", categories);
        populateCategories(categories);
    });
}
function getCategoryIdMap()
{
    var map=new Object();
    event_categories_ref.once('value', function(snapshot){
        var index=0;
        snapshot.forEach(function(category_id_pair){
            map[category_id_pair.key]=category_id_pair.val();
        });
    });

    return map;

}
function getCategoryId(categoryName)
{
    var map=new Object();
    event_categories_ref.once('value', function(snapshot){
        var index=0;
        snapshot.forEach(function(category_id_pair){
            map[category_id_pair.key]=category_id_pair.val();
        });
    });
    return map[categoryName];
}
getCategories();