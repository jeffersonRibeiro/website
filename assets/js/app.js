$(function() {
  /*
		Adiciona uma animação no rolamento da página quando
		um link com '#' é clicado
	*/
  $('a[href^="#"]').on("click", function(event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top
          },
          600
        );
    }
  });

  /*
   * requestAnimationFrame pollyfill
   */
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }

  /*!
   * Mantis.js / jQuery / Zepto.js plugin for Constellation
   * @version 1.2.2
   * @author AcauÃ£ Montiel <contato@acauamontiel.com.br>
   * @license http://acaua.mit-license.org/
   */
  (function($, window) {
    /**
     * Makes a nice constellation on canvas
     * @constructor Constellation
     */
    function Constellation(canvas, options) {
      var $canvas = $(canvas),
        context = canvas.getContext("2d"),
        defaults = {
          star: {
            color: "rgba(255, 255, 255, .2)",
            width: 1.5
          },
          line: {
            color: "rgba(255, 255, 255, .5)",
            width: 0.3
          },
          position: {
            x: 0, // This value will be overwritten at startup
            y: 0 // This value will be overwritten at startup
          },
          width: window.innerWidth,
          height: window.innerHeight,
          velocity: 0.1,
          length: 100,
          distance: 100,
          radius: 150,
          stars: []
        },
        config = $.extend(true, {}, defaults, options);

      function Star() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = config.velocity - Math.random() * 0.5;
        this.vy = config.velocity - Math.random() * 0.5;

        this.radius = Math.random() * config.star.width;
      }

      Star.prototype = {
        create: function() {
          context.beginPath();
          context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          context.fill();
        },

        animate: function() {
          var i;
          for (i = 0; i < config.length; i++) {
            var star = config.stars[i];

            if (star.y < 0 || star.y > canvas.height) {
              star.vx = star.vx;
              star.vy = -star.vy;
            } else if (star.x < 0 || star.x > canvas.width) {
              star.vx = -star.vx;
              star.vy = star.vy;
            }

            star.x += star.vx;
            star.y += star.vy;
          }
        },

        line: function() {
          var length = config.length,
            iStar,
            jStar,
            i,
            j;

          for (i = 0; i < length; i++) {
            for (j = 0; j < length; j++) {
              iStar = config.stars[i];
              jStar = config.stars[j];

              if (
                iStar.x - jStar.x < config.distance &&
                iStar.y - jStar.y < config.distance &&
                iStar.x - jStar.x > -config.distance &&
                iStar.y - jStar.y > -config.distance
              ) {
                if (
                  iStar.x - config.position.x < config.radius &&
                  iStar.y - config.position.y < config.radius &&
                  iStar.x - config.position.x > -config.radius &&
                  iStar.y - config.position.y > -config.radius
                ) {
                  context.beginPath();
                  context.moveTo(iStar.x, iStar.y);
                  context.lineTo(jStar.x, jStar.y);
                  context.stroke();
                  context.closePath();
                }
              }
            }
          }
        }
      };

      this.createStars = function() {
        var length = config.length,
          star,
          i;

        context.clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < length; i++) {
          config.stars.push(new Star());
          star = config.stars[i];

          star.create();
        }

        star.line();
        star.animate();
      };

      this.setCanvas = function() {
        canvas.width = config.width;
        canvas.height = config.height;
      };

      this.setContext = function() {
        context.fillStyle = config.star.color;
        context.strokeStyle = config.line.color;
        context.lineWidth = config.line.width;
      };

      this.setInitialPosition = function() {
        if (!options || !options.hasOwnProperty("position")) {
          config.position = {
            x: canvas.width * 0.5,
            y: canvas.height * 0.5
          };
        }
      };

      this.loop = function(callback) {
        callback();

        window.requestAnimationFrame(
          function() {
            this.loop(callback);
          }.bind(this)
        );
      };

      this.bind = function() {
        /*$canvas.on('mousemove', function(e){
					config.position.x = e.pageX - $canvas.offset().left;
					config.position.y = e.pageY - $canvas.offset().top;
				});*/
        $(document).on("mousemove", function(e) {
          config.position.x = e.pageX - $canvas.offset().left;
          config.position.y = e.pageY - $canvas.offset().top;
        });
      };

      this.init = function() {
        this.setCanvas();
        this.setContext();
        this.setInitialPosition();
        this.loop(this.createStars);
        this.bind();
      };
    }

    $.fn.constellation = function(options) {
      return this.each(function() {
        var c = new Constellation(this, options);
        c.init();
      });
    };
  })($, window);

  if ($(window).width() > 650) {
    $("#bg-canvas").constellation();
    /*
    Define uma cor aleatória para o header a cada 10s
  */
    var favcolors = [
      "#083358",
      "#0D63A5",
      "#07A4B5",
      "#15B7B9",
      "#1F024C",
      "#45056E",
      "#48466D",
      "#11999E",
      "#5A082D",
      "#252A34"
    ];
    // var intervalHColor = setInterval(setHeaderColor, 10000); // 10segundos

    // function setHeaderColor(){
    //   var newColor = favcolors[Math.floor(Math.random()*favcolors.length)];
    //   $('header.welcome-container').css('background-color', newColor);
    // }
  }
});
