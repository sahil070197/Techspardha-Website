// must keep event name unique for each category

//
//var database=firebase.database();
//var storage=firebase.storage();
//var event_categories_ref=database.ref('event-categories');
//var reg_details=database.ref('registeration-details');
//var random_ref=database.ref('random_keys');

//var random_about_us_item_id=random_ref.push().key;
function getRandomKey()
{
    var random=random_ref.push().key;
    return random;
}

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

function initialize()
{
    var event_name=$("#name").val("");
    var category_name=$("#category").val("x");
    var description=$("#description").val("");
    var rules=$("#rules").val("");
    var coordinator=$("#coordinator").val("");
    var venue=$("#venue").val("");
    var date=$("#date").val("");
    var time=$("#time").val("");
    $('select').material_select('destroy');
    $('select').material_select();
}
function upload(category_name, event_object)
{
        event_categories_ref.child(category_name).once('value', function(snapshot){
        category_items_id=snapshot.val(); 
        var category_details_ref=database.ref(category_items_id+'/'+event_object.event_name);
        var event_key=getRandomKey();
        category_details_ref.set(event_key);
        var event_ref=database.ref(event_key);
        event_ref.set(event_object).then(function(){
            initialize();
            $('#submit-btn').removeClass("disabled");
            alert("Success!!");
        }).catch(function(err){
            $('#submit-btn').removeClass("disabled");
            alert("Error Occured! Please re-insert.");
        });
    });
}
function convert(str)
{
    var ss = str.split("$");
    var converted="";
    for (var i in ss) {  
        converted+=ss[i];
        if(i!=ss.length-1)
        converted+="<br>";  
    }  
    return converted;
}
function image_name(str)
{
    var ss = str.split(" ");
    var converted="";
    for (var i in ss) {  
        converted+=ss[i]; 
    }  
    return converted;
}
function submitForm()
{
    
    var event_name=$("#name").val();
    event_name=toTitleCase(event_name);
    var category_name=$("#category").val();
    var image_path=image_name("images/"+category_name+"/"+event_name);
    var description=$("#description").val();
    var rules=$("#rules").val();
    var coordinator=$("#coordinator").val();
    var venue=$("#venue").val();
    var date=$("#date").val();
    var time=$("#time").val();
    var registration_details_key=getRandomKey();    
    
    
    if(event_name=="" || category_name==null || description=="" || coordinator==""|| venue=="" || date=="" || time=="")
    {
        alert("Incomplete/Invalid input.");
    }
    else
    {
        var x=confirm("Are you sure?");
        if(x==true)
        {
            coordinator=convert(coordinator);
            rules=convert(rules);
            var event_object={
                registration_details_key: registration_details_key,
                event_name : event_name,
                image_path : image_path,
                description: description,
                date: date,
                time: time,
                venue: venue,
                rules:rules,
                coordinator: coordinator
            };
            console.log(event_object);
            $('#submit-btn').addClass("disabled");
            upload(category_name, event_object);
        }
    }
}