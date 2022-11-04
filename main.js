
function transmData(data){
    return data.split('-').reverse().join('/');
}

window.searchGames = {
    page: 0,
    pageSize: 5,
    games: [],
    loadData: function(){
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://mmo-games.p.rapidapi.com/games",
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "d6c34d837cmshfc06ff66ee1b611p13103ejsn74c1b0e87a7b",
                "X-RapidAPI-Host": "mmo-games.p.rapidapi.com"
            }
        };
        $.ajax(settings).done(function (data) {
            window.searchGames.games = data; 
            page = 1;
            window.searchGames.onDraw();
        });
    },
    onDraw: function(){
        var containerGames = $(".containerGames");
        var item, i, game;
        containerGames.html("");

        $(".prints").html("");
        $(".containerPrint").hide();
        $(".paginacaoMain").show();
        for ( i = 0; i <  window.searchGames.games.length; i++ ) {
            game = window.searchGames.games[i];
            item = $(
                "<div class='row rowGames'>"+
                    "<div class='col-6' style='display: flex;align-items: center;'>" +
                        "<ul>"+
                            "<li>" +
                                "Nome: <a>" + game.title + "</a>"+
                            "</li>"+
                            "<li>" +
                                "Plataforma: " + game.platform +
                            "</li>"+
                            "<li>" +
                                "Data de Lançamento: " + transmData(game.release_date) +
                            "</li>"+
                        "</ul>" +
                    "</div>"+
                    "<div class='col-6' style='display: flex;justify-content: center;'>" +
                        "<a><img class='imgGames' src="+game.thumbnail+" onclick='oneGame("+game.id+")'></a>" +
                    "</div>"+
                "</div>"
            );
            containerGames.append(item);
        }
    },
    goPage: function(idxPage){
        window.searchGames.page = idxPage;
        window.searchGames.onDraw();
    }
};

$( document ).ready(function() {
    window.searchGames.loadData();
    $(".logoBet").click(function(){
        window.searchGames.onDraw();
    });
});


function oneGame(id){

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://mmo-games.p.rapidapi.com/game?id="+id+"",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "d6c34d837cmshfc06ff66ee1b611p13103ejsn74c1b0e87a7b",
            "X-RapidAPI-Host": "mmo-games.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (data) {
        console.log(data);
        $(".containerGames").html("");
        $(".prints").html("");
        $(".btn-lg").remove();
        $(".containerPrint").show();
        $(".paginacaoMain").hide();
        $(".containerGames").append(
                "<div class='row rowGames'>"+
                    "<div class='col-6' style='display: flex;align-items: center;'>" +
                        "<ul>"+
                            "<li>" +
                                "Nome: <a>" + data.title + "</a>"+
                            "</li>"+
                            "<li>" +
                                "Plataforma: " + data.platform +
                            "</li>"+
                            "<li>" +
                                 "Descrição: " + data.short_description +
                            "</li>"+
                            "<li>" +
                                "Data de Lançamento: " + transmData(data.release_date) +
                            "</li>"+
                        "</ul>" +
                    "</div>"+
                    "<div class='col-6' style='display: flex;justify-content: center;'>" +
                        "<img class='imgGame' src="+data.thumbnail+">" +
                    "</div>"+
                "</div>"
        );
        $(".containerPrint").append(
            "<div class='row' style='margin-left: 32px;'>" +
                "<div class='col-4 prints'><br><img class='imgGame' src=" + data.screenshots[0].image + "> </div>" +
                "<div class='col-4 prints'><br><img class='imgGame' src=" + data.screenshots[1].image + "> </div>" +
                "<div class='col-4 prints'><br><img class='imgGame' src=" + data.screenshots[2].image + "> </div>" +
                "<div style='padding: 14px;'>" +
                    "<button class='btn btn-primary btn-lg disabled voltarGames' role='button' aria-disabled='true' style='cursor:pointer;'>" +
                        "Voltar" +
                    "</button>" +
                "</div>" +
            "</div>"
        );
        $(".voltarGames").click(function(){
            window.searchGames.onDraw();
        })
    });
}

