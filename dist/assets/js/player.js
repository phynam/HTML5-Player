soundManager.setup({
    url: '../assets/swf/soundmanager2.swf',
    useHTML5Audio: true,
    html5Test: 'maybe',
    preferFlash: false,
    onready: function() {
        window.mySound = soundManager.createSound({
            id: 'sound1',
            url: 'http://www.stephaniequinn.com/Music/Hungarian%20Dance.mp3',
            whileplaying: function() {
                $('[data-player-target="progress"]').css('width', ((this.position / this.duration) * 100) + '%');
            },
            whileloading: function() {
                $('[data-player-target="download"]').css('width', ((this.bytesLoaded / this.bytesTotal) * 100) + '%');
            },
            onfinish: function() {

            }
        });
    },
    ontimeout: function() {
        alert("SM2 could not start. Missing SWF? Flash blocked?");
    }
});

var Player = function() {
    this.$el = $('.player');
    this.init = function() {
        var context = this;
        this.$el.on('click', '.player__control', function() {
            context.toggle();
        });
        this.$el.on('click', '.player__seek', function(e) {
            var position_x = $(this).offset().left,
                offset = e.pageX - position_x,
                bar_width = $(this).width(),
                position = parseInt((offset / bar_width) * mySound.duration);

            mySound.setPosition(position);
        });
    };
    this.toggle = function() {
        this.$el.toggleClass('is-playing');
        mySound.togglePause();
    };
    this.show = function(play) {
        if(play) {
            this.toggle();
        }
        this.$el.attr('aria-hidden', false);
    };
    this.init();
};

var player = new Player();

// TODO: Add animation on player hide / show
