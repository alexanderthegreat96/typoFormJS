/**
 * TypoForm JS Utilities
 * Author alexandrulupaescu
 * (c) 2021
 * Requirements: jQuery 3.x.x +
 * Allows full control over the default error mapping
 * and form validation for Typo3Forms
 * CSS Classes:  .typoControl .typoIgnore .typoSubmit .invalid . valid
 * Data attributes: data-lang , data-length
 */

var consoleDebug = true;

$(".typoControl").on('keyup change', function (){

    if(consoleDebug)
    {
        console.log("Listening to .typoControl changes...");
    }

    checkFields();
});



function highlightError(errorMsg)
{
    $('.typoControl').each(function(i, obj) {
        if($(this).hasClass("invalid"))
        {
            $(".errorMsg").eq(i).html(errorMsg);

            if(consoleDebug)
            {
                console.log("showcase error for .typoControl_"+i);
            }

            return false;
        }
        else
        {
            $(".errorMsg").eq(i).html("");
            return true;
        }
    });
}

function applyInvalid(i)
{
    var currentInput = $(".typoControl").eq(i);
    $(currentInput).removeClass("valid");
    $(currentInput).addClass("invalid");

    if(consoleDebug)
    {
        console.log("Applied invalid  .typoControl_"+i);
    }
}

function applyValid(i)
{
    var currentInput = $(".typoControl").eq(i);
    $(currentInput).removeClass("invalid");
    $(currentInput).addClass("valid");

    if(consoleDebug)
    {
        console.log("Applied valid  .typoControl_"+i);
    }
}
/**
 * Applies text Error for given object key
 * */
function applyTextError(i,lang)
{
    var errorMsg = null;

    if(lang === "en")
    {
        errorMsg = "You must type in some text.";
    }
    else if(lang === "de")
    {
        errorMsg = "Sie müssen einen Text eingeben.";
    }

    else if(lang === "it")
    {
        errorMsg = "Devi digitare del testo.";
    }

    else if(lang === "fr")
    {
        errorMsg = "Vous devez taper du texte.";
    }

    else
    {
        errorMsg = "You must type in some text.";
    }

    //$(".errorMsg").eq(i).html(errorMsg);

    if(consoleDebug)
    {
        console.log("Applied a text error for .typoControl_"+i);
    }

    return errorMsg;
}

/**
 * Applies lenghtError for given object key
 * */

function applyLengthError(i,limit,lang = "en")
{
    var errorMsg = null;

    if(lang === "en")
    {
        errorMsg = "You must type at least <b>"+limit+"</b> characters.";
    }
    else if(lang === "de")
    {
        errorMsg = "Sie müssen mindestens <b>"+limit+"</b> Zeichen eingeben";
    }

    else if(lang === "it")
    {
        errorMsg = "Devi digitare almeno <b>"+limit+"</b> caratteri.";
    }

    else if(lang === "fr")
    {
        errorMsg = "Vous devez taper au moins <b>"+limit+"</b> caractères.";
    }

    else
    {
        errorMsg = "You must type at least <b>"+limit+"</b> characters.";
    }

    // $(".errorMsg").eq(i).html(errorMsg);

    if(consoleDebug)
    {
        console.log("Applied a input length error for .typoControl_"+i);
    }

    return errorMsg;
}

/**
 * Applies email Error for given object key
 * */

function applyEmailError(i,lang = "en")
{
    var errorMsg = null;
    if(lang === "en")
    {
        errorMsg = "Your email address does not contain '@' !";
    }
    else if(lang === "de")
    {
        errorMsg = "Ihre E-Mail-Adresse enthält kein '@' !";
    }
    else if(lang === "it")
    {
        errorMsg = "Il tuo indirizzo email non contiene '@' !";
    }
    else if(lang === "fr")
    {
        errorMsg = "Votre adresse e-mail ne contient pas de '@'!";
    }
    else
    {
        errorMsg = "Your email address does not contain '@' !";
    }

    //$(".errorMsg").eq(i).html(errorMsg);

    if(consoleDebug)
    {
        console.log("Applied an email error for .typoControl_"+i);
    }

    return errorMsg;
}

/**
 * Applies a selector error for give key
 * */
function applySelectError(i,lang = "en")
{

    var errorMsg = null;
    if(lang === "en")
    {
        errorMsg = "You must pick an item !";
    }
    else if(lang === "de")
    {
        errorMsg = "Sie müssen einen Artikel auswählen!";
    }
    else if(lang === "it")
    {
        errorMsg = "Devi scegliere un oggetto!";
    }
    else if(lang === "fr")
    {
        errorMsg = "Vous devez choisir un article!";
    }
    else
    {
        errorMsg = "You must pick an item !";
    }

    //$(".errorMsg").eq(i).html(errorMsg);

    if(consoleDebug)
    {
        console.log("Applied a selector error for .typoControl_"+i);
    }

    return errorMsg;
}
/**
 * Removes error for given object key
 *
 * */
