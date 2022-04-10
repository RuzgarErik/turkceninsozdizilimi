$(document).ready(function() {
    //@naresh action dynamic childs
    var next = 0;
    $("#add-more").click(function(e) {
        e.preventDefault();
        var addto = "#field" + next;
        var addRemove = "#field" + (next);
        next = next + 1;
        var newIn = ' <div id="field' + next + '" name="field' + next + '"><!-- Text input--><div class="form-group"> <label class="col-md-4 control-label" for="oge">Öge</label> <div class="col-md-5"> <input id="oge" name="oge" type="text" placeholder="" class="form-control input-md"> </div>';
        var newInput = $(newIn);
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >Remove</button></div></div><div id="field">';
        var removeButton = $(removeBtn);
        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source', $(addto).attr('data-source'));
        $("#count").val(next);

        $('.remove-me').click(function(e) {
            e.preventDefault();
            var fieldNum = this.id.charAt(this.id.length - 1);
            var fieldID = "#field" + fieldNum;
            $(this).remove();
            $(fieldID).remove();
        });
    });


    const permutator = (inputArr) => {
        let result = [];

        const permute = (arr, m = []) => {
            if (arr.length === 0) {
                result.push(m)
            } else {
                for (let i = 0; i < arr.length; i++) {
                    let curr = arr.slice();
                    let next = curr.splice(i, 1);
                    permute(curr.slice(), m.concat(next))
                }
            }
        }

        permute(inputArr)

        return result;
    }



    $("#send").click(function(e) {
        console.log("gönder fonksiyonu başladı")
        var ele = document.getElementsByTagName('input');
        const ogeler = []
        for (i = 0; i < ele.length; i++) {

            // CHECK THE ELEMENT TYPE.
            if (ele[i].type == 'text') {
                console.log('Value: ' + ele[i].value);
                ogeler.push(ele[i].value);


            }
        }

bootstrap_alert = function() {}
bootstrap_alert.warning = function(message) {
            $('#alert_placeholder').html('<div class="alert alert-primary" role="alert"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
        }





        console.log(permutator(ogeler));
        var sonuc = permutator(ogeler)
        bootstrap_alert.warning(sonuc.join("<br>") + "<br>");




    });


});