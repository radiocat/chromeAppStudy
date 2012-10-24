var lineSize = 4;
var maxSize = lineSize*lineSize;
var markOnBgcolor = "#6699FF";
var markOffBgcolor = "#FFFFFF";
var flgPanelArray;
var patternNo = 1;
var clearCountArray = [2,3,2,3,4,4,6];
var count = 0;

$(document).ready(function(){
	setStagePanelPattern(patternNo);
	for(var i = 1 ; i <= maxSize ; i++){
		$("#" + i).click(function(event){
			$("#count").text(++count);
			var id =  parseInt($(this).attr("id"), 10);
			var index = id -1;
			changePanel(index, $(this));
			if(id%lineSize != 1) changePanel((index-1), $("#" + (id-1)));
			if(id%lineSize != 0) changePanel((index+1), $("#" + (id+1)));
			if(id-lineSize > 0) changePanel((index-lineSize), $("#" + (id-lineSize)));
			if(id+lineSize <= maxSize) changePanel((index+lineSize), $("#" + (id+lineSize)));
			if(checkAllPanel() && count <= clearCountArray[patternNo-1]) stageClear();
			else if(count >= clearCountArray[patternNo-1]) resetStage();
		});
	}
	// パネルを入れ替える
	function changePanel(i, obj){
		flgPanelArray[i] = !flgPanelArray[i];
		setPanel(i, obj);
	}
	// パネルの表示をセットする
	function setPanel(i, obj){
		if(flgPanelArray[i]){
			obj.css("background-color", markOnBgcolor);
		}else{
			obj.css("background-color", markOffBgcolor);
		}
	}
	// すべてのパネル裏になったかチェックする
	function checkAllPanel(){
		for(var i = 0 ; i < maxSize ; i++){
			if(flgPanelArray[i]) return false;
		}
		return true;
	}
	// クリアのメッセージを表示する
	function stageClear(){
		alert("ステージクリア！");
		patternNo++;
		setStagePanelPattern();
	}
	function resetStage(){
		alert("残念！やりなおし。");
		setStagePanelPattern();
	}
	// パネルの状態をリセットする
	function setAllPanel(){
		for(var i = 0 ; i < maxSize ; i++){
			setPanel(i, $("#" + (i+1)));
		}
	}
	// ステージごとのパネルの表示パターン
	function setStagePanelPattern(){
		switch (patternNo){
			case 1:
				flgPanelArray = [true,false,false,false,
				        true,true,false,true,
				        true,false,true,true,
				        false,false,false,true];
				break;
			case 2:
				flgPanelArray = [true,false,false,false,
							        false,true,false,false,
							        false,false,true,true,
							        false,false,true,false];
				break;
			case 3:
				flgPanelArray = [false,true,false,false,
							        true,true,false,false,
							        false,false,true,true,
							        false,false,true,false];
				break;
			case 4:
				flgPanelArray = [true,false,true,true,
							        true,false,true,false,
							        true,false,false,false,
							        true,true,false,false];
				break;
			case 5:
				flgPanelArray = [true,false,false,true,
							        false,true,true,false,
							        false,true,true,false,
							        true,false,false,true];
				break;
			case 6:
				flgPanelArray = [true,true,true,true,
							        true,true,true,true,
							        true,true,true,true,
							        true,true,true,true];
				break;
			case 7:
				flgPanelArray = [true,false,true,true,
							        false,true,false,true,
							        true,false,true,false,
							        true,true,false,true];
				break;
			default:
				alert("ゲームクリアー！");
				patternNo = 1;
				setStagePanelPattern(patternNo);
				return ;
		}
		setAllPanel();
		count = 0;
		$("#clear-count").text(clearCountArray[patternNo-1]);
		$("#count").text(count);
	}
});