
$(document).ready(function() {
    var next = 0;
    $("#add-more").click(function(e) {
        e.preventDefault();
        var addto = "#field" + next;
        var addRemove = "#field" + (next);
        next = next + 1;
        var newIn = ' <div id="field' + next + '" name="field' + next + '"><!-- Text input--><div class="form-group"> <label class="col-md-4 control-label" for="oge">Öge</label> <div class="col-md-5"> <input id="oge" name="oge" type="text" placeholder="" class="form-control input-md"> </div>';
        var newInput = $(newIn);
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >Kaldır</button></div></div><div id="field">';
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
        var ogeler = new Array();
        for (i = 0; i < ele.length; i++) {

            if (ele[i].type == 'text') {
                console.log('Value: ' + ele[i].value);
                ogeler.push(ele[i].value);


            }
        }
        localStorage.setItem('cumle', ogeler.join("_"));
        bootstrap_alert = function() {}
        bootstrap_alert.warning = function(message) {
            $('#alert_placeholder').html('<div id ="cikti" class="alert alert-warning alert-dismissible fade show" role="alert"> '+message+' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
        }

        console.log(permutator(ogeler));
        var sonuc = permutator(ogeler)
        bootstrap_alert.warning(sonuc.join("<br>") + "<br>");
        localStorage.setItem('cikti', sonuc.join("\n"));
    


    });

    $("#print").click(function(e) {
        window.jsPDF = window.jspdf.jsPDF;

        const options = 
        {
         orientation: 'p',
         unit: 'mm',
         format: 'a4',
         putOnlyUsedFonts:true
        };
        
        

        const doc = new jsPDF(options);

        let cikti = localStorage.getItem('cikti');
        let cumle = localStorage.getItem('cumle');

        if(cikti){

            doc.text(cikti, 10, 10);
            doc.save(`${cumle}.pdf`);
            localStorage.clear();

        } else {
            alert("PDF çıktısı almadan önce hesaplamanız gerekmektedir.")            


        };




    });

});