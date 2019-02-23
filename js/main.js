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
  let subscriptionKey = "d50399ac93d9a97a";
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
      "&private_room=1" + "&cocktail=1" + "&range=5" + 
      "&lat=" + nowLatitude + "&lng=" + nowLongitude + "&format=jsonp";

      // 検索実行後、ヒットした居酒屋情報を配列に格納
      $.ajax({
        url: url,
        type:"get",
        dataType:'jsonp'
      })
      .done(function(data) {
        console.log(data);
        let resultsValue = data.results.results_returned;
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

    },
  );
};