function removeError(i)
{
    $(".errorMsg").eq(i).html("");
    if(consoleDebug)
    {
        console.log("Removed error for .typoControl_"+i);
    }

    return null;

}

/**
 * Checks fields
 * @returns {null}
 */
function checkFields()
{
    var output = null;
    $('.typoControl').each(function(i, obj) {

        /**
         * Ignore fields that have
         * the class typoIgnore
         */

        if($(this).hasClass("typoIgnore"))
        {
            applyValid(i);
            output = "valid";
            return false;
        }
        else
        {
            /**
             * Cheking if the input has a lang attribute
             * */
            if($(this).attr("data-lang"))
            {
                var lang = $(this).attr("data-lang");
            }
            else
            {
                var lang = "en";
            }
            /**
             * Checking for the field type
             */

            if($(this).is("input"))
            {
                if($(this).attr("type") === "text")
                {
                    if($(this).attr("data-length"))
                    {
                        if($(this).val().length < $(this).attr("data-length"))
                        {
                            applyInvalid(i);
                            highlightError(applyLengthError(i,$(this).attr("data-length"),lang));
                            output = "invalid";
                        }
                        else
                        {
                            applyValid(i);
                            removeError(i);
                            output  = "valid";
                        }
                    }
                    else
                    {
                        if($(this).val())
                        {
                            applyValid(i);
                            removeError(i);
                            output = "valid";
                        }
                        else
                        {
                            applyInvalid(i);
                            highlightError(applyTextError(i,lang))(i,lang);
                            output = "invalid";
                        }
                    }
                }
                else if($(this).attr("type") === "email")
                {
                    if($(this).attr("data-length"))
                    {
                        if($(this).val().length < $(this).attr("data-length"))
                        {
                            applyInvalid(i);
                            highlightError(applyLengthError(i,$(this).attr("data-length"),lang));
                            output = "invalid";

                        }
                        else
                        {

                            if ($(this).val().indexOf('@') >= 0)
                            {
                                applyValid(i);
                                removeError(i);
                                output = "valid";
                            }
                            else
                            {
                                applyInvalid(i);
                                highlightError(applyEmailError(i,lang));
                                output = "invalid";
                            }
                        }
                    }
                    else
                    {
                        if($(this).val())
                        {
                            applyValid(i);
                            removeError(i);
                            output = "valid";
                        }
                        else
                        {
                            applyInvalid(i);
                            highlightError(applyTextError(i,lang))(i,lang);
                            output = "invalid";
                        }
                    }
                }
                else if($(this).attr("type") === "password")
                {
                    if($(this).attr("data-length"))
                    {
                        if($(this).val().length < $(this).attr("data-length"))
                        {
                            applyInvalid(i);
                            highlightError(applyLengthError(i,$(this).attr("data-length"),lang));
                            output = "invalid";
                        }
                        else
                        {
                            applyValid(i);
                            removeError(i);
                            output =  "valid";
                        }
                    }
                    else
                    {
                        if($(this).val())
                        {
                            applyValid(i);
                            removeError(i);
                            output = "valid";
                        }
                        else
                        {
                            applyInvalid(i);
                            highlightError(applyTextError(i,lang))(i,lang);
                            output = "invalid"
                        }
                    }
                }
                else if($(this).attr("type") === "checkbox")
                {

                }
                else
                {
                    return;
                }
            }
            else if($(this).is("textarea"))
            {
                if($(this).attr("data-length"))
                {
                    if($(this).val().length < $(this).attr("data-length"))
                    {
                        applyInvalid(i);
                        highlightError(applyLengthError(i,$(this).attr("data-length"),lang));
                        output = "invalid";
                    }
                    else
                    {
                        applyValid(i);
                        removeError(i);
                        output = "valid";
                    }
                }
                else
                {
                    if($(this).val())
                    {
                        applyValid(i);
                        removeError(i);
                        output = "valid";
                    }
                    else
                    {
                        applyInvalid(i);
                        highlightError(applyTextError(i,lang))(i,lang);
                        output = "invalid";
                    }
                }

            }
            else if($(this).is("select"))
            {
                if(!$(this).val())
                {
                    applyInvalid(i);
                    highlightError(applySelectError(i,lang));
                    output = "invalid";
                }
                else
                {
                    applyValid(i);
                    removeError(i);
                    output = "valid";
                }
            }
            else
            {
                return ;
            }
        }

    });

    return output;


}

/**
 * Listens to the submit action
 */

$(".typoSubmit").click(function()
{
    if(checkFields() === "valid")
    {
        console.log("Form ready!");
    }
    else
    {
        console.log("We have a form error");
    }
});