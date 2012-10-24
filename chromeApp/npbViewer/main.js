var URL_SCHEDULE = "http://baseball.yahoo.co.jp/npb/schedule/";
var URL_TWITTER_SEARCH = "http://twitter.com/#!/search/%23giants%20OR%20%23kyojin";
var DIV_ID_GAME_RESULT_LIST = "#game-result-list";
var DIV_ID_TWEET_SEARCH_LIST = "#tweet-search-list";
var MSG_ERROR_LOAD_GAME_RESULT_LIST = "エラー";


$(document).ready(function(){
	
	$("#update-game").click(function(event){
		gameResultListLoad();
		tweetSearchListLoad();
	});
	
});

function gameResultListLoad(){
	$.ajax({
		url: URL_SCHEDULE,
		type: "GET",
		success: function(data){
			$(data).find(".NpbScoreBg").each(function() {
				$(DIV_ID_GAME_RESULT_LIST).append($(this));
			});
		},
		error: function(){
			$(DIV_ID_GAME_RESULT_LIST).html(MSG_ERROR_LOAD_GAME_RESULT_LIST);
			$(DIV_ID_GAME_RESULT_LIST).addClass("error");
		}
	});
}

function tweetSearchListLoad(){
	$.ajax({
		url: URL_TWITTER_SEARCH,
		type: "GET",
		success: function(data){
			$(data).find(".js-content-main").each(function() {
				$(DIV_ID_TWEET_SEARCH_LIST).append($(this));
			});
		},
		error: function(){
			$(DIV_ID_TWEET_SEARCH_LIST).html(MSG_ERROR_LOAD_GAME_RESULT_LIST);
			$(DIV_ID_TWEET_SEARCH_LIST).addClass("error");
		}
	});
}

