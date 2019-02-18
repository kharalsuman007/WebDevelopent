
$("ul").on("click" , "li" , function()
{
    $(this).toggleClass("completed");
}
);

$("ul").on("click" , "span" , function(e)
{
    e.stopPropagation();
    $(this).parent().fadeOut(400 , function()
    {
        $(this).remove();
    });
});

$("input").on("keydown" , function(e)
{
    if(e.which === 13)
    {
        $("ul").append("<li> <span> X </span> " + $(this).val() + "</li>");
        $(this).val("");
    }
});

$("#toggle-form").on("click" ,  function()
{
    $("input").slideToggle();
});
//
//