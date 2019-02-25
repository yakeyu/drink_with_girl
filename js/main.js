// ページを読み込む時にゆっくり表示させる
$('head').append(
'<style>body{display:none;}'
);
$(window).on("load", function() {
$('body').fadeIn(1500);
});


// When the DOM is ready, run this function

$(document).ready(function() {



  //#HEADER

	var slideHeight = $(window).height();

	$('#headere-top figure .item').css('height',slideHeight);



	$(window).resize(function(){'use strict',

		$('#headere-top figure .item').css('height',slideHeight);

	});

  

  

  

  //Scroll Menu

	$(window).on('scroll', function(){

		if( $(window).scrollTop()>90 ){

			$('.header-top .header-fixed-wrapper').addClass('navbar-fixed-top animated fadeInDown');

			

		} else {
      $('.navbar-fixed-top animated fadeInDown').fadeOut(500);
			$('.header-top .header-fixed-wrapper').removeClass('navbar-fixed-top animated fadeInDown');

		}

	});

	

	

	 $(window).scroll(function(){                          

            if ($(this).scrollTop() > 200) {

                $('#menu').fadeIn(500);

            } else {

                $('#menu').fadeOut(500);

            }

        });

	

	// Navigation Scroll

	$(window).scroll(function(event) {

		Scroll();

	});



	$('.navbar-collapse ul li a').on('click', function() {  

		$('html, body').animate({scrollTop: $(this.hash).offset().top - 1}, 1000);

		return false;

	});

	

	// User define function

	function Scroll() {

		var contentTop      =   [];

		var contentBottom   =   [];

		var winTop      =   $(window).scrollTop();

		var rangeTop    =   200;

		var rangeBottom =   500;

		$('.navbar-collapse').find('.scroll a').each(function(){

			contentTop.push( $( $(this).attr('href') ).offset().top);

			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );

		})

		$.each( contentTop, function(i){

			if ( winTop > contentTop[i] - rangeTop ){

				$('.navbar-collapse li.scroll')

				.removeClass('active')

				.eq(i).addClass('active');			

			}

		})

	};

  

  // affix

  var width = $(window).width();

  var top = $('.tp-banner-container').length == 0 ? -1 : $('.section-four').offset().top - $('.navbar').height() * 2;

  $('.navbar').affix({

    offset: {

      top: top

    , bottom: function () {

        return (this.bottom = $('.footer').outerHeight(true))

      }

    }

  });

  

  var owl = $("#owl-demo");



      owl.owlCarousel({

        

        itemsCustom : [

          [0, 1],

          [450, 1],

          [600, 1],

          [700, 1],

          [1000, 1],

          [1200, 1],

          [1400, 1],

          [1600, 1]

        ],

        navigation : true,

		autoPlay : 3000,



      });

	  

	  

	  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({

          disableOn: 700,

          type: 'iframe',

          mainClass: 'mfp-fade',

          removalDelay: 160,

          preloader: false,



          fixedContentPos: false

        });
});

// ここからアレンジ
// 居酒屋検索結果の取得
function searchPlace(){
  // ローディング画面の表示
  $("#overlay").fadeIn(500);
  let load = document.getElementById('overlay');
  load.style.display = 'block';
  // APIキー、urlを格納
  let subscriptionKey = "";
  let uriBase = 
  "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

  // 現在位置の取得
  navigator.geolocation.getCurrentPosition(
    function(position){
      // 現在地の緯度を取得
      let nowLatitude = position.coords.latitude;
      // 現在地の経度を取得
      let nowLongitude = position.coords.longitude;
      // 現在地周辺の検索条件に合致する居酒屋のURLを格納
      let url = uriBase + "?key=" + subscriptionKey + 
      "&private_room=1" + "&cocktail=1" + "&range=5" + "&count=20" + 
      "&lat=" + nowLatitude + "&lng=" + nowLongitude + "&format=jsonp";

      // GoogleMapの実装・現在地の表示
      // let MyLatLng = new google.maps.LatLng(nowLatitude, nowLongitude);
      // let Options = {
      //   zoom: 15,      //地図の縮尺値
      //   center: MyLatLng,    //地図の中心座標
      //   mapTypeId: 'roadmap'   //地図の種類
      // };
      // let map = new google.maps.Map(document.getElementById('map'), Options);

      // 検索実行後、ヒットした居酒屋情報を配列に格納
      $.ajax({
        url: url,
        type:"get",
        dataType:'jsonp'
      })
      .done(function(data) {
        console.log(data);
        // googlemapを表示
        // let map = document.getElementById("map");
        // map.style.display = 'block';
        //section-fourのpadding調整
        let sectionFour = document.getElementById("section-four");
        sectionFour.style.padding = '86px 102px 0';
        let sectionFourHeader = document.getElementById("title");
        sectionFourHeader.style.padding = '0 0 63px 0';

        //h4,h2タグの作成
        let h4 = document.createElement('h4');
        h4.textContent = "お近くのお店";
        let h2 = document.createElement('h2');
        h2.textContent = "カクテルの種類が豊富！個室完備！";
        // h4,h2タグをheaderタグの子要素に追加
        let title = document.getElementById('title');
        title.appendChild(h4);
        title.appendChild(h2);

        // 検索結果の数を格納
        let resultsValue = data.results.results_available;
        // 検索結果を表示
        for(i = 0; i < resultsValue; i++){
          // 居酒屋の「名前」「url」「画像」を格納
          let resultName = data.results.shop[i].name;
          let resultUrl = data.results.shop[i].urls.pc;
          let resultImg = data.results.shop[i].photo.pc.l;

          // htmlタグの組み立て
          // sectionタグの作成
          let section = document.createElement('section');
          section.classList.add('col-xs-12','col-sm-6','col-md-3');

          // figureタグの作成
          let figure = document.createElement('figure');
          // 画像をクリックした時にリンクさせる
          let imgLink = document.createElement('a');
          imgLink.href = resultUrl;
          // リンク先を新しいタブで開く
          imgLink.target = "_blank";
          // imgタグの作成
          let shopImg = document.createElement('img');
          shopImg.classList.add('img-Size');
          shopImg.src = resultImg;
          imgLink.appendChild(shopImg);
          // figureタグの子要素に追加
          figure.appendChild(imgLink);

          // 店名のタグを作成
          let header = document.createElement('header');
          let h5 = document.createElement('h5');
          h5.textContent = resultName;
          header.appendChild(h5);
          // sectionタグの最終組立
          section.appendChild(figure);
          section.appendChild(header);

          let list = document.getElementById('searchStore');
          list.appendChild(section);
        }

        // 検索結果が表示されたら検索結果へスクロール
        let position = $(".section-four").offset().top;
        $("html,body").animate({
          scrollTop: position
        });

        // ローディング画面をフェードアウト
        $("#overlay").fadeOut(500);
      })
      .fail(function(){
        console.log(2);
      });
    });
  };



